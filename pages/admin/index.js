import Link from "next/link";
import { parseCookies } from "nookies";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../constants/api";
import CreateEstablishment from "../../components/admin/establishment/CreateEstablishment";
import EnquiryAccordion from "../../components/admin/establishment/dashboard/EnquiryAccordion";
import ContactAccordion from "../../components/admin/establishment/dashboard/ContactAccordion";

const Admin = ({ enquiries, contacts, establishments }) => {

 let contactTitle = "Contact Messages" 
 let enquiriesTitle = "Enquiries"

 if (contacts == 0) {
  contactTitle = "No messages"
 }

 if (enquiries == 0) {
  enquiriesTitle = "No enquiries"
 }
 
  return (
    <Container fluid className="p-0">
      <Tabs defaultActiveKey="enquiries">
        <Tab eventKey="enquiries" title="Enquiries">
          <Container>
            <h1>{enquiriesTitle}</h1>
            {enquiries.map((enquiry) => (
              <EnquiryAccordion key={enquiry.id} {...enquiry} />
            ))}
          </Container>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <Container>
            <h1>{contactTitle}</h1>
            {contacts.map((contact) => (
              <ContactAccordion key={contact.id} {...contact} />
            ))}
          </Container>
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
                <Container
                  className="establishment-container"
                  key={establishment.id}>
                  <Link
                    href="/admin/edit/[name]"
                    as={`/admin/edit/${establishment.name}`}>
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
