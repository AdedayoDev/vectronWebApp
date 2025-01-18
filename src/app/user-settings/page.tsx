"use client";

import React, { useState } from "react";
import Sidebar from "@components/UserSetting/Sidebar/Sidebar";

// import Profile from "@components/UserSetting/Profile/Profile";
import VehicleProfile from "@components/UserSetting/VehicleManagement/VehicleProfile";
import VehicleManagement from "@components/UserSetting/VehicleManagement/VehicleManagement";
import History from "@components/UserSetting/History/History";

const Page = () => {
  const [selectComponent, setSelectComponent] = useState<string>("Profile");

  const componentsMap: { [key: string]: React.ReactNode } = {
    VehicleManagement: <VehicleManagement />,
    VehicleProfile: <VehicleProfile />,
    History: <History />,
  };

  return (
    <main className="">
      <div  className="w-11/12 mx-auto flex ">
      <div>
        {/* Side Bar */}
        <Sidebar onSelect={setSelectComponent} />

        {/* Main Content Area */}
        <div>{componentsMap[selectComponent]}</div>
      </div>
      </div>
    </main>
  );
};

export default Page;
