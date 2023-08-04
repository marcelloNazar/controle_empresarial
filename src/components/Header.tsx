import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Header = () => {
  const router = useRouter();
  const { signOut, isAuthenticated, role } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    signOut();
  };

  const handleClick = () => {
    router.push("/gerenciar");
  };

  const handleHomeClick = () => {
    router.push("/admin");
  };

  return (
    <header className=" bg-black w-full flex justify-center">
      <div className="p-1 px-2 w-full max-w-6xl flex justify-between items-center text-white">
        {role === "ADMIN" ? (
          <button onClick={handleHomeClick}>
            <h1>Administrador</h1>
          </button>
        ) : (
          <h1>Funcionario</h1>
        )}
        <div className="flex w-28 justify-between">
          <div></div>
          <button
            className="vet-botao transform transition duration-200 hover:scale-105"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
