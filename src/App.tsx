import React, { useState } from 'react';
import AppHeader from './components/header/AppHeader';
import './content/styles/App.css'

import AuthScreen from './components/AuthScreen';
import AppContext from './providers/AppContext';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [grpId, setGrpId] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState('');
  const [grpArr, setGrpArr] = useState([]);

  const userSettings = {
    isAuth,
    token,
    grpId,
    id,
    displayName,
    grpArr,
    role,
    image,
    setDisplayName,
    setToken,
    setGrpId,
    setIsAuth,
    setId,
    setGrpArr,
    setRole,
    setImage,
  };

  return (
    <div>
      <AppContext.Provider value={userSettings}>
      <AppHeader />
      {!isAuth ? <AuthScreen/> : <div></div>}
      </AppContext.Provider>
    </div>
  );
}

export default App;
