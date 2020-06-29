import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";

import Context from "../Context";

import "./NoteOutput.css";

const NoteOutput = () => {
  const { markdownText } = useContext(Context);

  return (
    <div className="output">
      <h2>Preview</h2>
      <div className="result">
        <ReactMarkdown source={markdownText} />
      </div>
    </div>
  );
};

export default NoteOutput;
