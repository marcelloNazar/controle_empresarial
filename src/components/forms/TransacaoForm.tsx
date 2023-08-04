import { useState, useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { ITransacao } from "@/interfaces/interfaces";
import { TransacaoResolver } from "@/utils/validator";

interface FormularioProps {
  data?: Partial<ITransacao>;
  handleSubmit2: (data: Partial<ITransacao>) => void;
}

const TransacaoForm: React.FC<FormularioProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const formMethods = useForm({ resolver: TransacaoResolver });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = formMethods;

  const [valor, setValor] = useState(
    data.valor ? data.valor.toString().replace(".", ",") : ""
  );
  const [descricao, setDescricao] = useState(data.descricao || "");
  const [despesa, setDespesa] = useState(data.despesa || false);
  const [pago, setPaga] = useState(data.pago || false);
  const [dataP, setDataP] = useState(data.data || "");
  const [categoria, setCategoria] = useState(data.categoria || "");

  useEffect(() => {
    if (data) {
      setValor(data.valor ? data.valor.toString().replace(".", ",") : "");
      setDescricao(data.descricao || "");
      setDespesa(data.despesa || false);
      setPaga(data.pago || false);
      setDataP(data.data || "");
      setCategoria(data.categoria || "");
    }
  }, []);

  const submitForm = (values: any) => {
    console.log("aaaa");
    handleSubmit2({
      valor: Number(valor.replace(",", ".")),
      descricao,
      despesa,
      pago,
      data: dataP,
      categoria,
    });
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValor = e.target.value;
    const decimalPart = inputValor.split(",")[1];

    if (
      inputValor === "" ||
      (!isNaN(Number(inputValor.replace(",", "."))) &&
        (!decimalPart || decimalPart.length <= 2))
    ) {
      setValor(inputValor);
    }
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <div className="linha">
          <input
            type="text"
            {...register("valor")}
            value={valor}
            onChange={handleValorChange}
            placeholder="Valor"
            className="input"
            required
          />
        </div>
        <div className="linha">
          <input
            type="text"
            {...register("descricao")}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            className="input"
            required
          />
        </div>
        <div className="linha">
          <input
            {...register("data")}
            type="date"
            placeholder="Cor"
            value={dataP}
            onChange={(e) => setDataP(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="linha justify-center">
          <label className="flex items-center justify-center">
            <span className="mr-2 text-gray-700">Despesa</span>
            <input
              {...register("despesa")}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={despesa || false}
              onChange={() => setDespesa(!despesa)}
            />
          </label>
        </div>
        <div className="linha">
          <select
            className="input "
            {...register("categoria")}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Categoria</option>
            <option value="Aliment.">Alimentação</option>
            <option value="Transp.">Transporte</option>
          </select>
        </div>
        <div className="linha justify-center">
          <label className="flex items-center justify-center">
            <span className="mr-2 text-gray-700">Quitada</span>
            <input
              {...register("pago")}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={pago || false}
              onChange={() => setPaga(!pago)}
            />
          </label>
        </div>
      </form>
      <button
        onClick={handleSubmit(submitForm)}
        type="submit"
        className="botao"
      >
        Adicionar
      </button>
    </div>
  );
};

export default TransacaoForm;
