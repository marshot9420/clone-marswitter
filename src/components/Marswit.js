import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Marswit = ({ marswitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMarswit, setNewMarswit] = useState(marswitObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("진짜로 지우려고?");
    if (ok) {
      const marswitTextRef = doc(dbService, "marswits", `${marswitObj.id}`);
      await deleteDoc(marswitTextRef);
      const urlRef = ref(storageService, marswitObj.attachmentUrl);
      await deleteObject(urlRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    const marswitTextRef = doc(dbService, "marswits", `${marswitObj.id}`);
    event.preventDefault();
    await updateDoc(marswitTextRef, { text: newMarswit });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMarswit(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="편집하는중..."
              value={newMarswit}
              required
              onChange={onChange}
            />
            <input type="submit" value="업데이트" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{marswitObj.text}</h4>
          {marswitObj.attachmentUrl && (
            <img src={marswitObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>MarsWit 삭제</button>
              <button onClick={toggleEditing}>MarsWit 편집</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Marswit;
