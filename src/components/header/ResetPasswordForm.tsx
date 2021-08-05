import React, { useContext, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { SMT_User } from '../../types';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppDropDown from '../layout/AppDropDown';
import AppTextInput from '../layout/AppTextInput';

const ResetPasswordForm = () => {
    const { id, grpId, displayName, token } = useContext(AppContext);
    const { hide } = useContext(ModalContext);
    const { show } = useContext(ToastContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState('');
    const [userList, setUserList] = useState<SMT_User[]>([]);
    const [validationToggle, setValidationToggle] = useState({ visible: false, valid: false });

    useEffect(() => {
        getUserList();
    }, []);

    const getFormData = async () => {
        const newPassword = {
            email,
            password,
        }
        return newPassword;
    };

    async function postNewPassword() {
        if (checkConfirmPassword()) {
            if (validationToggle.valid) {
                const newPassword = await getFormData();
                
                await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groups`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                    body: JSON.stringify(newPassword),
                })
                .then((res) => res.json())
                .then((data) => {
                    if (isSuccessStatusCode(data.status)) {
                        show({ message: data.message });
                        hide({});
                    } else {
                        show({ message: data.message });
                    }
                })
                .catch((err) => show({ message: err.message }));
            }
        }
    }

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


    const getUserList = async () => {
        await fetch(`${process.env.REACT_APP_TCMC_URI}/api/usersBy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token },
            body: JSON.stringify({ group_id: grpId }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                    setUserList(json.data);
                } else {
                    show({ message: json.message });
                }
            })
            .catch((err) => show({ message: err.message }));
    }

    return (
        <div className="app-form">
            <div className="form-header">
                <div className="form-header-title">
                    <h4>New Password</h4>
                </div>
                <div className="form-header-icon">
                    <MdClose size={24} onClick={() => hide({})} />
                </div>
            </div>

            <div className="form-body">
                <AppDropDown
                    label='User'
                    value={user}
                    onChange={(val: string) => {
                        let userEmail = userList.find(u => u._id === val);
                        setUser(val);
                        if (userEmail) {
                            setEmail(userEmail.email);
                        }
                    }}
                    list={userList.map(u => { return { id: u._id, label: u.first_name + u.last_name, value: u._id } })}
                />
                <AppTextInput label='Email' value={email} onChange={setEmail} disabled />
                <AppTextInput label='Password' value={password} onChange={setPassword} />
                <AppTextInput label='Confirm Password' value={confirmPassword} onChange={setConfirmPassword} />
            </div>

            <div className="form-footer">
                <div className="footer-buttons">
                    <AppButton label="Save" onClick={() => postNewPassword()} />
                    <AppButton
                        size={"sm"}
                        label="Cancel"
                        onClick={() => hide({})}
                        secondary
                        outlined
                    />
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordForm;