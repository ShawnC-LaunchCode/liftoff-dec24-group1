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
      <div className="history-title">
        <h3>{historyTitle}</h3>
        <button onClick={handleOpenForm}>Edit</button>
      </div>
      {editing && <form>
        <input value={historyTitle} onInput={handleTitleInput} />
        <button onClick={handleCloseForm}>Save</button>
      </form>}
    </main>
  );

};

export default Title;