import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";

function Explore() {
  return (
    <Container fluid className="explore">
      <Container>
        <h3 className="h3">Explore activities around the city of Bergen </h3>
        <CardGroup>
          <Card >
            <Card.Img src="/images/activity-1.jpg" />
            <Card.Body>
              <Card.Title>Hiking</Card.Title>
              <Card.Text>
                Hike the beautiful mountains in and around Bergen.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="/images/activity-2.jpg" />
            <Card.Body>
              <Card.Title>City exploring</Card.Title>
              <Card.Text>
                Explore everything the city of Bergen has to offer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="/images/activity-3.jpg" />
            <Card.Body>
              <Card.Title>Museums</Card.Title>
              <Card.Text>
                Bergen has a lot of interesting museums. Make sure to check them
                out while visiting!
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <style global jsx>
          {`
            .explore {
              height: auto;
              background: white;
              display: flex;
              padding-bottom: 3rem;
            }

            .h3 {
              margin-bottom: 1.5rem;
              font-weight: bold;
              margin-top: 3rem;
            }

            .card {
             
              border: none;
              width: 22rem;
              margin-right: 1rem;
              min-width: 18rem;
            }

            .card:hover {
              cursor: pointer;
            }

            .card-title {
              font-weight: bold;
            }

            .card-img {
              border-radius: 10px;
              border: none;
              height: 400px;
            
              
            }
          `}
        </style>
      </Container>
    </Container>
  );
}

export default Explore;
