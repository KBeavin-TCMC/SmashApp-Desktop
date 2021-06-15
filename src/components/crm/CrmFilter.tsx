import React from "react";
import AppButton from "../layout/AppButton";

interface Props {
  setSelected: any;
  filter: any;
}

const CrmFilter: React.FC<Props> = ({setSelected, filter }) => {

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
          onClick={() => null}
          block
        />
      </div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Schedule Demo"
          onClick={() => null}
          block
        />
      </div>
      <div className="d-flex justify-content-center filter-btn">
        <AppButton
          label="Create Agreement"
          onClick={() => null}
          block
        />
      </div>
    </div>
  );
};

export default CrmFilter;
