import React from 'react'
import './MainButton.css'

type MainButtonProps = {
  name: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const MainButton: React.FC<MainButtonProps> = ({ name='Commencer', type= "button", onClick }) => {
  return (
    <button className='mainBtn' type={type} onClick={onClick}>
      {name}
    </button>
  )
};
export default MainButton
