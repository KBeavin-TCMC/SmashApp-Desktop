import React, { useContext, useState } from "react";
import logo from "../../content/assets/smt_logo.png";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppButton from "../../components/layout/AppButton";
import AppTextInput from "../../components/layout/AppTextInput";
import { Link } from "react-router-dom";
import { ToastContext } from "../../providers/ToastProvider";
import AppToast from "../../components/layout/AppToast";
import { SMT_User } from "../../types";
import useLocalStorage from "../../hooks/useLocalStorage";

const AuthScreen = () => {
  const { show } = useContext(ToastContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [smtUser, setSmtUser] = useLocalStorage('smtUser', {});
  const {
    setId,
    setIsAuth,
    setToken,
    setGrpId,
    setDisplayName,
    setGrpArr,
    setRole,
    setImage,
  } = useContext(AppContext);
  const [toggleForm, setToggleForm] = useState(false);

  const login = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          let user: SMT_User = json.data;
          setSmtUser(user);
          setToken(json.data.token);
          setGrpArr(json.data.group_id);
          setGrpId(json.data.group_id[0]);
          setId(json.data._id);
          setDisplayName(json.data.first_name + " " + json.data.last_name);
          setRole(json.data.role[0]);
          setImage(json.data.image);
          setIsAuth(true);
        } else {
          show({ message: "Login Failed." });
        }
      })
      .catch((err) => {
        show({ message: "Error: " + err.message });
      });
  };

  const handleForgotPassword = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/forgot`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 500) {
          show({ message: json.message });
        } 
        show({ message: "An Email has been sent to your account."})
      })
      .catch((err) => {
        show({ message: "Error: " + err.message });
      });  };

  return (
    <main className="app-auth-container">
      <section className="auth-image-container">
        <img className="auth-image" alt={"Logo"} src={logo} />
      </section>

      <section className="auth-form-container">
        <div className="auth-form">
          <div className='auth-toast-container'>
            <AppToast />
          </div>
          {!toggleForm ? (
            <>
              <AppTextInput label="Log In" value={email} onChange={setEmail} />
              <AppTextInput
                label="Password"
                value={password}
                onChange={setPassword}
                type='password'
              />
              <Link to="/dashboard">
                <AppButton label="Log In!" onClick={login} />
              </Link>
              <a className='login' onClick={() => setToggleForm(!toggleForm)}>forgot password?</a>
            </>
          ) : (
            <>
              <AppTextInput label="Email" value={email} onChange={setEmail} />
              <AppButton label="Submit" onClick={handleForgotPassword} />
              <a className='login' onClick={() => setToggleForm(!toggleForm)}>log in?</a>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AuthScreen;