import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const tarefaValidator = Yup.object({
  titulo: Yup.string().required("Obrigado informar o Titulo"),
  descricao: Yup.string(),
  feito: Yup.boolean(),
  data: Yup.string().required("Obrigado informar a Data Prevista"),
});

export const TarefaResolver = yupResolver(tarefaValidator);

const transacaoValidator = Yup.object({
  valor: Yup.string().required("Obrigado informar o Preço"),
  descricao: Yup.string().required("Obrigado informar a Descrição"),
  despesa: Yup.boolean(),
  pago: Yup.boolean(),
  data: Yup.string(),
  categoria: Yup.string().required("Obrigado informar a Categoria"),
});

export const TransacaoResolver = yupResolver(transacaoValidator);
