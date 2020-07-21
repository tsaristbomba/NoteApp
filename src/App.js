import React, { useState, useEffect, Fragment } from "react";
import ReactMarkdown from "react-markdown";

import NoteInput from "./components/NoteInput";
import NoteOutput from "./components/NoteOutput";
import Context from "./Context";

import "./App.css";

function App() {
  const [markdownText, setMarkdownText] = useState("");
  // Local data
  const [arr, setArr] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setId] = useState("");

  const contextValue = {
    markdownText,
    setMarkdownText,
  };

  useEffect(() => {
    const newArr = [];
    Object.entries(localStorage).forEach(([key, value]) => {
      newArr.unshift({
        id: key,
        text: value,
      });
    });
    setArr(newArr);
  }, []);

  const token = () => {
    return Math.random().toString(36).substr(2);
  };

  const handleSave = () => {
    if (markdownText !== "" && !edit) {
      const genToken = token();
      localStorage.setItem(`data${genToken}`, markdownText);
    } else if (edit) {
      localStorage.setItem(`${editId}`, markdownText);

      setId("");
      setEdit(false);
    }

    // Refresh local data to screen
    const newArr = [];
    Object.entries(localStorage).forEach(([key, value]) => {
      newArr.unshift({
        id: key,
        text: value,
      });
    });
    setArr(newArr);

    setMarkdownText("");
    setToggle(!toggle);
  };

  const handleDelete = (id) => {
    // DELETE CURRENT ITEM FROM ARRAY
    localStorage.removeItem(id);

    // Refresh local data to screen
    const newArr = [];
    Object.entries(localStorage).forEach(([key, value]) => {
      newArr.unshift({
        id: key,
        text: value,
      });
    });
    setArr(newArr);
  };

  const handleEdit = (id) => {
    setEdit(true);

    setMarkdownText("");

    setId(id);

    window.scrollTo(0, 0);

    setToggle(true);

    //setMarkdownText(localStorage.getItem(editId));

    //setToggle(true);
  };

  useEffect(() => {
    setMarkdownText(localStorage.getItem(editId));
  }, [editId]);

  return (
    <Context.Provider value={contextValue}>
      <div className="App">
        <h1>Markdown Note App</h1>
        <div className="note-container">
          {toggle ? (
            <Fragment>
              {/* {edit ? <NoteInput editInput={markdownText} /> : <NoteInput />} */}
              <NoteInput />
              <NoteOutput />
              <button
                className="btn-save success"
                type="button"
                onClick={handleSave}
              >
                Save / Close
              </button>
            </Fragment>
          ) : (
            <button
              className="success"
              type="button"
              onClick={() => setToggle(!toggle)}
            >
              Create a note
            </button>
          )}
        </div>
        <section>
          <h3>My notes</h3>
          <div className="saved-notes">
            {localStorage.length > 0 && arr !== null ? (
              arr.map((data, k) => (
                <div key={k}>
                  <div className="note">
                    <div className="x">
                      <button
                        className="little edit"
                        type="button"
                        onClick={() => handleEdit(data.id)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="little delete"
                        type="button"
                        onClick={() => handleDelete(data.id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <ReactMarkdown className="markdown" source={data.text} />
                  </div>
                </div>
              ))
            ) : (
              <div className="centered">
                <p>No saved notes</p>
              </div>
            )}
          </div>
        </section>
        {localStorage.length > 1 && (
          <button
            className="danger"
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure?")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Delete All
          </button>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
