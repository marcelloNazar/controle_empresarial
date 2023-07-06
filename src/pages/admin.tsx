import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAdmin, isAuthenticated, getToken } from "../utils/auth";
import Header from "../components/Header";

export type Task = {
  id: number;
  titulo: string;
  descricao: string;
  feito: boolean;
  data: string;
  assignedTo: {
    id: number;
    username: string;
    role: string;
  };
};

export type User = {
  id: number;
  username: string;
  role: string;
};

type TaskResponse = {
  content: Task[];
};

type UserResponse = {
  content: User[];
};

const AdminHomePage = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const token = getToken();

    const requestOptions = {
      headers: { Authorization: "Bearer " + token },
    };
    fetch("http://localhost:8080/admin/usuarios", requestOptions)
      .then((res) => res.json())
      .then((data: UserResponse) => setUsers(data.content))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const token = getToken();

    const requestOptions = {
      headers: { Authorization: "Bearer " + token },
    };
    if (selectedUser !== null) {
      fetch(
        `http://localhost:8080/admin/tarefa/user/${selectedUser}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data: TaskResponse) => setTasks(data.content))
        .catch((err) => console.error(err));
    }
  }, [selectedUser]);

  return (
    <div className="bg-gray-800 min-h-screen">
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-semibold mb-6">
          Welcome to the Admin Home Page
        </h1>
        <div className="flex justify-center">
          <div className="w-1/3 bg-slate-600 rounded h-max p-4">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <div className="mb-4">
              <label>
                Select user:
                <select
                  className="ml-2 border text-black rounded px-2 py-1"
                  onChange={(e) => setSelectedUser(Number(e.target.value))}
                >
                  <option value="">Select user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {tasks.map((task) => (
              <div key={task.id} className="flex jus">
                <h3 className="font-semibold">{task.titulo}</h3>
                <p>{task.descricao}</p>
                <p>{task.feito ? "Done" : "Pending"}</p>
                <p>Due: {task.data}</p>
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-4">{/* Placeholder for right side */}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
