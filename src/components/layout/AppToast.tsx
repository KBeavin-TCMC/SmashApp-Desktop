import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

import { ToastContext } from "../../providers/ToastProvider";
import logo from '../../content/assets/smash-animation-muchslower.gif';

export const Toast = () => {
  const { toast } = useContext(ToastContext);
  const props = useSpring({ opacity: toast.visible ? 1 : 0 });
  const props2 = useSpring({ opacity: toast.loading ? 1 : 0 });
  return (
    <div className="row">
      <animated.div style={props2} className="col">
        {/* <Spinner animation="border" /> */}
        <img
          style={{position: 'fixed', bottom: 0, left: 0, height: '5.35rem', width: '10.7rem'}}
          src={logo}
          alt="loading..."
        />
      </animated.div>
      <animated.div style={props} className="col app-toast">
        <div>{toast.message}</div>
      </animated.div>
    </div>
  );
};

export default Toast;
