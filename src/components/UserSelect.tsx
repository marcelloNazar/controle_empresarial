import { ChangeEvent } from "react";
import { IUser } from "@/interfaces/interfaces";

type UserSelectProps = {
  users: IUser[];
  onUserSelect: (userId: number | null) => void;
};

const UserSelect = ({ users, onUserSelect }: UserSelectProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(event.target.value);
    onUserSelect(selectedUserId);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a user...</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserSelect;
