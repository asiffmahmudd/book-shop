import React, { useState } from 'react';
import AddBook from '../AddBook/AddBook';
import ManageBooks from '../ManageBooks/ManageBooks';
import Sidebar from '../Sidebar/Sidebar';
import './Admin.css';

const Admin = () => {

    const [title, setTitle] = useState("Add Book");

    const changeTitle = (selectedTitle) => {
        setTitle(selectedTitle);
        document.body.style.height = 'unset !important';
    }

    return (
        <div className="admin">
            <div className="row">
                <div className="col-lg-2 sidebar-container">
                    <Sidebar changeTitle={changeTitle}></Sidebar>
                </div>
                <div className="col-lg-10 p-0">
                    <div className="col-lg-12 option-title">
                        <h5 className="p-4 page-title">{title}</h5>
                    </div>
                    {
                        title === "Add Book" &&
                        <div className="col-lg-12">
                            <AddBook></AddBook>
                        </div>
                    }
                    {
                        title === "Manage Books" &&
                        <div className="col-lg-12">
                            <ManageBooks></ManageBooks>
                        </div>
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Admin;