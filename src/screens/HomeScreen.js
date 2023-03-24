import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Marswit from "../components/Marswit";
import { dbService } from "../fbase";

const HomeScreen = ({ userObj }) => {
  const [marswit, setMarswit] = useState("");
  const [marswits, setMarswits] = useState([]);
  const [attachment, setAttachment] = useState();

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

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="MarsWit" />
        {attachment && (
          <>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>취소</button>
          </>
        )}
      </form>
      <div>
        {marswits.map((marswit) => (
          <Marswit
            key={marswit.id}
            marswitObj={marswit}
            isOwner={marswit.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
