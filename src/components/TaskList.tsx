import { Task } from "../pages/admin";

type TaskListProps = {
  tasks: Task[];
};

const TaskList = ({ tasks }: TaskListProps) => (
  <ul>
    {tasks.map((task) => (
      <li key={task.id}>
        <h3>{task.titulo}</h3>
        <p>{task.descricao}</p>
      </li>
    ))}
  </ul>
);

export default TaskList;
