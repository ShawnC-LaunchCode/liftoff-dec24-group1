import React, { useState } from "react";

const Textbox = () => {

  const [textbox, setTextbox] = useState('');
  const [editing, setEditing] = useState(false);

  const handleTextInput = event => {
    setTextbox(event.target.value)
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
      <div>
        <h3>{textbox}</h3>
        <button onClick={handleOpenForm}>Edit</button>
      </div>
      {editing && <form>
        <input value={textbox} onInput={handleTextInput} />
        <button onClick={handleCloseForm}>Save</button>
      </form>}
    </main>
  );

};

export default Textbox;