import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Dropdown,
  DropdownButton,
  FormControl,
  Row,
} from "react-bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import AppContext from "../../providers/AppContext";
import { ToastContext } from "../../providers/ToastProvider";
import { Group } from "../../types";
import { isSuccessStatusCode } from "../../utils/Helpers";
import { useHistory } from "react-router-dom";

const RightHeader = () => {
  const { grpArr, setGrpId, grpId, role, token, displayName } =
    useContext(AppContext);
  let history = useHistory();
  const { show } = useContext(ToastContext);
  const [grpName, setGrpName] = useState("");
  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      getGroupsList();
    } else {
      getGroupName();
    }
  }, []);

  const getGroupName = async () => {
    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
      method: "POST",
      body: JSON.stringify({ _id: grpId }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("grpname: ", json);

        if (isSuccessStatusCode(json.status)) {
          setGrpName(json.data[0].name);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  };

  const getGroupsList = async () => {
    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setGrpName(
            json.data.filter((group: Group) => group._id === grpId)[0].name
          );
          setGroupsList(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  };

  return (
    <Row>
      <Col>
        <Row>
        <Col xs={12} sm={4} className="header-columns">
            <Dropdown className="header-dropdown">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Create New
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxHeight: "50vh", overflow: "scroll" }}>
                <Dropdown.Item onClick={() => history.push("/jobs/create")}>
                  New Job
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => history.push("/agreements/create")}
                >
                  New Agreement
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/quotes/create")}>
                  New Quote
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/accounts/create")}>
                  New Account
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/leads/create")}>
                  New Lead
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/invoices/create")}>
                  New Invoice
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} sm={4} className="header-columns">
            {role !== "admin" ? (
              <DropdownButton
                variant="secondary"
                className="header-dropdown"
                title={grpName}
              ><div></div></DropdownButton>
            ) : (
              <Dropdown className="header-dropdown">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {grpName}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ maxHeight: "50vh", overflow: "scroll" }}
                >
                  {groupsList.map((u) => {
                    return (
                      <Dropdown.Item
                        key={u._id}
                        onClick={() => {
                          setGrpId(u._id);
                          setGrpName(u.name);
                        }}
                      >
                        {u.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Col>

          <Col xs={12} sm={4} className="header-columns">
            <div
              className="header-settings"
              onClick={() => history.push("/settings")}
            >
              <IoPersonCircleOutline className="header-settings-icon"/>
              <span className="header-settings-span">
                {displayName}
              </span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RightHeader;
