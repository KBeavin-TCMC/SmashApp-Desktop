import React, { useContext, useState } from "react";
import logo from "../../content/assets/smt_logo.png";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppButton from "../../components/layout/AppButton";
import AppTextInput from "../../components/layout/AppTextInput";
import { useHistory } from "react-router-dom";
import { ToastContext } from "../../providers/ToastProvider";
import AppToast from "../../components/layout/AppToast";
import { SMT_User } from "../../types";
import useLocalStorage from "../../hooks/useLocalStorage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AuthScreen = () => {
  let history = useHistory();
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
  const [className, setClassName] = useState('d-none');

  const login = async (e: any) => {
    e.preventDefault();
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
          history.push('/dashboard');
        } else {
          setClassName('');
          show({ message: "Login Failed." });
        }
      })
      .catch((err) => {
        show({ message: "Error: " + err.message });
      });
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
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
        show({ message: "An Email has been sent to your account." })
      })
      .catch((err) => {
        show({ message: "Error: " + err.message });
      });
  };

  return (
    <main className="container">
      <section className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className='card-body p-0'>
              <div className='row'>

                <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>

                <div className='col-lg-6'>
                  <div className='p-5'>

                    {!toggleForm ? (
                      <>
                        <div className='text-center'>
                          <h1 className='h4 text-gray-900 mb-4'>Smash App</h1>
                        </div>
                        <Form onSubmit={login}>
                          <Form.Group
                            controlId="email"
                            className="form-group"
                          >
                            <Form.Control
                              className="form-control form-control-user"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              autoFocus
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group
                            controlId="password"
                            className="form-group"
                          >
                            <Form.Control
                              className="form-control form-control-user"
                              placeholder="Password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>

                          <div className='row'>
                            <div className='col'>
                              <Button
                                className="btn btn-primary btn-user btn-block"
                                // block
                                size="lg"
                                type="submit"
                              // disabled={!validateForm()}
                              >
                                Login
                              </Button>
                            </div>
                              <div className='col'>
                              <a className='login' onClick={() => setToggleForm(!toggleForm)}>forgot password?</a>
                              </div>
                          </div>
                        </Form>
                      </>
                      // <>
                      //   <div className='text-center'>
                      //     <h1 className='h4 text-gray-900 mb-4'>Smash App</h1>
                      //   </div>
                      //   <AppTextInput label="Email" value={email} onChange={setEmail} />
                      //   <AppTextInput
                      //     label="Password"
                      //     value={password}
                      //     onChange={setPassword}
                      //     type='password'
                      //   />
                      //   <AppButton label="Submit" onClick={login} />
                      //   <a className='login' onClick={() => setToggleForm(!toggleForm)}>forgot password?</a>
                      // </>
                    ) : (
                      <>
                      <div className='text-center'>
                        <h1 className='h4 text-gray-900 mb-4'>Smash App</h1>
                      </div>
                      <Form onSubmit={handleForgotPassword}>
                        <Form.Group
                          controlId="email"
                          className="form-group"
                        >
                          <Form.Control
                            className="form-control form-control-user"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>

                        <div className='row'>
                          <div className='col'>
                            <Button
                              className="btn btn-primary btn-user btn-block"
                              // block
                              size="lg"
                              type="submit"
                            // disabled={!validateForm()}
                            >
                              Submit
                            </Button>
                          </div>
                            <div className='col'>
                            <a className='login' onClick={() => setToggleForm(!toggleForm)}>log in?</a>
                            </div>
                        </div>
                      </Form>
                    </>
                      // <>
                      //   <AppTextInput label="Email" value={email} onChange={setEmail} />
                      //   <AppButton label="Submit" onClick={handleForgotPassword} />
                      //   <a className='login' onClick={() => setToggleForm(!toggleForm)}>log in?</a>
                      // </>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <div className='row justify-content-center'>
          <AppToast />
        </div>
    </main>
  );
};

export default AuthScreen;