export interface IUser {
  id: number;
  username: string;
  role: string;
}

export interface ITarefa {
  id: number;
  titulo: string;
  descricao: string;
  feito: boolean;
  data: string;
  assignedTo: IUser;
}

export interface ICategoria {
  id: number;
  nome: string;
  cor: string;
  icone: string;
}

export interface ITransacao {
  id: number;
  valor: number;
  despesa: boolean;
  pago: boolean;
  data: string;
  descricao: string;
  categoria: string;
}
