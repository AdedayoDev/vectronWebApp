"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Image from "next/image";
import Navbar from "@components/navbar/chatNav";
import "./route.css";
import SearchOverlay from "../route/component/SearchOverlay";
import PlacesSlider from "../route/component/PlacesSlider";
import SideBar from "../chat/_components/SideBar";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";

export default function Route() {
  const mapRef = useRef(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [places, setPlaces] = useState([]);
  const [placeService, setPlaceService] = useState(null);

// Update the handleDirectionsSearch function
const handleDirectionsSearch = (from, to) => {
  if (!directionsService || !directionsRenderer) {
    console.error('Directions services not initialized');
    return;
  }

  // Clear existing markers
  if (marker) marker.setMap(null);
  places.forEach(place => place.marker.setMap(null));
  setPlaces([]);

  const request = {
    origin: from,
    destination: to,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true  // Changed from alternatives to provideRouteAlternatives
  };

  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(result);
      
      // Fit map to show the entire route
      if (result.routes && result.routes[0] && result.routes[0].legs) {
        const bounds = new google.maps.LatLngBounds();
        result.routes[0].legs.forEach(leg => {
          bounds.extend(leg.start_location);
          bounds.extend(leg.end_location);
        });
        map.fitBounds(bounds);
      }
    } else {
      console.error('Directions request failed:', status);
      alert('Could not calculate directions. Please check the addresses and try again.');
    }
  });
};

  const handleSearchSubmit = (location) => {
    if (!location || !map) return;
    setSearchLocation(location);

    // Clear existing directions
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const position = results[0].geometry.location;
        map.setCenter(position);
        map.setZoom(15);

        if (marker) {
          marker.setMap(null);
        }

        const newMarker = new google.maps.Marker({
          map: map,
          position: position,
          animation: google.maps.Animation.DROP
        });

        setMarker(newMarker);

        const infoWindow = new google.maps.InfoWindow({
          content: results[0].formatted_address
        });

        newMarker.addListener('click', () => {
          infoWindow.open(map, newMarker);
        });
      }
    });
  };

// Update the searchNearbyPlaces function
const searchNearbyPlaces = (placeType) => {
  if (!map || !placeService) return;

  // Clear existing markers
  places.forEach(place => place.marker.setMap(null));
  setPlaces([]);

  const request = {
    location: map.getCenter(),
    radius: 5000, // 5km radius
    type: placeType
  };

  placeService.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      const newPlaces = results.map(place => {
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
          animation: google.maps.Animation.DROP
        });

        // Add info window with business status instead of permanently_closed
        const infowindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3 class="font-bold">${place.name}</h3>
              <p>${place.vicinity}</p>
              ${place.rating ? `<p>Rating: ${place.rating} ⭐</p>` : ''}
              ${place.business_status ? `<p>Status: ${place.business_status}</p>` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });

        return { 
          ...place,
          marker,
          infowindow
        };
      });

      setPlaces(newPlaces);

      // Adjust map bounds to show all markers
      if (newPlaces.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        newPlaces.forEach(place => {
          if (place.geometry && place.geometry.location) {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      }
    }
  });
};

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        
        if (mapRef.current && !map) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 37.7749, lng: -122.4194 },
            zoom: 12,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
            }
          });

          // Initialize services
          const directionsServiceInstance = new google.maps.DirectionsService();
          const directionsRendererInstance = new google.maps.DirectionsRenderer({
            map: mapInstance,
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#4A90E2",
              strokeWeight: 6
            }
          });

          setMap(mapInstance);
          setDirectionsService(directionsServiceInstance);
          setDirectionsRenderer(directionsRendererInstance);
          setPlaceService(new google.maps.places.PlacesService(mapInstance));
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  return (
    <AuthProvider>
      <ProtectedRoute>
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="mt-11 flex h-[calc(100vh-7rem)]">
        <div className="relative flex-1 overflow-hidden">
          <Image
            src="/assets/images/bg-img2.png"
            alt="Google map"
            width={200}
            height={200}
            className="w-full h-28 mt-2"
          />
          
          <div className="absolute inset-0 pt-20 px-6">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 p-3 bg-white rounded-t-2xl">
                <Image
                  src="/assets/icons/Media.jpeg (1).png"
                  alt="background-image"
                  width={20}
                  height={20}
                />
                <div className="text-md">Vechtron</div>
                <Image
                  src="/assets/icons/map.svg"
                  alt="background-image"
                  width={5}
                  height={5}
                  className="w-2 h-3"
                />
              </div>

              <div className="map-container relative flex-1 rounded-b-2xl overflow-hidden">
                <div 
                  ref={mapRef} 
                  className="absolute inset-0"
                  style={{ width: '100%', height: '100%' }}
                />
                
                <PlacesSlider onPlaceSelect={searchNearbyPlaces} />
                
                <SearchOverlay
                  onSearch={handleSearchSubmit}
                  initialValue={searchLocation}
                  onDirectionsSearch={handleDirectionsSearch}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="side-container overflow-y-auto border-l scrollbar-thin">
          <SideBar />
        </div>
      </div>
    </div>
    </ProtectedRoute>
    </AuthProvider>
  );
}