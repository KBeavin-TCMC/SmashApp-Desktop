import { useContext } from "react";
import { useSpring, animated } from "react-spring";

import { ToastContext } from "../../providers/ToastProvider";

export const Toast = () => {
  const { toast } = useContext(ToastContext);
  const props = useSpring({ opacity: toast.visible ? 1 : 0 });

  return (
    <animated.div style={props} className="toaster">
      <div>{toast.message}</div>
    </animated.div>
  );
};

export default Toast;
