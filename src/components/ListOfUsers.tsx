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
	Title,
} from "@tremor/react";
import { DeleteIcon, EditIcon } from "../assets/icons";
import { useAppSelector } from "../hooks/useStore";
import "./ListOfUsers.css";

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
								<TableCell>{item.id}</TableCell>

								<TableCell className="nameCell">
									<img
										className="userImg"
										src={`https://unavatar.io/github/${item.github}`}
										alt={`gitHub of ${item.name}`}
									/>

									{item.name}
								</TableCell>

								<TableCell>{item.email}</TableCell>

								<TableCell>
									<button type="button" className="marginRight">
										<EditIcon />
									</button>
									<button type="button">
										<DeleteIcon />
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
}
