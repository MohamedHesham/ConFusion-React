import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    handleSubmit(values) {
        this.toggle();
        this.props.addComment(this.props.dishId, values.Rating, values.name, values.message);
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    render() {
        return (
            <div className="row">
                <Button onClick={this.toggle} outline><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <LocalForm
                        onSubmit={(values) => this.handleSubmit(values)}>
                    <ModalBody>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rate">Rating</Label>
                                    <Control.select model=".rate" id="rate" name="rate" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>

                                </Col>
                            </Row>
                            <Row className="form-group">
                                
                                <Col>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text model=".name" id="name" name="name" 
                                        className="form-control" placeholder="Your Name" 
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15), required
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="message">Comment</Label>
                                    <Control.textarea style={{resize: 'none'}} model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                        </LocalForm>

                </Modal>
            </div>
        );
    }
}

export default Comment;