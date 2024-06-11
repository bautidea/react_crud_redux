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
import "./ListOfUsers.css";

const users: {
	id: string;
	name: string;
	email: string;
	github: string;
}[] = [
	{
		id: "1",
		name: "John Doe",
		email: "doe.jhon@gmail.com",
		github: "DoeJohn",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane.smith@hotmail.com",
		github: "JaneSmith",
	},
	{
		id: "3",
		name: "Alice Johnson",
		email: "alice.johnson@gmal.com",
		github: "AliceJohnson",
	},
	{
		id: "4",
		name: "Bob Brown",
		email: "bob.brown@gmail.com",
		github: "BobBrown",
	},
	{
		id: "5",
		name: "Charlie Davis",
		email: "charlie.davis@hotmail.com",
		github: "CharlieDavis",
	},
];

export default function Example() {
	return (
		<>
			<Card>
				<Title style={{ fontSize: "20px" }}>
					Users
					<Badge style={{ marginLeft: "10px" }}>{users.length}</Badge>
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

								<TableCell
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<img
										style={{
											width: "32px",
											height: "auto",
											borderRadius: "50%",
											marginRight: "10px",
										}}
										src={`https://unavatar.io/github/${item.github}`}
										alt={`gitHub of ${item.name}`}
									/>

									{item.name}
								</TableCell>

								<TableCell>{item.email}</TableCell>

								<TableCell>
									<button type="button">
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
