import { createStore, combineReducers } from "redux";
import UserDetailReducer from "./Reducer/UserDetailReducer";
import CategoryReducer from "./Reducer/CategoryReducer";
import ProductReducer from "./Reducer/ProductReducer";

const rootReducer = combineReducers({
  userDetail: UserDetailReducer,
  categoryReducer: CategoryReducer,
  productReducer: ProductReducer,
});

const ConfigureStore = () => {
  return createStore(rootReducer);
};

export default ConfigureStore;
