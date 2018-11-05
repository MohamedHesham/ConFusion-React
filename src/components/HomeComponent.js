import React from 'react';
import {Loading} from './LoadingComponent';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({item, isLoading, errMess})
{
    if(isLoading)
    {
        return(
            <Loading/>
        );
    }
    else if(errMess)
    {
        return(
            <h4>{errMess}</h4>
        );
    }
    else if (item != null)
    {
        return(
            <Card>
                <CardImg src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {/* If item.designation is not null do fist, if not do second. */}
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else
    {
        return(
            <div></div>
        )
    }
}

function Home(props)
{
    return(
        <div className="container">
            <div className="row align-items-start">
                 <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                        />
                 </div>
                 <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}/>
                 </div>
                 <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}/>
                 </div>
            </div>
        </div>
    );
}

export default Home;