export const initialStore = () => {
  return {
    user: "Luis-Muñoz", 
    agenda: "Luis11prog", 
    contacts: [],
    baseURL: "https://playground.4geeks.com/contact"
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'setContacts':
      return {
        ...store,
        contacts: action.payload
      };

    case 'addContact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case 'updateContact':
      const { id, updatedContact } = action.payload;
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === id ? { ...contact, ...updatedContact } : contact
        )
      };

    case 'deleteContact':
      const { idToDelete } = action.payload;
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== idToDelete)
      };

    default:

      return store;
  }
}