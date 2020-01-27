import { createAsyncReducer } from "core/utils/asyncReducer";

const { actions: acts, reducer } = createAsyncReducer("CREATE_NOTE");

export const actions = acts;
export default reducer;
