import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faPlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar = (props) => {

    const {changeTitle} = props;
    
    return (
        <div className="sidebar">
                <h3 className="ml-4 text-white p-3">Book Shop</h3>
                <div className="option-container mt-3">
                    <p className="option-item p-3" onClick={() => changeTitle('Manage Books')}><FontAwesomeIcon className="fa-icon" icon={faTh} /> <span className="ml-2 option-item-text">Manage Books</span></p>
                    <p className="option-item p-3" onClick={() => changeTitle('Add Book')}><FontAwesomeIcon className="fa-icon" icon={faPlus} /> <span className="ml-2 option-item-text">Add Book</span></p>
                </div>
                
        </div>
    );
};

export default Sidebar;