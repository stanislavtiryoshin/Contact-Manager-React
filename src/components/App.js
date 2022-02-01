import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactInfo from './ContactInfo'
import ContactDelete from "./ContactDelete";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>} />
          <Route path="/" element={<ContactList contacts={contacts} />} />
          <Route path="/contact/:id" element={<ContactInfo />} />
          <Route path="/contact/delete/:id" element={<ContactDelete getContactId={removeContactHandler}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;