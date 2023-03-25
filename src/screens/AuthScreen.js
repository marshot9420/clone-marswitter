import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../fbase";
import AuthForm from "../components/AuthForm";

const AuthScreen = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <>
      <div>
        <AuthForm />
        <button name="google" onClick={onSocialClick}>
          구글로 로그인
        </button>
        <button name="github" onClick={onSocialClick}>
          깃허브로 로그인
        </button>
      </div>
    </>
  );
};

export default AuthScreen;
