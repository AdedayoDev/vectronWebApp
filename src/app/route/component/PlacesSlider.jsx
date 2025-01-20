import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';

const PlacesSlider = ({ onPlaceSelect }) => {
  const places = [
    { id: 1, name: 'Restaurants', type: 'restaurant' },
    { id: 2, name: 'Grocery stores', type: 'grocery_or_supermarket' },
    { id: 3, name: 'Hospitals', type: 'hospital' },
    { id: 4, name: 'Hotels', type: 'lodging' },
    { id: 5, name: 'Museums', type: 'museum' },
    { id: 6, name: 'Transits', type: 'transit_station' },
    { id: 7, name: 'Pharmacy', type: 'pharmacy' },
    { id: 8, name: 'Gas stations', type: 'gas_station' },
    { id: 9, name: 'Police', type: 'police' }
  ];

  const handlePlaceClick = (placeType) => {
    onPlaceSelect(placeType);
  };

  return (
    <div className="absolute top-20 left-11 z-10 w-[calc(100%-88px)]">
      <Splide
        options={{
          type: 'slide',
          perPage: 5,
          gap: '1rem',
          arrows: true,
          pagination: false,
          drag: true,
          breakpoints: {
            1024: { perPage: 4 },
            768: { perPage: 3 },
            640: { perPage: 2 },
          },
        }}
        className="places-slider"
      >
        {places.map((place) => (
          <SplideSlide key={place.id}>
            <div
              onClick={() => handlePlaceClick(place.type)}
              className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/assets/icons/vechtron.png"
                alt="place-icon"
                width={20}
                height={20}
              />
              <p className="text-sm">{place.name}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default PlacesSlider;