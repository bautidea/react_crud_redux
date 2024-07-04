// 'use client';
import {
	Badge,
	Card,
	Table,
	TableBody,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { useUserActions } from "../../hooks/useUserActions";
import { EditCell } from "./EditCell";
import "./ListOfUsers.css";
import { UserCell } from "./UserCell";

export function ListOfUsers() {
	// Im calling the '.users' property from 'store' reducer.
	const { users } = useUserActions();

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
