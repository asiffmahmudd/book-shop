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

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const onSubmit = data => {
        // if(data.photo.)
        console.log(data);
    };

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
        </div>
    );
};

export default AddBook;