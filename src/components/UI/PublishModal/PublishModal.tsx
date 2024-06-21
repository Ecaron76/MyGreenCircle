
import React, { useState } from 'react';
import './PublishModal.css'
type PublishModalProps = {
  onClose: () => void;
  onSuccess: () => void;
  isPublishing: boolean
};

const PublishModal: React.FC<PublishModalProps> = ({ onClose, onSuccess, isPublishing }) => {

  return (
    <div className="modal">
      <div className="modal-publish">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-content">
          <h2>{isPublishing ? 'Confirmation de publication' : 'Confirmation de dépublication'}</h2>
          <p>{isPublishing ? 'Êtes-vous sûr de vouloir publier ce post ?' : 'Êtes-vous sûr de vouloir dépublier ce post ?'}</p>
          <div className="modal-actions">
            <button className="btn-confirm" onClick={onSuccess}>{isPublishing ? 'Oui, publier' : 'Oui, dépublier'}</button>
            <button className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
