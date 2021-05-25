import React from 'react';
import Modal from 'react-bootstrap/Modal'
import AddBook from '../AddBook/AddBook';

const ModalCs = (props) => {
    console.log(props)
    return (
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Edit Book Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <AddBook></AddBook>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default ModalCs;