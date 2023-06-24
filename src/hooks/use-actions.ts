import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

// use this to access action from component. so you dont always have to create dispatch all the time
// e.g. 
// const { updateCell } = useActions();
// updateCell(blahblah);
export const useActions = () => {
  const dispatch = useDispatch();

  // useMemo can bind bundle only once
  // useMemo is kinda useState and useEffect put together, sort of.
  return useMemo( () => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
}
