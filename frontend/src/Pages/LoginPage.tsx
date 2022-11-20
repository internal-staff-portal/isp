import React, { FormEvent, useContext, useState } from "react";
import { authContext } from "../Auth";

//the login page
export default function LoginPage() {
  const { login } = useContext(authContext);

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<number>();

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    <div>
      <form onSubmit={onLogin}>
        <input
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  );
}
