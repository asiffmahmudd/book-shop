import React, { useEffect, useState } from 'react';
import Book from '../Book/Book';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleClick = () => {
        console.log(document.getElementById('book-search').value);
        setSearch(document.getElementById('book-search').value);
    }

    useEffect( () => {
        setLoading(true);
        document.getElementById('spinner').style.display = 'block';
        let url = "";
        if(search === ""){
            url = 'https://book--shop.herokuapp.com/books';
        }
        else{
            url = `https://book--shop.herokuapp.com/book/${search}`;
        }

        fetch(url)
        .then(res => res.json())
        .then(data => {
            setBooks(data);
            document.getElementById('spinner').style.display = 'none';
            setLoading(false);
        })
    }, [search])

    return (
        <>
            <Header></Header>
            <div className="search">
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="input-group col-md-5 mx-auto">
                            <input type="search" id="book-search" onChange={handleSearch} className="form-control rounded-0" placeholder="Search Book" aria-label="Search"
                                aria-describedby="search-addon" />
                            <button type="button" onClick={handleClick} className="btn search-btn rounded-0">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="books">
                <div className="container">
                    <div className="text-center" id="spinner" style={{'display':'none'}}>
                        <div className="spinner-border text-slateblue" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="row">
                        {
                            !loading && books.length === 0 &&
                            <h1 className="col-md-12 text-center mt-5">Sorry, No book found</h1>
                        }
                        {
                            books.map(book => <Book book={book} key={book._id}></Book>)
                        }
                    </div>
                </div>
            </div>
                    
        </>
    );
};

export default Home;