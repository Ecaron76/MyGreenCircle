"use client"
import Image from "next/image";
import './auth.css'
import { useState } from 'react';

import MainButton from "@/components/UI/MainButton/MainButton";
import LoginModal from "@/components/AuthPage/LoginModal/LoginModal";
import RegisterModal from "@/components/AuthPage/RegisterModal/RegisterModal";
export default function Auth() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
  };
  const handleSignupClick = () => {
    setIsSignupModalVisible(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalVisible(false);
  };
  return (
    <main>
        <div className="hero">
            <Image alt="" src="/assets/images/logo.png" width={300} height={300}/>
            <h1>My GreenCircle</h1>
        </div>
        <div className="containerButtons">
          <MainButton name="S'inscrire" onClick={handleSignupClick} />
          <MainButton name="Se connecter" onClick={handleLoginClick}/>
        </div>
        {isLoginModalVisible && <LoginModal onClose={closeLoginModal} />}
        {isSignupModalVisible && <RegisterModal onClose={closeSignupModal} />}
        
    </main>
  );
}
