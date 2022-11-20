import {
  FetchFunction,
  LoggedInFunction,
  LoginFunction,
  LogoutFunction,
  useFetch,
  useLoggedIn,
  useLogin,
  useLogout,
} from "@authfunctions/react";
import React, { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// import { InputModes } from "./Components/Simple/Input";

interface Props {
  children: ReactNode | ReactNode[];
}

interface Errors {
  [key: number]: string;
  1: string;
  2: string;
  5: string;
  21: string;
  22: string;
  23: string;
  24: string;
  31: string;
  32: string;
  33: string;
  41: string;
  42: string;
  43: string;
  51: string;
  52: string;
  53: string;
}

const errors: Errors = {
  1: "Der AccessToken fehlt!",
  2: "Der AccessToken ist ungültig!",
  5: "Es gab einen Fehler mit dem Server!",
  21: "Die E-Mail, der Benutzername oder das Passwort fehlt!",
  22: "Der Benutzer wurde nicht gefunden!",
  23: "Das Passwort ist falsch!",
  24: "Der Benutzer ist deaktiviert!",
  31: "Der RefreshToken fehlt!",
  32: "Der RefreshToken ist ungültig!",
  33: "Der RefreshToken existiert nicht!",
  41: "Der RefreshToken fehlt!",
  42: "Der RefreshToken ist ungültig!",
  43: "Der RefreshToken existiert nicht!",
  51: "Der AccessToken oder der RefreshToken fehlt!",
  52: "Der RefreshToken ist ungültig!",
  53: "Der RefreshToken existiert nicht!",
};

// export function getInputMode(codes: number[], error?: number): InputModes {
//   if (!error) return "default";
//   if ([5, ...codes].includes(error)) return "danger";
//   return "success";
// }

export function getErrorMessage(codes: number[], error?: number): string {
  if (error && [5, ...codes].includes(error)) return errors[error];
  return "";
}

export interface IAuthFunctions {
  login: LoginFunction;
  logout: LogoutFunction;
  fetch: FetchFunction;
  loggedIn: LoggedInFunction;
}

export const authContext = createContext<IAuthFunctions>({
  login: async () => ({ err: true, code: 5, nav: () => null }),
  logout: async () => ({ err: true, code: 5, nav: () => null }),
  fetch: async () => ({
    auth: { code: 5, err: true },
    data: null,
    err: true,
    nav: () => "",
    res: new Response(),
  }),
  loggedIn: async () => false,
});

export default function Auth({ children }: Props) {
  //the initial navigator
  const naviator = useNavigate();

  //all auth methods
  const auth: IAuthFunctions = {
    fetch: useFetch(naviator),
    loggedIn: useLoggedIn(naviator),
    login: useLogin(naviator),
    logout: useLogout(naviator),
  };
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
