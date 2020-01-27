import { createAsyncReducer } from "core/utils/asyncReducer";

const { actions: acts, reducer } = createAsyncReducer("LIST_CUSTOMERS");

export const actions = acts;
export default reducer;
