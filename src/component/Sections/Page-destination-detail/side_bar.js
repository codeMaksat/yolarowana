import React from "react";
import Link from "next/link";

const Side_Bar = ({ active, onGridChange }) => {
  const tabClass = value =>
    `block py-2 px-3 md:px-7 rounded-md text-dark-900 hover:bg-primary-900 hover:text-white transition-all ${
      active === value ? "bg-primary-900 text-white" : ""
    }`;

  return (
    <ul className="flex flex-wrap items-center bg-primary-800 rounded-md p-1.5 md:gap-4 mb-10">
      <li className="w-1/2 md:w-auto text-center">
        <Link
          href="#"
          className={tabClass(0)}
          onClick={e => {
            e.preventDefault();
            onGridChange(0);
          }}
        >
          Top Places
        </Link>
      </li>

      <li className="w-1/2 md:w-auto text-center">
        <Link
          href="#"
          className={tabClass(1)}
          onClick={e => {
            e.preventDefault();
            onGridChange(1);
          }}
        >
          Travel Info
        </Link>
      </li>

      <li className="w-1/2 md:w-auto text-center">
        <Link
          href="#"
          className={tabClass(2)}
          onClick={e => {
            e.preventDefault();
            onGridChange(2);
          }}
        >
          Best Time
        </Link>
      </li>

      <li className="w-1/2 md:w-auto text-center">
        <Link
          href="#"
          className={tabClass(3)}
          onClick={e => {
            e.preventDefault();
            onGridChange(3);
          }}
        >
          Tours
        </Link>
      </li>
    </ul>
  );
};

export default Side_Bar;