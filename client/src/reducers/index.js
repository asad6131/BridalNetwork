import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import vendorReducer from "./admin/vendorReducer";
import categoryReducer from "./admin/categoryReducer";
import surveyReducer from "./surveyReducer";
import plansReducer from "./admin/plansReducer";
import ChatReducer from "./chatReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  vendor: vendorReducer,
  category: categoryReducer,
  survey: surveyReducer,
  plans: plansReducer,
  ChatReducer: ChatReducer
});
