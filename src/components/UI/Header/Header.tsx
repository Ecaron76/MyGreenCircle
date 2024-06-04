import React from 'react'
import './Header.css'
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
    username: string,
  };

const Header: React.FC<HeaderProps> = ({  username  }) => {
    return (
        <header>
            <div className='header-logo'>
                <Image alt='' src='/assets/images/logo.png' width={50} height={50} />
                <p>My GreenCircle</p>
            </div>
            <div className='header-nav'>
                <div>Accueil</div>
                <Link href='/dashboard/groupes'><div>Groupes</div></Link>
                <div>Evénements</div>
            </div>
            <div className='header-profile'>
                <Image alt='' src='/assets/images/logo.png' width={50} height={50} />
                <p>{username}</p>
            </div>
        </header>
    )
};
export default Header
