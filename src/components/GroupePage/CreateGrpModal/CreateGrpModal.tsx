
import React, { useState } from 'react';
import './CreateGrpModal.css';
import MainButton from '@/components/UI/MainButton/MainButton';

type CreateGrpModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const CreateGrpModal: React.FC<CreateGrpModalProps> = ({ onClose, onSuccess }) => {
  
  const [groupName, setgroupName] = useState('');
  const [groupDescription, setgroupDescription] = useState('');
  const [groupLocation, setgroupLocation] = useState('');
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/groupe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupName: groupName,
        groupDescription: groupDescription,
        groupLocation: groupLocation,
        
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="groupName">Nom</label>
            <input 
              type="text" 
              id="groupName" 
              value={groupName} 
              onChange={(e) => setgroupName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="groupDescription">Description</label>
            <input 
              type="groupDescription" 
              id="groupDescription" 
              value={groupDescription} 
              onChange={(e) => setgroupDescription(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="groupLocation">Localisation</label>
            <input 
              type="groupLocation" 
              id="groupLocation" 
              value={groupLocation} 
              onChange={(e) => setgroupLocation(e.target.value)} 
              required 
            />
          </div>      
          <MainButton name='Créer' type='submit'/> 
        </form>
      </div>
    </div>
  );
};

export default CreateGrpModal;
