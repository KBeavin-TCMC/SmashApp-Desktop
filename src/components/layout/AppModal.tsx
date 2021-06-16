import React, { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { ModalContext } from "../../providers/ModalProvider";

const AppModal = () => {
  const { modal, hide } = useContext(ModalContext);
  const overlayProps = useSpring({ opacity: modal.visible ? 0.5 : 0 });
  const formProps = useSpring({ right: modal.visible ? 0 : -400 });
  return (
    <div className="app-modal">
      {modal.visible && (
        <>
          <animated.div
            style={overlayProps}
            className="modal-overlay"
            onClick={() => hide({})}
          ></animated.div>

          <animated.div style={formProps} className="modal-form">
            {modal.form}
          </animated.div>
        </>
      )}
    </div>
  );
};

export default AppModal;
