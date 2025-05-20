import React from 'react';
import { useNavigate } from 'react-router-dom';

const PortalButton = ({ children, onClick, type, page, recordId}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(onClick + `?recordId=${recordId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`${type === page ? "bg-green-400 text-white hover:bg-green-500" : "bg-gray-200 hover:bg-gray-300 size-10/12"} p-3 rounded-lg text-left`}
    >
      {children}
    </button>
  );
};

export default PortalButton;