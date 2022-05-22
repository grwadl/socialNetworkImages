import {applyMiddleware,combineReducers,createStore } from "redux";
import { AuthReducer } from "../reducers/AuthReducer";
import { CurrentPageReducer } from "../reducers/CurrentPageReducer";
import { ModalReducer } from "../reducers/ModalReducer";
import { MyPostsReducer } from "../reducers/MyPostsReducer";
import { AllPostsReducer } from "../reducers/AllPostsReducer";
import { LoadingReducer } from "../reducers/LoadingReducer";
import { BurgerMenuReducer } from "../reducers/BurgerMenuReducer";
import { AddAvatarReducer } from "../reducers/AddAvatarReducer";
import { PaginationReducer } from "../reducers/PaginationReducer";
import { ErrorsReducer } from "../reducers/ErrorReducer";
import { PostsInProfileReducer } from "../reducers/PostsInProfileReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
const reducers = combineReducers({
    AuthReducer,
  ModalReducer,
  CurrentPageReducer,
  MyPostsReducer,
  AllPostsReducer,
  LoadingReducer,
  BurgerMenuReducer,
  AddAvatarReducer,
  PaginationReducer,
  PostsInProfileReducer,
  ErrorsReducer
  });
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));