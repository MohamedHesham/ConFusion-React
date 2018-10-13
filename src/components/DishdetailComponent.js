import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function RenderDish({dish}) {
        if(dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        } else {
            return (
                <div></div>
            );
        }
}

function RenderComments({dish}) {
        const options = {year: 'numeric', month: 'short', day: 'numeric'};
        if(dish != null) {
            const comments = dish.comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <ul className="list-unstyled">
                            <li className="media">
                                <div className="media-body">
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', options)}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
}

const DishDetail = (props) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 m-1">
                        <RenderDish dish={ props.dish } />
                    </div>
                    <div className="col-sm-12 col-md-5 m-1">
                        <RenderComments dish={props.dish} />                    </div>
                </div>
            </div>
        );
}

export default DishDetail;