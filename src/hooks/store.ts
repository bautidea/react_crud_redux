import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

// This custom hook was created with the objective of unifying the types, so we dont have to specify
// the type of the used states in every part of the code that is used.
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// So in this way instead of importing the 'useDispatch' and 'useSelector'from react-redux and declaring it's
// type.
// Im going to import 'useDispatch'from this hook, and i wont have to type the types.

// This is from the Redux documentation (https://redux.js.org/usage/usage-with-typescript):
/*
  "While it's possible to import the RootState and AppDispatch types into each component, 
  it's better to create pre-typed versions of the useDispatch and useSelector hooks for usage in your application. 
    This is important for a couple reasons:
      - For useSelector, it saves you the need to type (state: RootState) every time
      - For useDispatch, In order to correctly dispatch thunks, you need to use the specific customized AppDispatch 
        type from the store that includes the thunk middleware types, and use that with useDispatch. 
        Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed."
*/
