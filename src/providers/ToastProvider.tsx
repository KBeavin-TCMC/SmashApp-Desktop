import React, {useState, createContext, useCallback, ReactNode, useRef, useEffect} from 'react';

const initialToast = {
  message: '',
  type: null,
  visible: false,
};

interface Props {
    children: ReactNode;
}

export const ToastContext = createContext({show: (a = {}) => {} , toast: initialToast, hide: (b = {}) => {}});

const ToastProvider: React.FC<Props> = ({children}) => {
  const [toast, setToast] = useState(initialToast);
  const timeout = useRef<any>({});

  const show = useCallback((args) => {
    setToast({...initialToast, visible: true, ...args});
  }, []);

  const hide = useCallback(() => {
    setToast({...toast, visible: false});
    setTimeout(() => setToast({...toast, message: '', visible: false}), 200);
  }, [toast]);

  useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, 2300);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}>
          {children}
      </ToastContext.Provider>
  );
}

export default ToastProvider;
