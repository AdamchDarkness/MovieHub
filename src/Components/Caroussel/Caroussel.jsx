import React, { useState } from "react";

function Caroussel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const customImages = [
    { url: "https://i0.wp.com/thecinemafiles.com/wp-content/uploads/2022/12/babylon-banner-1.jpg?ssl=1", title: "Image 1" },
    { url: "https://i0.wp.com/thecinemafiles.com/wp-content/uploads/2022/11/TheMenuBanner.jpg?fit=1640%2C720&ssl=1", title: "Image 2" },
    { url: "https://dx35vtwkllhj9.cloudfront.net/disney/inside-out-2/images/regions/ca/header.jpg", title: "Image 3" },
    { url: "https://revistabombea.com/wp-content/uploads/2024/09/desktopbanner.jpg", title: "Image 4" },
    { url: "https://i0.wp.com/thecinemafiles.com/wp-content/uploads/2024/04/challengers-e1713147633260.jpg?fit=1256%2C639&ssl=1", title: "Image 5" },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % customImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? customImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto h-80 md:h-96 overflow-hidden rounded-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      {customImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          } flex flex-col items-center`}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
            />
        </div>
      ))}

      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-1/2 left-4 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md -translate-y-1/2 group focus:outline-none"
      >
        <svg
          className="w-5 h-5 text-gray-800 group-hover:text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute top-1/2 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md -translate-y-1/2 group focus:outline-none"
      >
        <svg
          className="w-5 h-5 text-gray-800 group-hover:text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}

export default Caroussel;
