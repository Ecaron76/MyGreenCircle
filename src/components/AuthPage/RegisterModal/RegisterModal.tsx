import React, { useState } from 'react';
import './registerModal.css';
import MainButton from '@/components/UI/MainButton/MainButton';

type SignupModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const RegisterModal: React.FC<SignupModalProps> = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [ville, setVille] = useState('');
  const [CP, setCP] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        address: address,
        ville: ville,
        CP: CP,
      })
    })

    if (response.ok) {
      console.log("OK")
      onSuccess(); 
    }
    
  };

  return (
    <div className="modal">
      <div className="modal-content-register">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>My GreenCircle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Nom d&apos;utilisateur</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
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
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
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
          <MainButton name="Confirmer l'inscription" type='submit'/>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
