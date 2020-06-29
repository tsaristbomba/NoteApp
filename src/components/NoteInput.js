import React, { useContext } from "react";

import Context from "../Context";

import "./NoteInput.css";

const NoteInput = () => {
  const { markdownText, setMarkdownText } = useContext(Context);

  const handleInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
  };

  return (
    <div className="editor">
      <h2>Create a note</h2>
      <textarea onChange={handleInputChange} defaultValue={markdownText} />
    </div>
  );
};

export default NoteInput;
