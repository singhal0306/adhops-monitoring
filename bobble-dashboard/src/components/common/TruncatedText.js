import React, { useState } from "react";

const TruncatedText = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const truncateString = (str, maxLength = 15) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  };
  return (
    <div
      className="relative items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className={`text-sm text-black p-2.5 dark:text-white sm:block`}>
        {truncateString(text)}
      </p>
      {isHovered && (
        <div className="absolute bg-meta-4 text-white dark:bg-white dark:text-black font-medium text-sm shadow-lg p-2 rounded-lg z-10 w-full"
        onMouseEnter={handleMouseLeave}>
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
