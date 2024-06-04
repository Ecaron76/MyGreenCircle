
import React, { useState } from 'react';
import './CreateGrpModal.css';

type CreateGrpModalProps = {
  onClose: () => void;
};

const CreateGrpModal: React.FC<CreateGrpModalProps> = ({ onClose }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
};

export default CreateGrpModal;
