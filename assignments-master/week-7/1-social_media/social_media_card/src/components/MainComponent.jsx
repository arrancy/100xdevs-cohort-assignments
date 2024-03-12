import "./styles.css";
import myImage from "./rutuPhoto.png";
export function MainComponent() {
  return (
    <>
      <div className="main-card">
        <div className="upper partition">
          <img className="personImage" src={myImage}></img>
        </div>
        <div className="lower partition">
          <h4>person name</h4>
          <p>person location</p>
        </div>
        <div className="footer">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
