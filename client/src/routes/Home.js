import React from "react";

const Home = () => {
  return (
    <div
      id="main"
      className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 font-black"
    >
      <div className="bg-gray-800 pt-3">
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <h1 className="font-bold pl-2">Home</h1>
        </div>
      </div>
      <div className=" flex flex-wrap place-content-center">
        <div className=" w-full  h-auto p-6 ">
          <h1 className=" text-xl">Welcome to the Tower.</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
