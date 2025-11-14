import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = (): React.ReactElement => {  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex justify-center items-center gap-3 flex-col">
        <h1 className="text-4xl font-bold text-blue-600">
          🚀 Page Not Found
        </h1>
        <Link to="/" className="bg-cyan-800 text-white py-2 px-4 inline-block">Back to Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;