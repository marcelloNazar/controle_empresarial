import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";
import Header from "@/components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import http from "@/utils/http";
import {
  ITarefa,
  IUser,
} from "@/interfaces/interfaces";
import Task from "@/components/Task";
import Transacao from "@/components/Transacao";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const AdminHomePage = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const [transacao, setTransacao] = useState<ITarefa[]>([]);
  const [categoria, setCategoria] = useState<ITarefa[]>([]);
  const [funcionarios, setFuncionarios] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

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
      .then((r) => setTasks(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchTransacao = () => {
    http
      .get("admin/transacao")
      .then((r) => setTransacao(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchCategoria = () => {
    http
      .get("user/categoria")
      .then((r) => setTransacao(r.data.content))
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

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-screen flex bg-gray-950 text-black">
      <header className="h-10 w-full absolute items-center top-0">
        <Header />
      </header>
      <div className="w-full flex  max-w-6xl mx-auto ">
        <main className="flex pt-10 w-full h-full ">
          <div className="w-1/2 h-full p-2 pr-1">
            <Task />
          </div>
          <div className="w-1/2 h-full p-2 pl-1">
            <Transacao />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;
