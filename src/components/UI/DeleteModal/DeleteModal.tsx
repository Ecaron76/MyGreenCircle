
import React, { useState } from 'react';
import './DeleteModal.css'
type DeleteModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onSuccess }) => {

  return (
    <div className="modal">
      <div className="modal-delete">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-content">
          <h2>Confirmation de suppression</h2>
          <p>Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.</p>
          <div className="modal-actions">
            <button className="btn-confirm" onClick={onSuccess}>Oui, supprimer</button>
            <button className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
