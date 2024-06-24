
import React, { useState } from 'react';
import './PublishModal.css'
type PublishModalProps = {
  onClose: () => void;
  onSuccess: () => void;
  isPublishing: boolean | undefined
};

const PublishModal: React.FC<PublishModalProps> = ({ onClose, onSuccess, isPublishing }) => {
  console.log(isPublishing)
  return (
    <div className="modal">
      <div className="modal-publish">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-content">
          <h2>{!isPublishing ? 'Confirmation de publication' : 'Confirmation de dépublication'}</h2>
          <p>{!isPublishing ? 'Êtes-vous sûr de vouloir publier ce post ?' : 'Êtes-vous sûr de vouloir dépublier ce post ?'}</p>
          <div className="modal-actions">
            <button className={`btn-confirm ${isPublishing ? 'btn-unpublish' : 'btn-publish'}`}  onClick={onSuccess}>{!isPublishing ? 'Oui, publier' : 'Oui, dépublier'}</button>
            <button className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
