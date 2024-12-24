"use client";

import React, { useState } from "react";

export default function Faq() {
  const Faq = [
    {
      question: "What is Vechtron",
      answer:
        "Synapse is a messaging platform that uses artificial intelligence to communicate with users. It can understand natural language and provide helpful responses to your questions and requests.",
    },
    {
      question: "How does Vechtron work?",
      answer: "hhhhh",
    },
    {
      question: "What kind of questions can I ask Vechtron?",
      answer:
        "You can ask vechtron anything you would ask a human assistant, such as vehicle types, news in auto mobile industry, questions about your car, and more.",
    },
    {
      question: "Is my data safe with Vechtron?",
      answer:
        "You can ask vechtron anything you would ask a human assistant, such as vehicle types, news in auto mobile industry, questions about your car, and more.",
    },
    {
      question: "Can I customize Vechtron's responses?",
      answer:
        "You can ask vechtron anything you would ask a human assistant, such as vehicle types, news in auto mobile industry, questions about your car, and more.",
    },
    {
      question: "Is Vechtron available in multiple languages?",
      answer:
        "You can ask vechtron anything you would ask a human assistant, such as vehicle types, news in auto mobile industry, questions about your car, and more.",
    },
    {
      question: "Can I use Vechtron for business purposes?",
      answer:
        "You can ask vechtron anything you would ask a human assistant, such as vehicle types, news in auto mobile industry, questions about your car, and more.",
    },
  ];
  const [toggleFaq, settoggleFaq] = useState("");

  const handleToggleFaq = (index) => {
    settoggleFaq(toggleFaq === index ? null : index);
  };
  return (
    <div>
      <div className="faq-container mt-16 ">
        <div className="font-bold lg:text-5xl sm:text-2xl mb-7 text-center">Frequently asked questions</div>

        <div>
          {Faq.map((faq, index) => (
            <div key={index} className="md:w-1/2 mx-auto border px-5 py-7 mb-10">
              <div
                onClick={() => handleToggleFaq(index)}
                className="cursor-pointer font-semibold mb-2"
              >
                {faq.question}
              </div>
              {toggleFaq === index && <div className="text-gray-400 text-base">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
