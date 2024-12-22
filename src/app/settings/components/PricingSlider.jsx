"use client";
import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Image from "next/image";

const plans = [
  {
    id: "free",
    title: "Free",
    price: "0",
    duration: "Free forever",
    description: "Basic chat functionality",
    // popular: "",
    features: [
      "5 chatbots",
      "Up to 1000 messages/mo",
      "Basic analytics",
      "Custom chatbot",
      "No support",
    ],
    buttonText: 'Current plan',
  },
  {
    id: "standard",
    title: "Standard",
    price: "29",
    duration: "Per month, per team member",
    description: "Advanced chat features",
    popular: "Popular",
    features: [
      "10 chatbots",
      "Up to 5000 messages/mo",
      "Basic analytics",
      "Custom chatbot",
      "Email support",
    ],
    buttonText: 'Get started'
  },
  {
    id: "pro",
    title: "Pro",
    price: "49",
    description: "Custom chat solutions",
    // popular: "",
    duration: "Per month, per team member",
    features: [
      "Unlimited chatbots",
      "Unlimited messages",
      "Custom analytics",
      "Priority support",
    ],
    buttonText:'Subscribe'
  },
];

const PricingSlider = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="pricing-slider">
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          focus: "center",
          gap: "1rem",
          pagination: true,
          arrows: false,
          breakpoints: {
            768: {
              perPage: 1,
            },
          },
        }}
        onMove={(splide) => setActiveSlide(splide.index)}
      >
        {plans.map((plan, index) => (
          <SplideSlide key={plan.id}>
            <div
              className={`plan-card border ${activeSlide === index ? "active" : ""}`}
            >
              <div className="flex justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{plan.title}</h3>
                  <p className="text-gray-400 text-sm -mt-2">{plan.duration}</p>
                </div>
                <p className="text-white text-sm bg-blue-700 flex justify-center h-6 w-20 rounded-md items-center">
                  {plan.popular}
                </p>
              </div>
              <div className="price relative">
                <span className="text-xs absolute top-1 text-gray-400">$</span>{" "}
                <span className="font-bold ml-2 text-2xl">{plan.price} </span>
                <span className="text-gray-400 text-base">/mo</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
              <ul className="mt-7">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Image
                      src="/assets/icons/check-circle.png"
                      alt="check icon"
                      width={20}
                      height={20}
                    />
                    <li >{feature}</li>
                  </div>
                ))}
              </ul>
              <button className="text-white mt-4 sm:w-60 w-80 mx-auto bg-blue-800 flex justify-center items-center rounded-full py-2">{plan.buttonText}</button>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default PricingSlider;
