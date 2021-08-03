import { useState, useContext } from "react";
import { ToastContext } from "../providers/ToastProvider";
import { SMT_User } from "../types";

// Usage
// function App() {
//   // Similar to useState but first arg is key to the value in local storage.
//   const [name, setName] = useLocalStorage("name", "Bob");
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </div>
//   );
// }

// Hook
const useLocalStorage = (key: string, initialValue: any) => {
    const {show} = useContext(ToastContext);
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      show({ message: error.message});
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      show({ message: error.message});
    }
  };

  const checkIsAuth = () : Boolean => {
    let isAuth: Boolean = false;

    try {
      const smtUser = window.localStorage.getItem('smtUser');
      console.log('smtUser: ', smtUser);
      if (smtUser) {

        
        // fetch(`${process.env.REACT_APP_TCMC_URI}/api/validateToken`, {
        //   method: 'POST',
        //   headers: {'Content-type': 'applicatioin/json', 'x-access-token': smtUser!.token},
        //   body: JSON.stringify({token: smtUser!.token})
        // })
      }
        
    } catch (error) {
      show({ message: error.message});
    }
    return isAuth;
  };

  return [storedValue, setValue, checkIsAuth];
}

export default useLocalStorage;