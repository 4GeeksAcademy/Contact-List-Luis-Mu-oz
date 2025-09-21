// src/pages/AddContact.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { contactId } = useParams();
    const isEditMode = Boolean(contactId);

    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            const contactToEdit = store.contacts.find(c => String(c.id) === contactId);
            if (contactToEdit) {
                setContact(contactToEdit);
            }
        }
    }, [contactId, store.contacts, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const onlyNums = /^[0-9]*$/;
            if (onlyNums.test(value)) {
                setContact({ ...contact, [name]: value });
            }
        } else {
            setContact({ ...contact, [name]: value });
        }

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!contact.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!contact.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        if (!contact.address.trim()) newErrors.address = 'La dirección es obligatoria';
        if (!contact.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
            newErrors.email = 'El formato del email no es válido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const url = isEditMode
            ? `${store.baseURL}/agendas/${store.agenda}/contacts/${contactId}`
            : `${store.baseURL}/agendas/${store.agenda}/contacts`;

        const method = isEditMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Ocurrió un error.");
            }

            const data = await response.json();

            if (isEditMode) {
                dispatch({ type: 'updateContact', payload: { id: parseInt(contactId), updatedContact: data } });
            } else {
                dispatch({ type: 'addContact', payload: data });
            }
            navigate("/");

        } catch (error) {
            console.error("Error al guardar el contacto:", error);
            alert(error.message);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "700px" }}>
            <h1 className="text-center mb-4">
                {isEditMode ? "Editar Contacto" : "Añadir un nuevo contacto"}
            </h1>

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Introduce el nombre"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                        type="correo"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Introduce el correo"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="number"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="Introduce un número"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Introduce la dirección"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                    Guardar
                </button>
                <div>
                    <button type="button"
                        className="btn btn-danger w-100 mt-2"
                        onClick={() => navigate("/")} >
                        Regresa a tus contactos
                    </button>
                </div>

            </form>
        </div>
    );
};