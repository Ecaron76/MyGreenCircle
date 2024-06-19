
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
  const [file, setFile] = useState<File>()
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async () => {
    if (!file) return null;

    const imageData = new FormData();
    imageData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: imageData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error in uploading image', error);
      return null;
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      alert('Failed to upload image. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/groupe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName: groupName,
          groupDescription: groupDescription,
          groupLocation: groupLocation,
          groupImage: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      onSuccess();
    } catch (error) {
      console.error('Error in creating group', error);
      alert('Failed to create group. Please try again.');
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="modal">
      <div className="modal-content-register">
        <h3 className='modal-title'>Création de groupe</h3>
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className='form-group'>
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
          <div className="form-group">
            <input
              type="file"
              id="groupImage"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                  setImageObjectUrl(URL.createObjectURL(e.target.files[0]));
                }
              }}
              required
              style={{ display: 'none' }}
            />
            <label htmlFor="groupImage" className="custom-file-upload">
              Choisir une image
            </label>
            {imageObjectUrl && <img src={imageObjectUrl} alt="Group Preview" className="image-preview" />}
          </div>
          <MainButton name='Créer' type='submit'/> 
        </form>
      </div>
    </div>
  );
};

export default CreateGrpModal;
