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
    features: [
      "5 chatbots",
      "Up to 1000 messages/mo",
      "Basic analytics",
      "Custom chatbot",
      "No support",
    ],
    buttonText: "Current plan",
  },
  {
    id: "standard",
    title: "Standard",
    price: "Coming Soon", // Change price to "Coming Soon"
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
    buttonText: "Coming Soon", // Change button text
  },
  {
    id: "pro",
    title: "Pro",
    price: "Coming Soon", // Change price to "Coming Soon"
    description: "Custom chat solutions",
    duration: "Per month, per team member",
    features: [
      "Unlimited chatbots",
      "Unlimited messages",
      "Custom analytics",
      "Priority support",
    ],
    buttonText: "Coming Soon", // Change button text
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
            768: { perPage: 1 },
          },
        }}
        onMove={(splide) => setActiveSlide(splide.index)}
      >
        {plans.map((plan, index) => {
          const isComingSoon = plan.price === "Coming Soon"; // Check if the plan is coming soon

          return (
            <SplideSlide key={plan.id}>
              <div
                className={`plan-card border relative ${
                  isComingSoon ? "blur-sm opacity-60" : "active"
                }`}
              >
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.title}</h3>
                    <p className="text-gray-400 text-sm -mt-2">{plan.duration}</p>
                  </div>
                  {plan.popular && (
                    <p className="text-white text-sm bg-blue-700 flex justify-center h-6 w-20 rounded-md items-center">
                      {plan.popular}
                    </p>
                  )}
                </div>
                <div className="price relative">
                  {isComingSoon ? (
                    <span className="font-bold text-xl text-gray-500">
                      {plan.price}
                    </span>
                  ) : (
                    <>
                      <span className="text-xs absolute top-1 text-gray-400">$</span>
                      <span className="font-bold ml-2 text-2xl">{plan.price}</span>
                      <span className="text-gray-400 text-base">/mo</span>
                    </>
                  )}
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
                      <li>{feature}</li>
                    </div>
                  ))}
                </ul>
                <button
                  className={`mt-4 w-60 lg:w-80 mx-auto flex justify-center items-center rounded-full py-2 ${
                    isComingSoon ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 text-white"
                  }`}
                  disabled={isComingSoon} // Disable button if Coming Soon
                >
                  {plan.buttonText}
                </button>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default PricingSlider;
