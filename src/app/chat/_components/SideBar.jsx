import BarContent from "./BarContent";
import Hamburger from "./Hamburger";

function SideBar() {
  return (
    <>
      <div className="hidden lg:block">
        <BarContent />
      </div>
      {/* Hamburger */}
      <Hamburger />
    </>
  );
}

export default SideBar;
