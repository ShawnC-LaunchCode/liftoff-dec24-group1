import React, { useState } from "react";

const Textbox = ({
  

}) => {

  const [textbox, setTextbox] = useState('Write your family history here!');
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
      <div className="textbox-container">
        <h3 className="text-box">{textbox}</h3>
        <button className="textbox-edit-button" onClick={handleOpenForm}>Edit</button>
      </div>
      {editing && <form>
        <input value={textbox} onInput={handleTextInput} />
        <button className="textbox-save-button" onClick={handleCloseForm}>Save</button>
      </form>}
    </main>
  );

};

export default Textbox;