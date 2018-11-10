import React from 'react';
import { Media } from 'reactstrap';

    function RenderLeader({leader}) {
        return(
                <Media tag="li">
                  <Media left middle>
                      <Media object src={leader.image} alt={leader.name} />
                  </Media>
                  <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                        <p>{leader.designation}</p>
                        <p>{leader.description}</p>
                  </Media>
                </Media>
    );
    }
   const Leader = (props) => {

        const leader = props.leaders.map((leader) => {
            return (
                    <RenderLeader leader={leader}  />

            );
        });

        return (
            <div className="container">
                <div className="row">
                    {leader}
                </div>
            </div>
        );
    }

export default Leader;