import { TableCell } from "@tremor/react";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import { useUserActions } from "../../hooks/useUserActions";
import type { UserCellProps } from "../../types";
import "./ListOfUsers.css";

export function UserCell({ user }: UserCellProps) {
	const { removeUser, editUser } = useUserActions();

	const { id, name, email, github } = user;

	function handleRemoveClick() {
		removeUser(id);
	}

	function handleEditClick() {
		editUser(id);
	}

	return (
		<>
			<TableCell>{id}</TableCell>
			<TableCell className="nameCell">
				<img
					className="userImg"
					src={`https://unavatar.io/github/${github}`}
					alt={`gitHub of ${name}`}
				/>
				{name}
			</TableCell>
			<TableCell>{email}</TableCell>
			<TableCell className="gitCell">{github}</TableCell>
			<TableCell className="actionCell">
				<button type="button" className="marginRight" onClick={handleEditClick}>
					<EditIcon />
				</button>
				<button type="button" onClick={handleRemoveClick}>
					<DeleteIcon />
				</button>
			</TableCell>
		</>
	);
}
