import React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="28"
      viewBox="0 0 56 28"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M28 0v14a14 14 0 01-28 0V0h12.601v21a1.399 1.399 0 002.798 0V0H28z"
      ></path>
      <path
        fill="currentColor"
        d="M55.25 28H41.259a14 14 0 010-28H55.25v12.601H34.258a1.399 1.399 0 000 2.798H55.25V28z"
      ></path>
    </svg>
  );
};

export default Logo;
