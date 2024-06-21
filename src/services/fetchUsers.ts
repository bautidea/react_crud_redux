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
				id: String(id),
				name,
				email,
				github: username,
			}));
		})
		.catch((err) => console.log(`Error when fetching data: ${err}`));
}
