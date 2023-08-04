import { useState, useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { ITarefa, IUser } from "@/interfaces/interfaces";
import { TarefaResolver } from "@/utils/validator";
import http from "@/utils/http";

interface FormularioProdServProps {
  data?: Partial<ITarefa>;
  handleSubmit2: (data: Partial<ITarefa>) => void;
}

export interface ITarefa2 {
  id: number;
  titulo: string;
  descricao: string;
  feito: boolean;
  data: string;
}

const TaskForm: React.FC<FormularioProdServProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const formMethods = useForm({ resolver: TarefaResolver });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = formMethods;

  const [titulo, setTitulo] = useState(data.titulo || "");
  const [descricao, setDescricao] = useState(data.descricao || "");
  const [feito, setFeito] = useState(data.feito || false);
  const [dataP, setDataP] = useState(data.data || "");

  useEffect(() => {
    if (data) {
      setTitulo(data.titulo || "");
      setDescricao(data.descricao || "");
      setFeito(data.feito || false);
      setDataP(data.data || "");
    }
  }, []);

  const submitForm = (values: any) => {
    handleSubmit2({ titulo, descricao, feito, data: dataP });
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <div className="linha">
          <input
            type="text"
            {...register("titulo")}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Titulo da Tarefa"
            className="input"
            required
          />
        </div>
        <div className="linha">
          <textarea
            {...register("descricao")}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            className="input h-32"
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
            <span className="mr-2 text-gray-700">Finalizada:</span>
            <input
              {...register("feito")}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={feito || false}
              onChange={() => setFeito(!feito)}
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

export default TaskForm;
