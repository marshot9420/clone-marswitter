import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const HomeScreen = ({ userObj }) => {
  const [marswit, setMarswit] = useState("");
  const [marswits, setMarswits] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "marswits"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const marswitArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarswits(marswitArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(dbService, "marswits"), {
      text: marswit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
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
      <div>
        {marswits.map((marswit) => (
          <div key={marswit.id}>
            <h4>{marswit.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
