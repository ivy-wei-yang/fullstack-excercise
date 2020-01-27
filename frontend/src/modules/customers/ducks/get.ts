import { createAsyncReducer } from "core/utils/asyncReducer";

const { actions: acts, reducer } = createAsyncReducer("GET_CUSTOMER");

export const actions = acts;
export default reducer;
