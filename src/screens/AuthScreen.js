import React, { useState } from "react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          required
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
      </form>
      <div>
        <button>구글로 로그인</button>
        <button>깃허브로 로그인</button>
      </div>
    </>
  );
};

export default AuthScreen;
