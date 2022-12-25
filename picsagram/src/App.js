import React, { useState, useEffect } from "react";
import Post from "./components/posts/posts";
import "./App.css";
import { db, auth } from "./firebase/FirebaseInit";
import { makeStyles } from "@mui/material/styles";
import Modal from "@mui/material/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(() => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "rgba(255,255,255,1)",
    boxShadow: 24,
    padding: "30px 60px",
    borderRadius: "12px",
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const Signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setOpenSignup(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const Login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenLogin(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="app">
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Picsagram_logo"
            ></img>
          </center>
          <form className="pg_signup">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signup_form_btn" type="submit" onClick={Signup}>
              Signup
            </button>
          </form>
          <center className="authFooter">
            <small>
              &copy; 2022 Picsagram Tribute by {""}
              <a href="mailto:kankariya.619@gmail.com">Blessings Arihantk</a>
            </small>
          </center>
        </div>
      </Modal>
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Picsagram_logo"
            ></img>
          </center>
          <form className="pg_signup">
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signup_form_btn" type="submit" onClick={Login}>
              Login
            </button>
          </form>
          <center className="authFooter">
            <small>
              &copy; 2022 Picsagram Tribute by {""}
              <a href="mailto:kankariya.619@gmail.com">Blessings Arihantk</a>
            </small>
          </center>
        </div>
      </Modal>
      <div className="header">
        <div className="header_wrapper">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Picsagram_logo"
          ></img>
          {user ? (
            <button className="logout_btn" onClick={() => auth.signOut()}>
              Logout
            </button>
          ) : (
            <div className="header_btns">
              <button
                className="login_btn"
                onClick={() => setOpenLogin(true) || setOpenSignup(false)}
              >
                Login
              </button>
              <button
                className="signup_btn"
                onClick={() => setOpenSignup(true) || setOpenLogin(false)}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="timeline">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
