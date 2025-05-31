import React from "react";

interface ResultCardProps {
  title?: string;
  children?: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, children }) => {
  return (
    <div>
      {title && (
        <h3 className="font-semibold text-center text-xl my-6">{title}</h3>
      )}
      <div className="aspect-square size-120 bg-white shadow-gray-300 shadow-xl rounded-xl p-8 border-green-400 border flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
