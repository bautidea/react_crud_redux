import { TableCell } from "@tremor/react";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import { usePopUpWindowActions } from "../../hooks/usePopUpWindowActions";
import { useUserActions } from "../../hooks/useUserActions";
import type { UserCellProps } from "../../types";
import "./ListOfUsers.css";

export function UserCell({ user }: UserCellProps) {
	const { removeUser, editUser } = useUserActions();

	const { setTextMessageWindow, showMessageWindow } = usePopUpWindowActions();

	const { id, name, email, github } = user;

	function handleRemoveClick() {
		setTextMessageWindow(`User ${id} is going to be deleted, ok?`);
		showMessageWindow();
		// action to be passed -> removeUser(id);
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
			<TableCell>
				<div className="actionCell">
					<button
						type="button"
						className="marginRight"
						onClick={handleEditClick}
					>
						<EditIcon />
					</button>
					<button type="button" onClick={handleRemoveClick}>
						<DeleteIcon />
					</button>
				</div>
			</TableCell>
		</>
	);
}
