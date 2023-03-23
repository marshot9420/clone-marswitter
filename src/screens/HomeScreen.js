import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const HomeScreen = () => {
  const [marswit, setMarswit] = useState("");
  const [marswits, setMarswits] = useState([]);

  const getMarswits = async () => {
    const querySnapshot = await getDocs(
      query(collection(dbService, "marswits"))
    );
    querySnapshot.forEach((doc) => {
      const marswitObject = {
        ...doc.data(),
        id: doc.id,
      };
      setMarswits((prev) => [marswitObject, ...prev]);
    });
  };

  useEffect(() => {
    getMarswits();
  }, []);

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
      <div>
        {marswits.map((marswit) => (
          <div key={marswit.id}>
            <h4>{marswit.marswit}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
