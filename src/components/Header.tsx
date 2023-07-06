import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { logout } from "../utils/auth";

const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="p-5 bg-blue-600 flex justify-between items-center text-white">
      <h1>{username}</h1>
      <button
        className="bg-red-600 hover:bg-red-700 p-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
