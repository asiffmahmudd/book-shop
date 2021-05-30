import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const EditBook = ({bookInfo, onHide, setChange}) => {

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        setLoading(true)
        document.getElementById('edit-spinner').style.display = 'block';
        setChange(false)

        fetch(`https://book--shop.herokuapp.com/editInfo/${bookInfo._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({data})
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert("Data modified successfully")
                document.getElementById('edit-spinner').style.display = 'none';
                setLoading(false)
                setChange(true)
                onHide();
            }
        })
    }
    const {name, author, price} = bookInfo.book;

    return (
        <div className="edit-book">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="bookName">Book Name</label>
                            <input type="text" className="form-control" {...register("bookName")} name="bookName" id="bookName" defaultValue={name} placeholder="Enter Name" required/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="autor">Author Name</label>
                            <input type="text" className="form-control" name="author" {...register("author")} id="author" defaultValue={author} placeholder="Enter Author" required/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" {...register("price")} id="price" defaultValue={price} placeholder="Enter Price" required/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-submit rounded float-right" disabled={loading?true:false}>Submit</button>
            </form>
            <div className="text-center" id="edit-spinner" style={{'display':'none'}}>
                <div className="spinner-border text-slateblue" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default EditBook;