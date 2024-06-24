import type { UserId, UserWithId } from "../store/users/slice";

const usersEndPoint = "https://jsonplaceholder.typicode.com/users";

interface FetchedData {
	id: number;
	name: string;
	email: string;
	username: string;
}

export async function fetchUsers() {
	return fetch(usersEndPoint)
		.then((res) => {
			if (!res) {
				throw new Error("Network response was not ok");
			}

			return res.json();
		})
		.then((userData) => {
			return userData.map(({ id, name, email, username }: FetchedData) => ({
				id,
				name,
				email,
				github: username,
			}));
		})
		.catch((err) => console.log(`Error when fetching data: ${err}`));
}

export async function createUser({ id, name, email, github }: UserWithId) {
	return fetch(usersEndPoint, {
		method: "POST",
		body: JSON.stringify({
			id,
			name,
			email,
			username: github,
		}),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			// Ensuring the error is thrown to trigger the catch-block
			// in the middleware.
			throw err;
		});
}

export async function deleteUser(id: UserId) {
	return fetch(`${usersEndPoint}/${id}`, {
		method: "DELETE",
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			// Ensuring the error is thrown to trigger the catch-block
			// in the middleware.
			throw err;
		});
}
