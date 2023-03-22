import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
      </form>
      <div>
        <button>구글로 로그인</button>
        <button>깃허브로 로그인</button>
      </div>
    </>
  );
};

export default AuthScreen;
