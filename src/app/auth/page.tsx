"use client"
import Image from "next/image";
import './auth.css'
import { useState } from 'react';

import MainButton from "@/components/UI/MainButton/MainButton";
import LoginModal from "@/components/AuthPage/LoginModal/LoginModal";
export default function Auth() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
  };
  return (
    <main>
        <div className="hero">
            <Image alt="" src="/assets/images/logo.png" width={300} height={300}/>
            <h1>My GreenCircle</h1>
        </div>
        <div className="containerButtons">
          <MainButton name="S'inscrire" />
          <MainButton name="Se connecter" onClick={handleLoginClick}/>
        </div>
        {isLoginModalVisible && <LoginModal onClose={closeLoginModal} />}
        
    </main>
  );
}
