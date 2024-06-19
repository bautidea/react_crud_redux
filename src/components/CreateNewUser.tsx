import { Button, Card, TextInput, Title } from "@tremor/react";
import { AddIcon } from "../assets/icons";
import { useUserActions } from "../hooks/useUserActions";
import "./CreateNewUser.css";

export function CreateNewUser() {
	const { addUser } = useUserActions();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		// In order to obtain the values from 'TextInputs'im going to use
		// uncontrolled form.
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		addUser({ name, email, github });
	}

	return (
		<Card className="newUserCard">
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="newUserForm">
				<TextInput name="name" className="textInput" placeholder="Name" />
				<TextInput name="email" className="textInput" placeholder="Email" />
				<TextInput name="github" className="textInput" placeholder="Github" />

				<Button className="submitBtn" type="submit">
					<AddIcon />
				</Button>
			</form>
		</Card>
	);
}
