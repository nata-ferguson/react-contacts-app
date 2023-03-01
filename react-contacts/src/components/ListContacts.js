import PropTypes from "prop-types";
import {useState} from 'react';

const ListContacts = ({contacts, onDeleteContact}) => {
    const [query, setQuery] = useState('')

    const updateQuery = (query) => {
        setQuery(query.trim()); //sets a new query string and removes white space
    }

    const clearQuery = () => {
        updateQuery("");
    }

    const showingContacts = 
        query === "" 
            ? contacts 
            : contacts.filter((c) => 
                c.name.toLowerCase().includes(query.toLowerCase())
              );

    return (
        <div className='list-contacts'>
            <div className="list-contacts-top">
                <input 
                    className="search-contacts" 
                    type="text" 
                    placeholder="Search Contacts"
                    value={query}
                    onChange={(event) => updateQuery(event.target.value)}
                />
            </div>

            {
                showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>
                            Now showing {showingContacts.length} of {contacts.length}
                        </span>
                        <button onClick={clearQuery}>Show All</button>
                    </div>
                )
            }

            <ol className='contact-list'>
                {/* because we are returning a single expression, we use () and remove the return word inside map */}
                {showingContacts.map((contact) => (
                    <li key={contact.id} className='contact-list-item'>
                        <div 
                            className="contact-avatar" 
                            style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}
                        ></div>
                        <div className="contact-details">
                            <p>{contact.name}</p>
                            <p>{contact.handle}</p>
                        </div>
                        <button 
                            className="contact-remove" 
                            onClick={() => onDeleteContact(contact)}
                            >
                            Remove
                        </button>
                    </li>
                ))}
            </ol>
        </div>

    )
}

ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts;