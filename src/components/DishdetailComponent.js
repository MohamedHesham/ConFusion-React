import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishdetailComponent extends Component {
    renderComments(dish) {
        if (dish != null) {
            let comments = dish.comments.map( comment => {

                return (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>{`-- ${comment.author}, ${comment.date}`}</p>
                    </div>
                );
            })
            return comments;
        } else {
            return (<div></div>);
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardTitle>Comments</CardTitle>
                            {this.renderComments(this.props.dish)}
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishdetailComponent;