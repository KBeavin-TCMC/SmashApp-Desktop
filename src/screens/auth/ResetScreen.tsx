import React, { useContext, useState } from 'react';
import AppToast from '../../components/layout/AppToast';
import { ToastContext } from '../../providers/ToastProvider';
import { Link, useParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ResetScreen = () => {
    const { show } = useContext(ToastContext);
    let params: { id: string } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        if (checkConfirmPassword()) {
            fetch(`${process.env.REACT_APP_TCMC_URI}/api/reset`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ resetId: params.id, email, password }),
            })
                .then((res) => res.json())
                .then((json) => {
                    show({ message: json.message });
                })
                .catch((err) => {
                    show({ message: "Error: " + err.message });
                });
        }
    };

    const checkConfirmPassword = (): Boolean => {
        let match = false;

        if (password !== confirmPassword) {
            show({ message: "Passwords do not match." });
        } else {
            match = true;
        }

        return match;
    }

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
  
                          <div className='text-center'>
                            <h1 className='h4 text-gray-900 mb-4'>Smash App</h1>
                          </div>
                          <Form onSubmit={handleResetPassword}>
                            <Form.Group
                              controlId="email"
                              className="mb-3"
                            >
                              <Form.Control
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
                              className="mb-3"
                            >
                              <Form.Control
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group
                              controlId="confirm-password"
                              className="mb-3"
                            >
                              <Form.Control
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                            </Form.Group>
  
                            <div className='row'>
                              <div className='col'>
                                <Button
                                  className="btn btn-primary w-100"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </div>
                            <Link className="col login" to="/" style={{ textDecoration: 'none', color: "black" }}>
                                    log in?
                            </Link>
                            </div>
                          </Form>
  
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
    )
};

export default ResetScreen;