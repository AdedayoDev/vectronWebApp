import React from "react";
import "./chatdetail.css";
import Navbar from "@components/navbar/chatNav";
import SideChat from "@components/chatComp/side-chat";
import Image from "next/image";

export default function Chatdetail() {
  return (
    <>
      <div className="chatdetail-container">
        <Navbar />
        <div className="chatdetail-content">
          <div className="chatdetail-bg">
            <Image
              src="/assets/images/bg-img.png"
              alt="Background image"
              width={200}
              height={200}
              className="chatdetail-bg"
            />
            <div className="chatdetail-detail">
              <div className="detail-content">
                <div className="detail-user">
                  <Image
                    src="/assets/icons/avatar-2.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="avatar-bg"
                  />
                  <div className="detail-user-text">
                    <h4>Peter</h4>
                    <p>Can you help me troubleshoot my car?</p>
                  </div>
                </div>

                <div className="detail-system">
                  <Image
                    src="/assets/icons/ai-icon.png"
                    alt="Avatar"
                    width={30}
                    height={30}
                    className="system-icon"
                  />
                  <div className="detail-user-text">
                    <h4>Vechtron</h4>
                    <p>
                      I would be happy to help you troubleshoot your car, but I
                      will need more specific information about what issues you
                      are experiencing. This will help me provide more targeted
                      and useful advice.
                    </p>
                  </div>
                </div>
                <div className="detail-system">
                  <Image
                    src="/assets/icons/ai-icon.png"
                    alt="Avatar"
                    width={30}
                    height={30}
                    className="system-icon"
                  />
                  <div className="detail-user-text">
                    <h4>Vechtron</h4>
                    <p>
                      I would be happy to help you troubleshoot your car, but I
                      will need more specific information about what issues you
                      are experiencing. This will help me provide more targeted
                      and useful advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideChat />
      </div>
    </>
  );
}
