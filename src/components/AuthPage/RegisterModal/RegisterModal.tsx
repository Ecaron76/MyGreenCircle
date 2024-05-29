import React, { useState } from 'react';
import './registerModal.css';
import MainButton from '@/components/UI/MainButton/MainButton';

type SignupModalProps = {
  onClose: () => void;
};

const RegisterModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [address, setAddress] = useState('');
  const [ville, setVille] = useState('');
  const [CP, setCP] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      userName,
      email,
      userPassword,
      userAvatar,
      address,
      ville,
      CP
    });
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>My GreenCircle</h2>
        <h3>Inscription</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Nom d'utilisateur</label>
            <input 
              type="text" 
              id="userName" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse mail</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="userPassword">Mot de passe</label>
            <input 
              type="password" 
              id="userPassword" 
              value={userPassword} 
              onChange={(e) => setUserPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="ville">Ville</label>
            <input 
              type="text" 
              id="ville" 
              value={ville} 
              onChange={(e) => setVille(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="CP">Code Postal</label>
            <input 
              type="text" 
              id="CP" 
              value={CP} 
              onChange={(e) => setCP(e.target.value)} 
              required 
            />
          </div>
          <MainButton name="Confirmer l'inscription" />
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
