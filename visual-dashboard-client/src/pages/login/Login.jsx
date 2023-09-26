import React, { useState, useEffect } from "react";
import sideblueimg from "../../assets/image/sideblueimg.png";
import githubimg from "../../assets/image/github.png";
import twitterimg from "../../assets/image/twitter.png";
import linkedinimg from "../../assets/image/linkedin.png";
import discordimg from "../../assets/image/discord.png";
import googleimg from "../../assets/image/google.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState("signin");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createUserName, setCreateUserName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const navigation = useNavigate();
  // user login function
  const userLoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      // console.log("logged in");
      setData(res.data);
      setSuccess(true);
      localStorage.setItem("loggedin", "true");
      navigation("/dashboard", { replace: true });
    } catch (err) {
      alert(err.response.data);
      setError(err);
      console.log(err.response.data);
      setSuccess(false);
    }
    setLoading(false);
  };

  const userSignUpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        username: createUserName,
        email: createEmail,
        password: createPassword,
      });
      setData(res.data);
      alert("User created");
      localStorage.setItem("loggedin", "true");
      navigation("/dashboard", { replace: true });
      setSuccess(true);
    } catch (err) {
      alert(err.response.data);
      setError(err);
      setSuccess(false);
      console.log("User not created");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <p style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        Loading...
      </p>
    );
  }

  return (
    <div className="container">
      <div className="sideComponent">
        <div className="logoContainer">
          <img className="sideImage" src={sideblueimg} alt="sideimage" />
          <div className="boardText">Visual-Dashboard.</div>
          <div className="logotext">Logo</div>
          <div className="icons">
            <img src={githubimg} alt="GitHub" className="icon" />
            <img src={discordimg} alt="discord" className="icon" />
            <img src={twitterimg} alt="twitter" className="icon" />
            <img src={linkedinimg} alt="linkedin" className="icon" />
          </div>
        </div>
      </div>
      <div className="userlogincomponents">
        {/* Sign in component */}
        {active === "signin" ? (
          <>
            <h1>Sign in</h1>
            <p>Sign in to your account</p>
            <div className="googlebtncontainer">
              <img src={googleimg} width={15} height={15} alt="Google" />
              <button className="signinwithgoogle">Sign in with gooogle</button>
            </div>
            <br />
            <div className="textinputs">
              <form>
                <label>User Name</label>
                <input
                  type="text"
                  className="username"
                  placeholder="user-name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>Forgot password?</p>
                <button className="signin" onClick={userLoginHandler}>
                  Sign in
                </button>
                <br />
              </form>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "5px",
                }}
              >
                Dont have an account ?
                <p
                  style={{ color: "blue" }}
                  onClick={() => setActive("signup")}
                >
                  {" "}
                  register here
                </p>
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Register component */}
            <h1>Sign up</h1>
            <p>Create an account</p>
            <div className="textinputs">
              <form>
                <label>User Name</label>
                <input
                  type="text"
                  className="username"
                  placeholder="user-name"
                  value={createUserName}
                  onChange={(e) => setCreateUserName(e.target.value)}
                />
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  className="email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  className="password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
                <br />
                <button className="signin" onClick={userSignUpHandler}>
                  Sign Up
                </button>
                <br />
              </form>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "5px",
                }}
              >
                Already have
                <p
                  style={{ color: "blue" }}
                  onClick={() => setActive("signin")}
                >
                  {" "}
                  an account?
                </p>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
