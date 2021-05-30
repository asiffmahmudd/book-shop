import React, { useEffect } from 'react';
import { useState } from 'react';
import './ManageBooks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalCs from './ModalCs';

const ManageBooks = () => {
    const [modalShow, setModalShow] = useState(false);
    const [books, setBooks] = useState([]);
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookInfo, setBookInfo] = useState();

    useEffect(() => {
        setLoading(true);
        document.getElementById('spinner').style.display = 'block';
        fetch('https://book--shop.herokuapp.com/books')
        .then(res => res.json())
        .then(data => {
            setBooks(data);
            document.getElementById('spinner').style.display = 'none';
            setLoading(false);
        })
    }, [change])

    const handleDelete = (id) => {
        let confirmation = window.confirm("Are you sure you want to delete this book?");
        if(confirmation){
            setChange(false);
            document.getElementById('spinner').style.display = 'block';
            fetch(`https://book--shop.herokuapp.com/book/${id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data){
                    setChange(true);
                    document.getElementById('spinner').style.display = 'none';
                    alert("Book deleted successfully");
                }
            })
        }
    }

    return (
        <div className="manage-books mb-5">
            <div className="container">
            <div className="text-center mt-4" id="spinner" style={{'display':'none'}}>
                <div className="spinner-border text-slateblue" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {
                !loading && books.length === 0 &&
                <div className="text-center">
                    <h1>No books available</h1>
                </div>
            }
            {
                books.length > 0 &&

                <div className="table-container border-0 mt-4 p-4">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Book Name</th>
                                <th scope="col">Author Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map(book => {
                                    return (
                                        <tr key={book._id}>
                                            <td>{book.book.name}</td>
                                            <td>{book.book.author}</td>
                                            <td>${book.book.price}</td>
                                            <td>
                                                <span className="edit mr-3" onClick={() => {setModalShow(true); setBookInfo(book)}}><FontAwesomeIcon icon={faEdit} color="white"/></span> 
                                                <span onClick={() => handleDelete(book._id)} className="delete"><FontAwesomeIcon icon={faTrashAlt} color="white"/></span>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            }
           </div>
           <ModalCs show={modalShow} setChange={setChange} bookInfo={bookInfo} onHide={() => setModalShow(false)}></ModalCs>
        </div>
    );
};

export default ManageBooks;