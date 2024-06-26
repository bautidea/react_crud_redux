import { TableCell } from "@tremor/react";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import { useUserActions } from "../../hooks/useUserActions";
import type { UserCellProps, UserId } from "../../types";
import "./ListOfUsers.css";

export function UserCell({ user }: UserCellProps) {
	const { removeUser } = useUserActions();

	const { id, name, email, github } = user;

	function handleRemoveClick(id: UserId) {
		removeUser(id);
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
			<TableCell>
				<button type="button" className="marginRight">
					<EditIcon />
				</button>
				<button type="button" onClick={() => handleRemoveClick(id)}>
					<DeleteIcon />
				</button>
			</TableCell>
		</>
	);
}
