import React from "react";

function Alert({ type, title, message }) {
  const getSvg = () => {
    if (type === "error") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="fill-current h-6 w-6 text-teal-500 mr-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
    );
  };

  const getClassNames = (type) => {
    if (type === "error") {
      return "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md";
    }
    return "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md";
  };

  return (
    <div className={getClassNames(type)} role="alert">
      <div className="flex">
        <div className="py-1">{getSvg(type)}</div>
        <div>
          {title && <p className="font-bold">{title}</p>}
          {!title && message && <p className="font-bold">{message}</p>}
          {title && message && <p className="text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Alert;
export { Alert };
