import React, { useState } from "react";

const Title = () => {

  const [historyTitle, setHistoryTitle] = useState('Family History');
  const [editing, setEditing] = useState(false);

  const handleTitleInput = event => {
    setHistoryTitle(event.target.value)
  };

  const handleOpenForm = () => {
    setEditing(true);
  };

  const handleCloseForm = event => {
    event.preventDefault();
    setEditing(false);
  };


  return (
    <main>
      <div className="title-container">
        <h3 className="title-input">{historyTitle}</h3>
        <button className="title-edit-button" onClick={handleOpenForm}>Edit</button>
      </div>
      {editing && <form>
        <input className="title-input" value={historyTitle} onInput={handleTitleInput} />
        <button className="title-save-button" onClick={handleCloseForm}>Save</button>
      </form>}
    </main>
  );

};

export default Title;