import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import logo from "../../content/assets/smt_logo.png";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppButton from "../../components/layout/AppButton";
import AppTextInput from "../../components/layout/AppTextInput";
import { Link } from "react-router-dom";
import { ToastContext } from "../../providers/ToastProvider";
import AppToast from "../../components/layout/AppToast";

const AuthScreen = () => {
  const { show } = useContext(ToastContext);
  const [email, setEmail] = useState("kyle.beavin@tcmcllc.com");
  const [password, setPassword] = useState("password123");
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

  const login = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
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

          <AppTextInput label="Log In" value={email} onChange={setEmail} />
          <AppTextInput
            label="Password"
            value={password}
            onChange={setPassword}
            password
          />
          <Link to="/dashboard">
            <AppButton label="Log In!" onClick={login} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AuthScreen;
