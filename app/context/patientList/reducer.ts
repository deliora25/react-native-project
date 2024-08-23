import { SET_PATIENT_LIST } from "./constants";
import { Action, State } from "./types";

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PATIENT_LIST: {
      const { patients } = payload;
      return { ...state, patients };
    }

    default:
      return state;
  }
};

export default reducer;
