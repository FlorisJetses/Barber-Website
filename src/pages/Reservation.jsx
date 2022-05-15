import React from "react";
import { Footer } from "../components/Footer";
import { Steps } from "./reservation/Steps";
import { NavBar } from "../components/NavBar.jsx";

export function Reservation() {

  return (
      <div className="flex flex-col flex-1 h-full bg-gray-100 items-center">
        <NavBar />
        <div className="flex items-center justify-center flex-col pt-5 flex-1 h-full ">
     
          <div className="w-screen ">
            <div className=" md:w-10/12 mx-auto m-5 w-11/12">
              <Steps />
            </div>
          </div>
        </div>
        <Footer />
      </div>
  );
}
