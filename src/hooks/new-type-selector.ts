import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';


// use this whenever want to access state from component
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;