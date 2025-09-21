import React from 'react';
import PropTypes from 'prop-types';

export const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={onConfirm}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};