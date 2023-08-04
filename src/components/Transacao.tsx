import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import http from "@/utils/http";
import { IUser, ITransacao } from "@/interfaces/interfaces";
import { customStyles } from "@/styles/ModalStyle";
import ReactModal from "react-modal";
import TransacaoForm from "./forms/TransacaoForm";
import HeaderModal from "@/components/partials/HeaderModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Transacao = () => {
  const router = useRouter();

  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
  const [currentTransacao, setCurrentTransacao] = useState<Partial<ITransacao>>(
    {}
  );
  const [funcionarios, setFuncionarios] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
    handleFetch();
  }, []);

  const fetchFuncionarios = () => {
    http
      .get("admin/usuarios")
      .then((r) => setFuncionarios(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const handleFetch = () => {
    http
      .get("admin/transacao")
      .then((r) => {
        setTransacoes(r.data.content);
      })
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const handleSubmit = (data: Partial<ITransacao>) => {
    http
      .post("user/transacao", data)
      .then((response) => {
        if (response.status === 201) {
          handleFetch();
          closeModal();
        } else {
          alert("Erro ao adicionar o animal");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  const handleUpdateSubmit = (data: Partial<ITransacao>) => {
    http
      .put(`user/transacao/${currentTransacao.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          handleFetch();
        } else {
          alert("Erro ao atualizar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: number) => {
    http
      .delete(`admin/tarefa/${id}`)
      .then((response) => {
        handleFetch();
      })
      .catch((error) => console.error("Error:", error));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="coluna">
        <h2 className="text-xl font-semibold">Finanças</h2>
        <div className="linha border-b">
          <label>
            <select
              className="input"
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              <option value="">Selecione o Mes</option>
              {funcionarios.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </label>
          <button className="botao" onClick={() => setIsOpen(true)}>
            Adicionar Finança
          </button>
        </div>

        <div className="lista">
          <div className="item-list">
            <div className="dados w-3/12">Decriçao</div>
            <div className="dados w-2/12">Categoria</div>
            <div className="dados w-1/12 justify-center">PG</div>
            <div className="dados w-1/12 justify-center">L/D</div>
            <div className="dados w-3/12">Data</div>
            <div className="dados w-2/12">Valor</div>
            <div className="dados border-r-0 p-0">Editar</div>
          </div>
          {transacoes.map((index) => (
            <div key={index.id} className="item-list">
              <div className="dados w-3/12">{index.descricao}</div>
              <div className="dados w-2/12">{index.categoria}</div>
              <div className="dados w-1/12 justify-center">
                {index.pago ? "V" : "X"}
              </div>
              <div className="dados w-1/12 justify-center">
                {index.despesa ? "V" : "X"}
              </div>
              <div className="dados w-3/12 justify-center">{index.data}</div>
              <div className="dados w-2/12 justify-center">
                {index.valor.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="dados border-r-0 p-0">
                <button
                  onClick={() => {
                    setCurrentTransacao(index);
                    setUpdateModalIsOpen(true);
                  }}
                >
                  <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                </button>
                <button onClick={() => handleDelete(index.id)}>
                  <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal selected="Adicione uma Tarefa" closeModal={closeModal} />
          <TransacaoForm handleSubmit2={handleSubmit} />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Edite a Tarefa"
            closeModal={closeUpdateModal}
          />
          <TransacaoForm
            data={currentTransacao}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default Transacao;
