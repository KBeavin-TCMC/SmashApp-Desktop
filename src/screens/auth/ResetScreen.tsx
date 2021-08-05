import React, { useContext, useState } from 'react';
import logo from "../../content/assets/smt_logo.png";
import AppButton from '../../components/layout/AppButton';
import AppTextInput from '../../components/layout/AppTextInput';
import AppToast from '../../components/layout/AppToast';
import { ToastContext } from '../../providers/ToastProvider';
import { Link, useParams } from 'react-router-dom';
import { isSuccessStatusCode } from '../../utils/Helpers';

const ResetScreen = () => {
    const { show } = useContext(ToastContext);
    let params: { id: string } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationToggle, setValidationToggle] = useState({ visible: false, valid: false });

    const handleResetPassword = async () => {
        if (checkConfirmPassword()) {
            if (validationToggle.valid) {
                fetch(`${process.env.REACT_APP_TCMC_URI}/api/reset`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ resetId: params.id, email, password }),
                })
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json);
                        show({ message: json.message });
                    })
                    .catch((err) => {
                        show({ message: "Error: " + err.message });
                    });
            }
        }
    };

    const checkConfirmPassword = (): Boolean => {
        let match = false;

        if (password !== confirmPassword) {
            setValidationToggle({ visible: true, valid: false });
            show({ message: "Passwords do not match." });
        } else {
            setValidationToggle({ visible: false, valid: true });
            match = true;
        }

        return match;
    }

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
                    <AppTextInput label="Email" value={email} onChange={setEmail} />
                    <AppTextInput
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        type='password'
                    />
                    <AppTextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        type='password'
                    />

                    <AppButton label="Submit" onClick={handleResetPassword} />
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <a className='login'>log in?</a>
                    </Link>
                </div>
            </section>
        </main>
    )
};

export default ResetScreen;