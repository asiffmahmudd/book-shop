import React from 'react';
import Modal from 'react-bootstrap/Modal'
import EditBook from './EditBook';

const ModalCs = (props) => {
    
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
                <EditBook bookInfo={props.bookInfo} onHide={props.onHide} setChange={props.setChange}></EditBook>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default ModalCs;