import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { AddIcon } from "../assets/icons";
import { useUserActions } from "../hooks/useUserActions";
import "./CreateNewUser.css";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		// In order to obtain the values from 'TextInputs'im going to use
		// uncontrolled form.
		event.preventDefault();

		setResult(null);

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		// Performing some validations
		if (!name || !email || !github) {
			setResult("ko");
			// Setting a timeout so the badge disappear overtime.
			return setTimeout(() => setResult(null), 2500);
		}

		setResult("ok");
		addUser({ name, email, github });

		// After setting states im resetting the form so the inputs get cleansed.
		form.reset();
		// Setting a timeout so badge disappear.
		setTimeout(() => setResult(null), 2000);
	}

	return (
		<Card className="newUserCard">
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="newUserForm">
				<TextInput name="name" className="textInput" placeholder="Name" />
				<TextInput name="email" className="textInput" placeholder="Email" />
				<TextInput name="github" className="textInput" placeholder="Github" />

				<div className="btnContainer">
					<Button className="submitBtn" type="submit">
						<AddIcon />
					</Button>

					<span className="tooltip">
						{result === "ok" && (
							<Badge className="badge badgeGreen">User saved</Badge>
						)}

						{result === "ko" && (
							<Badge className="badge badgeRed">Fields cant be empty</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
