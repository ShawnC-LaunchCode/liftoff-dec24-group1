import ImageUpload from "./family_history/ImageUpload";
import Title from "./family_history/Title";
import "../history.css";

const HistoryMain = () => {

  return (
    <main>
      <div className="historyTitle">
       <Title /> 
      </div>
      <div className="imageUpload">
      <ImageUpload/>
      </div>
      
    </main>
  );

};

export default HistoryMain;

  