import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { ConfirmModal } from "../components/ConfirmModal";

export const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);


  useEffect(() => {
    const loadContacts = async () => {
      const url = `${store.baseURL}/agendas/${store.agenda}/contacts`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'setContacts', payload: data.contacts || [] });
        } else if (response.status === 404) {
          await fetch(`${store.baseURL}/agendas/${store.agenda}`, { method: "POST" });
          dispatch({ type: 'setContacts', payload: [] });
        }
      } catch (error) {
        console.error("Error al cargar los contactos:", error);
      }
    };
    loadContacts();
  }, [store.agenda, store.baseURL, dispatch]);


  const handleDeleteRequest = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };


  const cancelDelete = () => {
    setContactToDelete(null);
    setShowModal(false);
  };


  const confirmDelete = async () => {
    if (!contactToDelete) return;
    const url = `${store.baseURL}/agendas/${store.agenda}/contacts/${contactToDelete.id}`;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (response.ok) {
        dispatch({ type: 'deleteContact', payload: { idToDelete: contactToDelete.id } });
        cancelDelete();
      } else {
        throw new Error("No se pudo eliminar el contacto.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
      cancelDelete();
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-4">
        <Link to="/add" className="btn btn-primary">
          Tu nuevo contacto📲
        </Link>
      </div>

      <h2 className="mb-4">Lista de Contactos📜</h2>

      {store.contacts.length > 0 ? (
        <ul className="list-group">
          {store.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDeleteRequest={() => handleDeleteRequest(contact)}
            />
          ))}
        </ul>
      ) : (
        <div className="alert alert-info text-center">
          No hay contactos 😞. ¡Añade el primero!
        </div>
      )}

      <ConfirmModal
        show={showModal}
        title="¿Estás seguro?"
        message={`Esta acción eliminará a "${contactToDelete?.name}" permanentemente.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};