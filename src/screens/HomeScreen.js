import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Marswit from "../components/Marswit";
import MarswitFactory from "../components/MarswitFactory";

const HomeScreen = ({ userObj }) => {
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

  return (
    <>
      <MarswitFactory userObj={userObj} />
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
