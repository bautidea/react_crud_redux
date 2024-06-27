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
import type { UserCellProps } from "../../types";
import "./ListOfUsers.css";
import { UserCell } from "./UserCell";

export default function Example() {
	// Im calling the '.users' property from 'store' reducer.
	const users = useAppSelector((state) => state.users);

	return (
		<>
			<Card>
				<Title className="tableTitle">
					Users
					<Badge className="badgeTitle">{users.length}</Badge>
				</Title>

				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Id</TableHeaderCell>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Email</TableHeaderCell>
							<TableHeaderCell>GitHub</TableHeaderCell>
							<TableHeaderCell>Actions</TableHeaderCell>
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

	return (
		<>
			<TableCell>{id}</TableCell>

			<TableCell>
				<TextInput name="name" placeholder={name} />
			</TableCell>

			<TableCell>
				<TextInput name="email" placeholder={email} />
			</TableCell>

			<TableCell>
				<TextInput name="github" placeholder={github} />
			</TableCell>

			<TableCell>
				<button type="button" className="marginRight">
					<CheckIcon />
				</button>

				<button type="button">
					<XCircle />
				</button>
			</TableCell>
		</>
	);
}
