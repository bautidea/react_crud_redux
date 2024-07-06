// 'use client';
import { TableCell, TextInput } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, XCircle } from "../../assets/icons";
import { usePopUpWindowActions } from "../../hooks/usePopUpWindowActions";
import { useUserActions } from "../../hooks/useUserActions";
import { possibleActions } from "../../store/popUpWindow/slice";
import type { UserCellProps } from "../../types";
import "./ListOfUsers.css";

interface UsersEditInput {
	name: string;
	email: string;
	github: string;
}

export function EditCell({ user }: UserCellProps) {
	const { id, name, email, github } = user;

	const { editUser } = useUserActions();

	const { showMessageWindow } = usePopUpWindowActions();

	const [editValues, setEditValues] = useState<UsersEditInput>({
		name,
		email,
		github,
	});

	const handleStopEdit = () => {
		editUser(id);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// I get the name to edit and its value.
		const inputName = e.target.name;
		const inputValue = e.target.value;

		setEditValues((prevValue) => ({
			...prevValue,
			[inputName]: inputValue,
		}));
	};

	const handleCommitEdit = () => {
		const { name, email, github } = editValues;

		if (!name || !email || !github) {
			return toast.error("Fields cant be empty when editing a user");
		}

		const message = `User ${id} information is going to be updated, ok?`;
		const actionToExecute = {
			type: possibleActions.update,
			payload: { id, name, email, github },
		};
		showMessageWindow(message, actionToExecute);
	};

	return (
		<>
			<TableCell>{id}</TableCell>

			<TableCell>
				<form onSubmit={handleCommitEdit}>
					<TextInput
						name="name"
						value={editValues.name}
						onChange={handleInputChange}
						className="editInput"
					/>
				</form>
			</TableCell>

			<TableCell>
				<form onSubmit={handleCommitEdit}>
					<TextInput
						name="email"
						value={editValues.email}
						onChange={handleInputChange}
						className="editInput"
					/>
				</form>
			</TableCell>

			<TableCell className="gitCell">
				<form onSubmit={handleCommitEdit}>
					<TextInput
						name="github"
						value={editValues.github}
						onChange={handleInputChange}
						className="editInput"
					/>
				</form>
			</TableCell>

			<TableCell>
				<div className="actionCell">
					<button
						type="button"
						className="marginRight"
						onClick={handleCommitEdit}
					>
						<CheckIcon />
					</button>
					<button type="button" onClick={handleStopEdit}>
						<XCircle />
					</button>
				</div>
			</TableCell>
		</>
	);
}
