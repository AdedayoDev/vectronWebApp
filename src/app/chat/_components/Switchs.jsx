import Switch from "./Switch";

function Switchs() {
  return (
    <div className="flex flex-col">
      <strong>Explore</strong>
      <Switch>Maintenance Recommendations</Switch>
      <Switch>Troubleshooting & Diagnostics</Switch>
      <Switch>Vehicle Profile Management</Switch>
    </div>
  );
}

export default Switchs;
