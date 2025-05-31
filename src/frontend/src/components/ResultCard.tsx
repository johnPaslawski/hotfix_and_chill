import React from "react";

interface ResultCardProps {
  title?: string;
  value?: string;
  children?: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, children }) => {
  return (
    <div>
      {title && <h3 className="font-semibold text-xl my-6">{title}</h3>}
      <div className="aspect-square size-100 bg-white shadow-gray-300 shadow-md rounded-xl p-8 border-green-400 border flex flex-col">
        {value && (
          <div className="text-[12rem] font-bold w-full h-full text-center text-green-500 flex items-center justify-center">
            <p>{value}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
