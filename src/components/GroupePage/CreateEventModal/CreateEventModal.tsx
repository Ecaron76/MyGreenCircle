import React, { useState } from 'react';
import './CreateEventModal.css';
import MainButton from '@/components/UI/MainButton/MainButton';

type CreateEventModalProps = {
  groupId: number;
  onClose: () => void;
  onSuccess: () => void;
};

const CreateEventModal: React.FC<CreateEventModalProps> = ({ groupId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [limitSubscriptionDate, setLimitSubscriptionDate] = useState('');
  const [address, setAddress] = useState('');
  const [ville, setVille] = useState('');
  const [CP, setCP] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (new Date(startDate) < new Date()) {
      setError('The start date must be in the future.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('The end date cannot be before the start date.');
      return;
    }

    if (limitSubscriptionDate && (new Date(limitSubscriptionDate) < new Date(startDate) || new Date(limitSubscriptionDate) > new Date(endDate))) {
      setError('The limit subscription date must be between the start date and end date.');
      return;
    }

    // const postalCode = parseInt(CP, 10);
    // if (isNaN(postalCode)) {
    //   setError('The postal code must be an integer.');
    //   return;
    // }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lon)) {
      setError('Latitude and Longitude must be valid numbers.');
      return;
    }

    const eventData = {
      groupId,
      title,
      description,
      location,
      startDate,
      endDate,
      status,
      limitSubscriptionDate,
      address,
      ville,
      CP,
      latitude: lat,
      longitude: lon,
    };

    const response = await fetch('/api/event/userEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      setSuccessMessage('Event created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onSuccess();
      }, 2000);
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to create event');
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <h2>Create Event</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Localisation</label>
            <input 
              type="text" 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Date de début</label>
            <input 
              type="date" 
              id="startDate" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Date de fin</label>
            <input 
              type="date" 
              id="endDate" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <input 
              type="text" 
              id="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="limitSubscriptionDate">Date limite d'inscription</label>
            <input 
              type="date" 
              id="limitSubscriptionDate" 
              value={limitSubscriptionDate} 
              onChange={(e) => setLimitSubscriptionDate(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Addresse</label>
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
          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input 
              type="text" 
              id="latitude" 
              value={latitude} 
              onChange={(e) => setLatitude(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input 
              type="text" 
              id="longitude" 
              value={longitude} 
              onChange={(e) => setLongitude(e.target.value)} 
              required 
            />
          </div>
          <MainButton name='Create' type='submit'/>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
