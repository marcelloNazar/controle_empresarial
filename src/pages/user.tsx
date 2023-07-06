import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAdmin, isAuthenticated } from "../utils/auth";
import Header from "../components/Header";

const UserHomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated() || isAdmin()) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <h1>Bem-vindo à página inicial do Usuário</h1>
      {/* Aqui vai o conteúdo da página inicial do usuário */}
    </div>
  );
};

export default UserHomePage;
