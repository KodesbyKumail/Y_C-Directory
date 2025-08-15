"use client";
import React from "react";

import Link from "next/link";
const SearchFormreset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset(); // Reset logic here
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white text-size-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
    </button>
  );
};

export default SearchFormreset;
