import React from 'react'
import './MainButton.css'

type MainButtonProps = {
  name: string;
};

const MainButton: React.FC<MainButtonProps> = ({ name='Commencer' }) => {
  return (
    <div className='mainBtn'>
      {name}
    </div>
  )
};
export default MainButton
