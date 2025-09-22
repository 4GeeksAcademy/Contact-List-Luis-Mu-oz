export const ContactList = () => {
  const { store, dispatch } = useContext(Context);
  const [modalState, setModalState] = useState({ show: false, contactId: null });

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const res = await fetch(`${store.baseURL}/agendas/${store.agenda_slug}/contacts`);
        if (res.status === 404) {
          await fetch(`${store.baseURL}/agendas/${store.agenda_slug}`, { method: "POST" });
          dispatch({ type: 'setContacts', payload: [] });
          return;
        }
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        dispatch({ type: 'setContacts', payload: data.contacts || [] });
      } catch (err) {
        console.error("Error al cargar contactos:", err);
        dispatch({ type: 'setContacts', payload: [] });
      }
    };
    loadContacts();
  }, [dispatch, store.baseURL, store.agenda_slug]);

 
  const handleDeleteRequest = (id) => setModalState({ show: true, contactId: id });
  const handleCancelDelete = () => setModalState({ show: false, contactId: null });

  const handleConfirmDelete = async () => {
    if (!modalState.contactId) return;
    try {
      const res = await fetch(`${store.baseURL}/agendas/${store.agenda_slug}/contacts/${modalState.contactId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      
      dispatch({ type: 'deleteContact', payload: { idToDelete: modalState.contactId } });
      handleCancelDelete();
    } catch (error) {
      console.error(error);
      alert("No se pudo borrar el contacto.");
      handleCancelDelete();
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-success">
          Add new contact
        </Link>
      </div>
      <h2 className="mb-4">Contactos de la Lista: <strong>{store.agenda_slug}</strong></h2>
      <ul className="list-group">
        {store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onRequestDelete={handleDeleteRequest} />
          ))
        ) : (
          <li className="list-group-item text-center p-4">No hay contactos, ¡añade uno nuevo!</li>
        )}
      </ul>
      <ConfirmModal
        show={modalState.show}
        title="¿Estás seguro?"
        message="Esta acción no se puede deshacer. ¿Realmente quieres eliminar este contacto?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};