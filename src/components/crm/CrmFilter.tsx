import React, { useContext } from "react";
import { ModalContext } from "../../providers/ModalProvider";
import AppButton from "../layout/AppButton";
import AddAccountForm from "./AddAccountForm";

interface Props {
  setSelected: any;
  filter: any;
}

const CrmFilter: React.FC<Props> = ({setSelected, filter }) => {
  const {show} = useContext(ModalContext);
  const setFilter = (index: number) => {
    let newFilter = {...filter};

    newFilter.list.forEach((u: any) => u.selected = false);
    
    newFilter.list[index].selected = true;
    
    setSelected(newFilter);
  };

  return (
    <div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Show All"
          onClick={() => setFilter(0)}
          outlined={!filter.list[0].selected}
          block
        />
      </div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Owned By Me"
          onClick={() => setFilter(1)}
          outlined={!filter.list[1].selected}
          block
        />
      </div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Unassigned"
          onClick={() => setFilter(2)}
          outlined={!filter.list[2].selected}
          block
        />
      </div>
      <hr/>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="+ Add View"
          onClick={() => show({form: <AddAccountForm />})}
          block
        />
      </div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Schedule Demo"
          onClick={() => null}
          block
          disabled
        />
      </div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Create Agreement"
          onClick={() => null}
          block
          disabled
        />
      </div>
    </div>
  );
};

export default CrmFilter;
