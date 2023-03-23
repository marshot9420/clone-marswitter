import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbase";

const HomeScreen = () => {
  const [marswit, setMarswit] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(dbService, "marswits"), {
      marswit,
      createdAt: Date.now(),
    });
    console.log(docRef);
    setMarswit("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMarswit(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각을 하고있나요?"
          maxLength={120}
          value={marswit}
          onChange={onChange}
        />
        <input type="submit" value="MarsWit" />
      </form>
    </>
  );
};

export default HomeScreen;
