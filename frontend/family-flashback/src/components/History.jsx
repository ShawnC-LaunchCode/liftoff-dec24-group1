import React, {useState, useEffect} from "react";
import Textbox from "./family_history/TextBox";
import ImageUpload from "./family_history/ImageUpload";
import Title from "./family_history/Title";
import Comments from "./family_history/Comments";

import "../history.css";

const HistoryMain = () => {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        //replace currentUserId with proper endpoint, or endpoint needs created
        const response = await fetch('http://localhost:8080/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched JSON data:', data); // Log the JSON data to the console
        setCurrentUserId(data.id);
      } catch (error) {
        console.error('Error fetching current user ID:', error);
      }
    };
  
    fetchCurrentUserId();
  }, []);

  // if (currentUserId === null) {
  //   return <div>Loading...</div>; // Display a loading state while fetching user ID
  // }

  return (
    <div>
      <h1>
        <Title />
      </h1>
      <section>
        <div>
          <ImageUpload />
        </div>
        <h2 className="textbox">
          <Textbox />
        </h2>
        <div>
          {/* change currentUserId here if needed */}
          <Comments currentUserId={currentUserId} />
        </div>
      </section>
    </div>
  );
};

export default HistoryMain;
