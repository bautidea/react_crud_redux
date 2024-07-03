import { useEffect } from "react";
import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUsers/ListOfUsers";
import { PopUpWindow } from "./components/PopUpWindow/PopUpWindow";
import { useUserActions } from "./hooks/useUserActions";

function App() {
	const { getUsers } = useUserActions();

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<PopUpWindow />
			<Toaster richColors />
		</>
	);
}

export default App;
