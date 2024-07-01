// 'use client';
import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TextInput,
	Title,
} from "@tremor/react";
import { useState } from "react";
import { CheckIcon, XCircle } from "../../assets/icons";
import { useAppSelector } from "../../hooks/store";
import { useUserActions } from "../../hooks/useUserActions";
import type { UserCellProps } from "../../types";
import "./ListOfUsers.css";
import { UserCell } from "./UserCell";

export function ListOfUsers() {
	// Im calling the '.users' property from 'store' reducer.
	const users = useAppSelector((state) => state.users);

	return (
		<>
			<Card className="usersCard">
				<Title className="tableTitle">
					Users
					<Badge className="badgeTitle">{users.length}</Badge>
				</Title>

				<Table className="usersTable">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Id</TableHeaderCell>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Email</TableHeaderCell>
							<TableHeaderCell>GitHub</TableHeaderCell>
							<TableHeaderCell className="actionCell">Actions</TableHeaderCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{users.map((item) => (
							<TableRow key={item.id} className="listOfUsers">
								{(item.beingEdit && <EditCell user={item} />) || (
									<UserCell user={item} />
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
}

interface UsersEditInput {
	name: string;
	email: string;
	github: string;
}

function EditCell({ user }: UserCellProps) {
	const { id, name, email, github } = user;

	const { editUser } = useUserActions();

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

	const handleCommitEdit = () => {};

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
					<button type="button" className="marginRight">
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
