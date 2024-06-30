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

function EditCell({ user }: UserCellProps) {
	const { id, name, email, github } = user;

	const { editUser } = useUserActions();

	const handleStopEdit = () => {
		editUser(id);
	};

	return (
		<>
			<TableCell>{id}</TableCell>

			<TableCell>
				<TextInput name="name" placeholder={name} className="editInput" />
			</TableCell>

			<TableCell>
				<TextInput name="email" placeholder={email} className="editInput" />
			</TableCell>

			<TableCell className="gitCell">
				<TextInput name="github" placeholder={github} className="editInput" />
			</TableCell>

			<TableCell className="actionCell">
				<button type="button" className="marginRight">
					<CheckIcon />
				</button>
				<button type="button" onClick={handleStopEdit}>
					<XCircle />
				</button>
			</TableCell>
		</>
	);
}
