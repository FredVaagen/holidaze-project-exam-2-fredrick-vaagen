import Link from "next/link";
import { parseCookies } from "nookies";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../constants/api";
import CreateEstablishment from "../../components/admin/establishment/CreateEstablishment";
import EnquiryLayout from "../../components/admin/establishment/dashboard/EnquiryAccordion";

const Admin = ({ enquiries, contacts, establishments }) => {
  return (
    <Container fluid className="p-0">
      <Tabs defaultActiveKey="enquiries">
        <Tab eventKey="enquiries" title="Enquiries">
          <Container>
            <h1>Enquiries</h1>
          </Container>
          {enquiries.map((enquiry) => (
            <EnquiryLayout  key={enquiry.id} {...enquiry } />
          ))}
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <Container>
            <h1>Contact messages</h1>
          </Container>
          {contacts.map((contact) => (
            <Container key={contact.id} className="establishment-container">
              <Row className="establishment-specific">
                <Col xs={12} md={9} className="mt-5">
                  <p>
                    Name: {contact.firstname} {contact.lastname}
                  </p>
                  <p>Email: {contact.email}</p>
                  <p>Message: {contact.message}</p>
                </Col>
              </Row>
            </Container>
          ))}
        </Tab>
        <Tab eventKey="createEstablishment" title="Create new establishment">
          <Container className="create-establishment">
            <h2>Create establishment</h2>
            <CreateEstablishment />
          </Container>
        </Tab>
        <Tab eventKey="editEstablishment" title="Edit establishments">
          <Container className="create-establishment">
            <ListGroup>
              <h2>Edit a establishment</h2>
              {establishments.map((establishment) => (
                <Container className="establishment-container"  key={establishment.id}>
                  <Link
                    href="/admin/edit/[name]"
                    as={`/admin/edit/${establishment.name}`}
                  >
                    <ListGroup.Item className="editEstablishment-list-item">
                      {establishment.name}
                    </ListGroup.Item>
                  </Link>
                </Container>
              ))}
            </ListGroup>
          </Container>
        </Tab>
      </Tabs>

      <style global jsx>
        {`
          .main {
            height: auto;
            min-height: 100vh;
          }
          .nav-tabs {
            color: black;
            background: white;
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 5rem;
          }

          .create-establishment {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }

          .create-establishment-button {
            background: none;
            border: none;
          }

          .editEstablishment-list-item {
            transition: 0.3s;
          }

          .editEstablishment-list-item:hover {
            cursor: pointer;
            background: black;
            color: white;
          }
        `}
      </style>
    </Container>
  );
};
export async function getServerSideProps(ctx) {
  const token = parseCookies(ctx).token;
  const [enquiriesRes, contactsRes, establishmentsRes] = await Promise.all([
    fetch(`${BASE_URL}/enquiries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${BASE_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${BASE_URL}/establishments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);
  const [enquiries, contacts, establishments] = await Promise.all([
    enquiriesRes.json(),
    contactsRes.json(),
    establishmentsRes.json(),
  ]);
  return {
    props: { enquiries, contacts, establishments },
  };
}

export default Admin;
