import { createAsyncReducer } from "core/utils/asyncReducer";

const { actions: acts, reducer } = createAsyncReducer("UPDATE_CUSTOMER");

export const actions = acts;
export default reducer;
