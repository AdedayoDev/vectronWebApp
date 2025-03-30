// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../../lib/protectedapi";

// export default function VehicleProfileList({ vehicleList = [] }) {
//   const [vehicles, setVehicles] = useState(vehicleList || []);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(vehicleList.length === 0);
//   const router = useRouter();

//   useEffect(() => {
//     // If vehicles are already provided via props, don't fetch again
//     if (vehicleList.length > 0) {
//       setVehicles(vehicleList);
//       setLoading(false);
//       return;
//     }
    
//     const fetchVehicles = async () => {
//       try {
//         const response = await api.get("/vehicle/api/v1/vehicles", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (Array.isArray(response.data.vehicles) && response.data.vehicles.length > 0) {
//           setVehicles(response.data.vehicles);
//         } else {
//           setVehicles([]);
//         }
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//         setError("Unable to fetch vehicles. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicles();
//   }, [vehicleList]);

//   const goToVehicleProfile = (vehicle_id) => {
//     router.push(`/vehicle_management/vehicle_profile?id=${vehicle_id}`);
//   };

//   if (loading) {
//     return <div className="w-full text-center py-8">Loading vehicle profiles...</div>;
//   }

//   return (
//     <div className="p-6">
//     <div className="w-full">
//       <div className="w-full bg-white rounded-sm shadow p-6">
//         <div className="flex justify-between items-center mb-7">
//           <h1 className="text-xl font-normal">Your Vehicle Profiles</h1>
//           <div 
//             onClick={() => router.push('/vehicleprofile')} 
//             className="cursor-pointer flex items-center gap-2 text-purple-500"
//           >
//             <Image
//               src="/assets/icons/add-circle.svg"
//               alt="add"
//               width={20}
//               height={20}
//             />
//             <p>Add vehicle</p>
//           </div>
//         </div>
        
//         <div className="w-full">
//           <div className="space-y-4">
//             {Array.isArray(vehicles) && vehicles.length > 0 ? (
//               vehicles.map((vehicle) => (
//                 <div
//                   key={vehicle.id}
//                   className="border-solid border-gray-200 border-b-2 flex justify-between items-center hover:bg-gray-50 p-2 pb-2"
//                 >
//                   <div className="flex gap-3 items-start lg:items-center">
//                     <Image
//                       src="/assets/icons/black_car.png"
//                       alt={vehicle.make || 'Vehicle'}
//                       width={90}
//                       height={90}
//                       className="w-[50px] lg:w-[90px]"
//                     />
//                     <div>
//                       <p className="text-lg font-semibold">
//                         {vehicle.name || 'Unknown'}
//                       </p>
//                       <p className="text-base text-purple-600">
//                         {vehicle.make || 'Unknown'}
//                       </p>
//                       <p className="text-base">
//                         {vehicle.milleage || 'Unknown'}
//                       </p>
//                       <p className="text-base">
//                         Plate: {vehicle.license_plate || vehicle.plateNumber || 'Unknown'}
//                       </p>
//                       <p className="text-base">
//                         VIN: {vehicle.vin || 'Unknown'}
//                       </p>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={() => goToVehicleProfile(vehicle.id)} 
//                     className="cursor-pointer text-white bg-blue-700 rounded-full px-7 py-2 lg:w-[150px] text-semibold"
//                   >
//                     View
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-lg text-gray-600 mb-4">
//                   No vehicles available at the moment.
//                 </p>
//                 <button 
//                   onClick={() => router.push('/vehicleprofile')}
//                   className="cursor-pointer text-white bg-blue-700 rounded-full px-7 py-2 text-semibold"
//                 >
//                   Add Your First Vehicle
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/protectedapi";
import VehicleProfile from "../[vehicle_profile]/page"; // Import the VehicleProfile component

export default function VehicleProfileList({ vehicleList = [] }) {
  const [vehicles, setVehicles] = useState(vehicleList || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(vehicleList.length === 0);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // If vehicles are already provided via props, don't fetch again
    if (vehicleList.length > 0) {
      setVehicles(vehicleList);
      setLoading(false);
      return;
    }
    
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/vehicle/api/v1/vehicles", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (Array.isArray(response.data.vehicles) && response.data.vehicles.length > 0) {
          setVehicles(response.data.vehicles);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Unable to fetch vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [vehicleList]);

  const goToVehicleProfile = (vehicle_id) => {
    setSelectedVehicleId(vehicle_id);
  };

  const handleBackToList = () => {
    setSelectedVehicleId(null);
  };

  const handleDeleteVehicle = (deletedVehicleId) => {
    // Remove the deleted vehicle from the list
    setVehicles(vehicles.filter(vehicle => vehicle.id !== deletedVehicleId));
  };

  if (loading) {
    return <div className="w-full text-center py-8">Loading vehicle profiles...</div>;
  }

  // If a vehicle is selected, show its profile
  if (selectedVehicleId) {
    return (
      <VehicleProfile 
        vehicleId={selectedVehicleId} 
        onBack={handleBackToList}
        onDelete={handleDeleteVehicle}
      />
    );
  }

  // Otherwise, show the list of vehicles
  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-sm shadow p-6">
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-xl font-normal">Your Vehicle Profiles</h1>
          <div 
            onClick={() => router.push('/vehicleprofile')} 
            className="cursor-pointer flex items-center gap-2 text-purple-500"
          >
            <Image
              src="/assets/icons/add-circle.svg"
              alt="add"
              width={20}
              height={20}
            />
            <p>Add vehicle</p>
          </div>
        </div>
        
        <div className="w-full">
          <div className="space-y-4">
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="border-solid border-gray-200 border-b-2 flex justify-between items-center hover:bg-gray-50 p-2 pb-2"
                >
                  <div className="flex gap-3 items-start lg:items-center">
                    <Image
                      src="/assets/icons/black_car.png"
                      alt={vehicle.make || 'Vehicle'}
                      width={90}
                      height={90}
                      className="w-[50px] lg:w-[90px]"
                    />
                    <div>
                      <p className="text-lg font-semibold">
                        {vehicle.name || 'Unknown'}
                      </p>
                      <p className="text-base text-purple-600">
                        {vehicle.make || 'Unknown'}
                      </p>
                      <p className="text-base">
                        {vehicle.milleage || 'Unknown'}
                      </p>
                      <p className="text-base">
                        Plate: {vehicle.license_plate || vehicle.plateNumber || 'Unknown'}
                      </p>
                      <p className="text-base">
                        VIN: {vehicle.vin || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => goToVehicleProfile(vehicle.id)} 
                    className="cursor-pointer text-white bg-blue-700 rounded-full px-7 py-2 lg:w-[150px] text-semibold"
                  >
                    View
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600 mb-4">
                  No vehicles available at the moment.
                </p>
                <button 
                  onClick={() => router.push('/vehicleprofile')}
                  className="cursor-pointer text-white bg-blue-700 rounded-full px-7 py-2 text-semibold"
                >
                  Add Your First Vehicle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}