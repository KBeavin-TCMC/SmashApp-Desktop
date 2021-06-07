import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import logo from "../../content/assets/smt_logo.png";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppButton from "../../components/layout/AppButton";
import AppTextInput from "../../components/layout/AppTextInput";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("kyle.beavin@tcmcllc.com");
  const [password, setPassword] = useState("password123");
  const {setId, setIsAuth, setToken, setGrpId, setDisplayName, setGrpArr, setRole, setImage} = useContext(AppContext);


  const login = async () => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setToken(json.data.token);
          setGrpArr(json.data.group_id);
          setGrpId(json.data.group_id[0]);
          setId(json.data._id);
          setDisplayName(json.data.first_name + ' ' + json.data.last_name);
          setRole(json.data.role[0]);
          setImage(json.data.image);
          setIsAuth(true);
        } else {
        //   show({message: 'Login Failed.'});
        }
      })
      .catch((err) => {
        //   show({message: 'Error: ' + err.message})
        });
  };

  return (
    <main
      className="row"
      style={{
        height: "100vh",
        backgroundColor: Colors.SMT_Secondary_1_Light_1,
      }}
    >
      <section className="col-6" style={{ marginTop: "5vh" }}>
        <img alt={"Logo"} src={logo} />
      </section>
      <section className="col-2" style={{ margin: "auto" }}>
        <h1 style={{ marginBottom: "1vh" }}>Log In</h1>
        <AppTextInput value={email} onChange={setEmail} />
        <AppTextInput value={password} onChange={setPassword} password />
        <Link to='/dashboard'>
          <AppButton label="Log In!" onClick={login} />
        </Link>
      </section>
    </main>
  );
};

export default AuthScreen;
