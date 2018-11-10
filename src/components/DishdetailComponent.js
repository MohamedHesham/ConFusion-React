import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';




    function RenderComments({comments, postComment, dishId}){
        if (comments){
            const commentsList = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
            return (
                <div>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        {commentsList}
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </ul>
                </div>

                )
            

        } else{

                    return(

                        <div></div>

                        );

                    }


    }


    function RenderDish({dish}){
       // var str = JSON.stringify(dish, null, 2); // spacing level = 2
        //console.log(dish)
        if (dish){
        return(
                // <div  className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                // </div>
                    );

        }else{

            return(

                <div></div>

                );

            }

    }
    const  DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>

                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>                
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderDish dish={props.dish} />
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <RenderComments comments={props.comments} 
                                 postComment={props.postComment}
                                dishId={props.dish.id}/>
                            </div>
                        </div>
                    </div>
                );
    }
            
    }

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
     constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.state = {
          isModalOpen: false
      };
    
    };

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    
    handleSubmit(values) {
        //console.log('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }
    render(){


    return(
        <div>
            <div>
                <Button outline onClick={this.toggleModal} bsSize="large" >
                    <span className="fa fa-pencil fa-lg"></span> 
                        &nbsp; Submit Comment
                </Button>
            </div>
            <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}><strong>Rating</strong></Label>
                                <Col md={{size: 12}}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={4}><strong>Your Name</strong></Label>
                                <Col md={{size: 12}}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}><strong>Comment</strong></Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
                </div>
            </div>
        );
        }

    }

export default DishDetail;

