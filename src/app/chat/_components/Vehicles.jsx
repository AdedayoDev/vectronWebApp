import ListComp from "./ListComp";

function Vehicles() {
  return (
    <div className="flex flex-col ">
      <p className="text-[16px] font-bold my-1">Vehicles</p>
      <ListComp src="/assets/icons/tesla.png">Tesla</ListComp>
      <ListComp src="/assets/icons/toyota.png">Toyota Camry 2012</ListComp>
    </div>
  );
}

export default Vehicles;
