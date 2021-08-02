import Colors from "../../constants/Colors";
import "../../content/styles/App.css";
import CenterHeader from "./CenterHeader";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const AppHeader = () => {

  return (
    <header>
        <div className='app-header'>
          <LeftHeader />
          <CenterHeader />
          <RightHeader />
        </div>
    </header>
  );
};

export default AppHeader;
