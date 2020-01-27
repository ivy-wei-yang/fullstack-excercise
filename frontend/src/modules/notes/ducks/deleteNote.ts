import { createAsyncReducer } from "core/utils/asyncReducer";

const { actions: acts, reducer } = createAsyncReducer("DELETE_NOTE");

export const actions = acts;
export default reducer;
