import React, { useState } from "react";

const StoryPage = () => {

  const [storyTitle, setStoryTitle] = useState('Family Story');
  const [editing, setEditing] = useState(false);

  const handleTitleInput = event => {
    setStoryTitle(event.target.value)
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
      <div className="story-title">
        <h3>{storyTitle}</h3>
        <button onClick={handleOpenForm}>Edit</button>
      </div>
      {editing && <form>
        <input value={storyTitle} onInput={handleTitleInput} />
        <button onClick={handleCloseForm}>Save</button>
      </form>}
    </main>
  );

};

export default StoryPage;

  