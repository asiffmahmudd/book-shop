import React from 'react';
import { useForm } from "react-hook-form";
import './AddBook.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
        photo: yup.mixed().test("filesize", "Please upload png or jpg format", (value) => {
            if(value.length === 0){
                return;
            }
            return value && (value[0].type === 'image/png' || value[0].type === 'image/jpeg')
        })
    });

const AddBook = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const onSubmit = data => {
        
        const imageData = new FormData();
        imageData.set('key', '0c9c52f3c2c70e376333024c7dd177e2');
        imageData.append('image', data.photo[0]);
        document.getElementById('spinner').style.display = 'block';

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
                            <span className="d-block" id="filename"></span>
                            {errors.photo && <span className="d-block error">{errors.photo.message}</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-submit float-right">Submit</button>
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