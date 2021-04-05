import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function MyVerticallyCenteredModal(props) {

    const [formData, setFormData ] = useState({
        title: '',
        body: '',
    })

    const onChange = (e, val) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

    const onsubmit = (e) => {
        e.preventDefault();
        const data = {
            title: formData.title,
            body: formData.body
        }
        axios.post(`http://jsonplaceholder.typicode.com/posts`, {data})
        .then((res) => {
            console.log(res.data);
        })
        props.onHide();

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Post
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter a title" name="title" onChange={onChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Body</Form.Label>
                        <Form.Control type="text" placeholder="Enter a body" name="body" onChange={onChange}/>
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" type="submit" onClick={(e) => onsubmit(e)}>
                        Submit
             </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;
