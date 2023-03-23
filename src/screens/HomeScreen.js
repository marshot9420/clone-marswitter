import React, { useState } from "react";

const HomeScreen = () => {
  const [marswit, setMarswit] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
