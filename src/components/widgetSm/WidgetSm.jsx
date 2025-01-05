import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Thành viên mới</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/736x/c3/7b/07/c37b071e0a955d174f433135def06a87.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Giang</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/736x/c3/7b/07/c37b071e0a955d174f433135def06a87.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Giang</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/736x/c3/7b/07/c37b071e0a955d174f433135def06a87.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Giang</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/736x/c3/7b/07/c37b071e0a955d174f433135def06a87.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Giang</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/736x/c3/7b/07/c37b071e0a955d174f433135def06a87.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Giang</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
