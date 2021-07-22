import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";

interface Props {
  state: any;
}

const AppBtnGrp: React.FC<Props> = ({ state }) => {
  const [btnArr, setBtnArr] = useState<string[]>([]);
  const [btnMap, setBtnMap] = useState<any>(btnArr);

  useEffect(() => {
    setBtnArr(Object.keys(state.btnObj));
  }, []);

  const updateBtn = (u: string) => {
    state.setBtnObj({ ...state.btnObj, ...{ [u]: !state.btnObj[u] } });
  };

  return (
    <>
      {state.btnObj && (
        <div className="appBtnGrp-container">
          {btnArr.map((u, i) => {
            let first = i === 0 ? true : false;
            let last = i === btnArr.length - 1 ? true : false;
            return (
              <div
                onClick={() => {
                  // setBtnMap({...btnMap, ...{[u]: !btnMap[u]}});
                  updateBtn(u);
                }}
                className="appBtnGrp-button"
                style={{
                  backgroundColor: state.btnObj[u]
                    ? Colors.SMT_Secondary_2_Light_1
                    : "transparent",
                }}
                key={u}
              >
                <p
                  className="appBtnGrp-btnText"
                  style={{
                    color: state.btnObj[u] ? Colors.SMT_Tertiary_1 : "black",
                  }}
                >
                  {u}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AppBtnGrp;
