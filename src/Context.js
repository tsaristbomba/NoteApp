import React from "react";

const defaultContext = {
  markdownTex: "",
  setMarkDownText: () => {},
};

export default React.createContext(defaultContext);
