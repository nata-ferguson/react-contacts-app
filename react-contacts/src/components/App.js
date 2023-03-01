import "../css/App.css";
import ListContacts from "./ListContacts";
import * as ContactsAPI from '../utils/ContactsAPI'
import {useState, useEffect} from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(()=> {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res)
    };

    getContacts();
  }, []) // We include empty array because we want the effect to run only once -
         // during mount and unmount,  not after every time props or state changes

  const removeContact = (contact) => {
    ContactsAPI.remove(contact);

    //contact to-be-removed is filtered out 
    setContacts(contacts.filter(c => c.id !== contact.id))
  }

  return (
    <div>
      <ListContacts contacts={contacts} onDeleteContact={removeContact}/>
    </div>
  )
  
};

export default App;
