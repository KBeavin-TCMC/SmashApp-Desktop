import React, {useState, createContext, useCallback, ReactNode, useRef, useEffect} from 'react';

const initialModal = {
  form: React.Component,
  type: null,
  visible: false,
};

interface Props {
    children: ReactNode;
}

export const ModalContext = createContext({show: ({}) => {}, modal: initialModal, hide: ({}) => {}});

const ModalProvider: React.FC<Props> = ({children}) => {
    const [modal, setModal] = useState(initialModal);
  
    const show = useCallback((args) => {
      setModal({...initialModal, visible: true, ...args});
    }, []);
  
    const hide = useCallback(() => {
      setModal({...modal, visible: false});
    }, [modal]);
  
    return (
      <ModalContext.Provider
        value={{
          hide,
          show,
          modal,
        }}>
            {children}
        </ModalContext.Provider>
    );
  }
  
  export default ModalProvider;