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
							<TableHeaderCell>Actions</TableHeaderCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{users.map((item) => (
							<TableRow key={item.id} className="listOfUsers">
								<UserCell user={item} />
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
}

function EditCell({ user }: UserCellProps) {
	return (
		<>
			<div>sss</div>
		</>
	);
}
