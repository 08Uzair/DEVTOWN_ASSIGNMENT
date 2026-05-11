import { signIn, signUp } from "../api";

export const userSignIn = async (fields) => {
  const { data } = await signIn(fields);

  localStorage.setItem("taskProfile", JSON.stringify(data));
};
export const userSignUp = async (fields) => {
  const { data } = await signUp(fields);

  localStorage.setItem("taskProfile", JSON.stringify(data));
};
