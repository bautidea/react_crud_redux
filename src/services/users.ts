import type { FetchedData, UserId, UserWithId } from "../types";

const usersEndPoint = "https://jsonplaceholder.typicode.com/users";

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
				beingEdit: false,
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

export async function updateUser(user: UserWithId) {
	return fetch(`${usersEndPoint}/${user.id}`, {
		method: "PUT",
		body: JSON.stringify({
			id: user.id,
			name: user.name,
			email: user.email,
			username: user.github,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			throw err;
		});
}
