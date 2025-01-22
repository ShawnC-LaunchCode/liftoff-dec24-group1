import ImageUpload from "./family_history/ImageUpload";
import Title from "./family_history/Title";
import Comment from "./family_history/Comment";
import "../history.css";

const HistoryMain = () => {

  return (
    <body className="wrapper">
        <h1 className="historyTitle"><Title /></h1> 
        <section>
          <div className="imageUpload"><ImageUpload/></div>
        </section>
        <section>
          <div><Comment /></div>
        </section>
    </body>
  );

};

export default HistoryMain;

  