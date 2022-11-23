import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
import React, { HTMLInputTypeAttribute, useContext, useState } from "react";
import { authContext } from "../Auth";
import InputComponent from "../Components/InputComponent";

//the login page
export default function LoginPage() {
  const { login } = useContext(authContext);

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<number>();
  const [inputType, setInputType] =
    useState<HTMLInputTypeAttribute>("password");

  async function onLogin() {
    const { code, err, nav } = await login({
      login: loginValue,
      password: password,
    });

    if (err) {
      return setError(code);
    }

    return nav();
  }

  return (
    <div className="p-10 w-[30rem] space-y-4">
      <InputComponent
        disabled={false}
        helpertext="Deine E-Mail bleibt privat und ohne Spam!"
        IconLeft={{ Icon: EnvelopeIcon }}
        label="E-Mail"
        name="email"
        placeholder="Deine E-Mail"
        required
        setValue={setLoginValue}
        state="normal"
        type="email"
        value={loginValue}
      />
      <InputComponent
        disabled={false}
        helpertext="Dein Passwort muss möglichst sicher sein!"
        IconLeft={{ Icon: KeyIcon }}
        IconRight={{
          Icon: inputType === "text" ? EyeIcon : EyeSlashIcon,
          onClick: () => {
            if (inputType === "password") setInputType("text");
            if (inputType === "text") setInputType("password");
          },
        }}
        label="Passwort"
        name="password"
        placeholder="Dein Passwort"
        required
        setValue={setPassword}
        state="normal"
        type={inputType}
        value={password}
      />
      <button onClick={onLogin}>Login</button>
    </div>
  );
}
