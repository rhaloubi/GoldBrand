"use client";
import { useNavigate } from 'react-router-dom';
import { animatePageOut } from '../../utils/animations'; // Make sure this file exists

function TransitionLink({ href, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    animatePageOut(href, navigate);
  };

  return (
    <button
      className="text-xl text-neutral-900 hover:text-neutral-700"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default TransitionLink;
