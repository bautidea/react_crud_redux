import { useAppDispatch } from "../hooks/store";
import { deleteUserById, type UserId } from "../store/users/slice";

export function useUserActions() {
	// In order to use reducer, first we must retrieve the way of performing
	// actions, by using 'useAppDispatch'. This dispatch allow us to send
	// actions.
	const dispatch = useAppDispatch();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { removeUser };
}
