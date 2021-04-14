import React from 'react';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
    return (
        <>
            <Header></Header>
            <div className="search">
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="input-group col-md-4 mx-auto">
                            <input type="search" className="form-control rounded-0" placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" />
                            <button type="button" className="btn search-btn rounded-0">Search</button>
                        </div>
                    </div>
                </div>
            </div>
                    
        </>
    );
};

export default Home;