import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import http from "@/utils/http";
import {
  ITarefa,
  IUser,
  ITransacao,
  ICategoria,
} from "@/interfaces/interfaces";
import { customStyles } from "@/styles/ModalStyle";
import ReactModal from "react-modal";
import TaskForm from "@/components/forms/TaskForm";
import HeaderModal from "@/components/partials/HeaderModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Task = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const [currentTask, setCurrentTask] = useState<Partial<ITarefa>>({});
  const [funcionarios, setFuncionarios] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
    fetchTarefas();
  }, []);

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
  };

  const fetchFuncionarios = () => {
    http
      .get("admin/usuarios")
      .then((r) => setFuncionarios(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchTarefas = () => {
    http
      .get("admin/tarefa")
      .then((r) => {
        setTasks(r.data.content);
        console.log(r.data);
      })
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const handleSubmit = (data: Partial<ITarefa>) => {
    if (selected) {
      const taskData = {
        ...data,
        assignedToId: selected,
      };
      console.log(taskData);
      http
        .post("admin/tarefa", taskData)
        .then((response) => {
          if (response.status === 201) {
            fetchTarefas();
            closeModal();
          } else {
            alert("Erro ao adicionar o animal");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  const handleUpdateSubmit = (data: Partial<ITarefa>) => {
    http
      .put(`admin/tarefa/${currentTask.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchTarefas();
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
        fetchTarefas();
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
        <h2 className="text-xl font-semibold">Tarefas</h2>
        <div className="linha border-b">
          <label>
            <select
              className="input"
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              <option value="">Selecione o Funcionario</option>
              {funcionarios.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </label>
          <button
            className="botao"
            onClick={() => {
              if (selected) {
                setIsOpen(true);
              } else {
                alert("Selecione um encarregado para a Tarefa!");
              }
            }}
          >
            Adicionar Tarefa
          </button>
        </div>

        <div className="lista">
          <div className="item-list">
            <div className="dados w-4/12">titulo</div>
            <div className="dados w-3/12">Funcionario</div>
            <div className="dados w-1/12 justify-center">Feito</div>
            <div className="dados w-3/12">Data</div>
            <div className="dados border-r-0 p-0">Editar</div>
          </div>
          {tasks.map((task) => (
            <div key={task.id} className="item-list">
              <div className="dados w-4/12">{task.titulo}</div>
              <div className="dados w-3/12">{task.assignedTo.username}</div>
              <div className="dados w-1/12 justify-center">
                {task.feito ? "V" : "X"}
              </div>
              <div className="dados w-3/12 justify-center">{task.data}</div>
              <div className="dados border-r-0 p-0">
                <button
                  onClick={() => {
                    setCurrentTask(task);
                    setUpdateModalIsOpen(true);
                  }}
                >
                  <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                </button>
                <button onClick={() => handleDelete(task.id)}>
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
          <TaskForm handleSubmit2={handleSubmit} />
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
          <TaskForm data={currentTask} handleSubmit2={handleUpdateSubmit} />
        </div>
      </ReactModal>
    </div>
  );
};

export default Task;
