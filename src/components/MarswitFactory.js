import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const MarswitFactory = ({ userObj }) => {
  const [marswit, setMarswit] = useState("");
  const [attachment, setAttachment] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const marswitObj = {
      text: marswit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "marswits"), marswitObj);
    setMarswit("");
    setAttachment("");
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
  );
};

export default MarswitFactory;
