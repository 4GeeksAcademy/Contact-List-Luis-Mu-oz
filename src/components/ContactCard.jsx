import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const ContactCard = ({ contact, onDeleteRequest }) => {
  return (
    <li className="list-group-item p-3 mb-3 shadow-sm" style={{borderRadius: '10px'}}>
      <div className="row align-items-center">
        <div className="col-sm-12 col-md-3 text-center mb-3 mb-md-0">
          <img
            src={`https://i.pravatar.cc/150?u=${contact.email}`}
            className="rounded-circle"
            alt={contact.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>

        <div className="col-sm-12 col-md-7">
          <h4 className="mb-3">{contact.name}</h4>
          <p className="text-muted mb-2">
            <i className="fas fa-map-marker-alt me-3"></i>
            {contact.address}
          </p>
          <p className="text-muted mb-2">
            <i className="fas fa-phone me-3"></i>
            {contact.phone}
          </p>
          <p className="text-muted mb-0">
            <i className="fas fa-envelope me-3"></i>
            {contact.email}
          </p>
        </div>

        <div className="col-sm-12 col-md-2 d-flex align-items-center justify-content-center justify-content-md-end mt-3 mt-md-0 gap-2">
          <Link
            to={`/edit/${contact.id}`}
            className="btn btn-outline-primary"
            title="Editar"
          >
            <i className="fas fa-pencil-alt fs-5"></i>
          </Link>

          <button className="btn btn-outline-danger" onClick={onDeleteRequest} title="Eliminar">
            <i className="fas fa-trash-alt fs-5"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
};