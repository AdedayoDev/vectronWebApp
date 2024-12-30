import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';

const PlacesSlider = () => {
  return (
    <div className="absolute top-52 left-11 z-10">
      <Splide
        options={{
          type: 'slide',
          perPage: 5,
          gap: '1rem',
          arrows: true,
          pagination: false,
          drag: true,
          breakpoints: {
            768: { perPage: 4 },
            480: { perPage: 4 },
          },
        }}
        className="places"
      >
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Restaurants</p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Grocery stores</p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Hospitals</p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Hotels</p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Museums</p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Transits</p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="place flex items-center gap-2 cursor-pointer bg-white p-2 rounded-md">
            <Image
              src="/assets/icons/vechtron.png"
              alt="background-image"
              width={20}
              height={20}
            />
            <p>Pharmacy</p>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default PlacesSlider;
