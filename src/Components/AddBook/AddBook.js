import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddBook.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const AddBook = () => {

    const { register, handleSubmit, reset } = useForm();
    const [fileError, setFileError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        if(data.photo[0].type === "image/jpeg" || data.photo[0].type === "image/png"){
            setFileError(false);
            const imageData = new FormData();
            imageData.set('key', '0c9c52f3c2c70e376333024c7dd177e2');
            imageData.append('image', data.photo[0]);
            document.getElementById('spinner').style.display = 'block';
            setLoading(true)

            fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: imageData
            })
            .then(response => response.json())
            .then(result => {
                const book = {
                    name : data.bookName,
                    author : data.author,
                    price : data.price,
                    image : result.data.display_url
                }
                submitData(book);
            })
            .catch(error => {
                alert(error)
            })
        }
        else{
            setFileError(true);
        }
    }

    const submitData = (book) => {
        fetch('https://book--shop.herokuapp.com/addbook', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                document.getElementById('spinner').style.display = 'none';
                setLoading(false)
                alert("Book added successfully");
                reset();
            }
        })

    }

    const handleClick = () => {
        document.getElementById('photo').click();
    }

    return (
        <div className="addbook mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="bookName">Book Name</label>
                            <input type="text" className="form-control" {...register("bookName")} name="bookName" id="bookName" placeholder="Enter Name" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="autor">Author Name</label>
                            <input type="text" className="form-control" name="author" {...register("author")} id="author" placeholder="Enter Author" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" {...register("price")} id="price" placeholder="Enter Price" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="d-block" htmlFor="photo">Add Book Cover Photo</label>
                            <input type="file" name="photo" {...register("photo")} id="photo" required/>
                            <button className="btn btn-upload" onClick={handleClick}><FontAwesomeIcon icon={faCloudUploadAlt} color="slateblue"/> Upload</button>
                            {fileError && <span className="error">Please upload a jpeg or png file</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-submit float-right" disabled={loading? true: false}>Submit</button>
            </form>
            <div className="text-center" id="spinner" style={{'display':'none'}}>
                <div className="spinner-border text-slateblue" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default AddBook;