export * from "./common.slice";
import commonReducer from "./common.slice";
import loaderReducer from "./loader.slice";

export default {
  common: commonReducer,
  loader: loaderReducer,
};
