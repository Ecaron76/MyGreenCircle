import React, { useState } from 'react';
import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type HeaderProps = {
  username: string;
};

const Header: React.FC<HeaderProps> = ({ username }) => {
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuClick = () => {
    setMenuActive(!menuActive);
  };

  const handleOverlayClick = () => {
    setMenuActive(false);
  };

  return (
    <header>
      <div className='header-container'>
        <div className='header-logo'>
          <Image alt='' src='/assets/images/logo.png' width={40} height={40} />
          <p>My GreenCircle</p>
        </div>
        <div className={`header-nav ${menuActive ? 'active' : ''}`}>
          <Link href='/home'>Accueil</Link>
          <Link href='/home/groupes'>Groupes</Link>
          <Link href='/home/events'>Evénements</Link>
        </div>
        <div className='header-right'>
          <div className='header-profile'>
            <p>{username}</p>
            <button className='signout-btn' onClick={() => signOut()}>Se déconnecter</button>
          </div>
          <div className='burger-menu' onClick={handleMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      {menuActive && <div className='menu-overlay' onClick={handleOverlayClick}></div>}
    </header>
  );
};

export default Header;
