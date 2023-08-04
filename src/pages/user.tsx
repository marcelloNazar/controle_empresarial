import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";
import Header from "@/components/Header";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

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

const UserHomePage = () => {
  const router = useRouter();

  return (
    <div>
      <Header />
      <h1>Bem-vindo à página inicial do Usuário</h1>
      {/* Aqui vai o conteúdo da página inicial do usuário */}
    </div>
  );
};

export default UserHomePage;
