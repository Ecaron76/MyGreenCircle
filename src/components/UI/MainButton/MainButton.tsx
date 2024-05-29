import React from 'react'
import './MainButton.css'

type MainButtonProps = {
  name: string;
  onClick?: () => void;
};

const MainButton: React.FC<MainButtonProps> = ({ name='Commencer', onClick }) => {
  return (
    <div className='mainBtn' onClick={onClick}>
      {name}
    </div>
  )
};
export default MainButton
