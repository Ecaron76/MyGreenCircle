
import React, { useState } from 'react';
import './loginModal.css';
import MainButton from '@/components/UI/MainButton/MainButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const signInData = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })

    if (signInData?.error) {
      console.log(signInData.error)
    } else{
      router.push('/dashboard')
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>My GreenCircle</h2>
        <form onSubmit={handleSubmit}>
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
          <span className='forget-password'>Mot de passe oublié</span>
          <MainButton name='Connexion' type='submit'/>
          
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
