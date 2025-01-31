import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function User() {
  const path = window.location.pathname.split("/");
  const Customerid = path[3];
  const [id, setid] = useState(Customerid);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/detailuser?id=${Customerid}`)
      .then((result) => {
        setPhone(result.data[0]["Phone_Number"]);
        setName(result.data[0]["NAME"]);
        setUsername(result.data[0]["USERNAME"]);
        setPassword(result.data[0]["PASSWORD"]);
        setBirthday(result.data[0]["BIRTHDAY"]);
        setRole(result.data[0]["ROLE"]);
        setAvatar(result.data[0]["AVATAR"]);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleEdit = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/users/edit",
      data: {
        ID: id,
        USERNAME: username,
        NAME: name,
        PHONE: phone,
        PASSWORD: password,
        BIRTHDAY: birthday,
        AVATAR: avatar,
      },
    })
      .then((res) => {
        navigate("../dashboard/users");
      })
      .catch((res) => {
        console.log("error", res);
      });
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="../dashboard/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={avatar} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{name}</span>
              <span className="userShowUserTitle">{role}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{username}</span>
            </div>
            <div className="userShowInfo">
              <AdminPanelSettingsIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{role}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{birthday}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>ID</label>
                <input
                  type="text"
                  value={id}
                  disabled
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  className="userUpdateInput"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Birthday</label>
                <input
                  type="date"
                  value={birthday}
                  className="userUpdateInput"
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={phone}
                  className="userUpdateInput"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={avatar} alt="" />
              </div>
              <button onClick={handleEdit} className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
