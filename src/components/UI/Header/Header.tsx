import React from 'react'
import './Header.css'
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';


type HeaderProps = {
    username: string,
  };

const Header: React.FC<HeaderProps> = ({  username  }) => {
    
    return (
        <header>
            <div className='header-logo'>
                <Image alt='' src='/assets/images/logo.png' width={60} height={60} />
                <p>My GreenCircle</p>
            </div>
            <div className='header-nav'>
                <Link href='/home'><div>Accueil</div></Link>
                <Link href='/home/groupes'><div>Groupes</div></Link>
                <Link href="/home/events"><div>Evénements</div></Link>
            </div>
            <div className='header-profile'>
                <Image alt='' src='/assets/images/logo.png' width={50} height={50} />
                <p>{username}</p>
                <button className='signout-btn' onClick={() => signOut()}> Se déconnecter </button>
            </div>
        </header>
    )
};
export default Header
