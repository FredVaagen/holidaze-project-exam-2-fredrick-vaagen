import Link from "next/link";
import { parseCookies } from "nookies";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import EditIcon from '@material-ui/icons/Edit';
import { BASE_URL } from "../../constants/api";
import CreateEstablishment from "../../components/admin/establishment/CreateEstablishment";
import EnquiryAccordion from "../../components/admin/establishment/dashboard/EnquiryAccordion";
import ContactAccordion from "../../components/admin/establishment/dashboard/ContactAccordion";

const Admin = ({ enquiries, contacts, establishments,enquiriesCount, contactMessageCount }) => {
  let contactTitle = "Contact Messages";
  let enquiriesTitle = "Enquiries";

  if (contacts == 0) {
    contactTitle = "No messages";
  }

  if (enquiries == 0) {
    enquiriesTitle = "No enquiries";
  }


  const enquiryTabTitle = "Enquiries" + " " + "[" + " " + enquiriesCount + " " + "]";
  const contactTabTitle = "Contact messsages" + " " + "[" + " " + contactMessageCount + " " + "]";

  return (
    <Container fluid className="p-0">
      <Tabs defaultActiveKey="enquiries">
        <Tab eventKey="enquiries" title={enquiryTabTitle}>
          <Container>
            <h1>{enquiriesTitle}</h1>
            {enquiries.map((enquiry) => (
              <EnquiryAccordion key={enquiry.id} {...enquiry} />
            ))}
          </Container>
        </Tab>
        <Tab eventKey="contact" title={contactTabTitle}>
          <Container>
            <h1>{contactTitle}</h1>
            {contacts.map((contact) => (
              <ContactAccordion key={contact.id} {...contact} />
            ))}
          </Container>
        </Tab>
        <Tab eventKey="createEstablishment" title="Create new establishment">
          <Container>
            <h2>Create establishment</h2>
            <CreateEstablishment />
          </Container>
        </Tab>
        <Tab eventKey="editEstablishment" title="Edit establishments">
          <Container className="create-establishment">
            <ListGroup>
              <Container>
                <h2>Edit a establishment</h2>
              </Container>
              {establishments.map((establishment) => (
                <Container
                  key={establishment.id}>
                  <Link
                    href="/admin/edit/[name]"
                    as={`/admin/edit/${establishment.name}`}>
                    <ListGroup.Item className="editEstablishment-list-item">
                      {establishment.name} <EditIcon />
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
          .editEstablishment-list-item {
            transition: 1s;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
          }

   
          .editEstablishment-list-item:hover {
            cursor: pointer;
            transform: scale(1.01);
          }
        `}
      </style>
    </Container>
  );
};
export async function getServerSideProps(ctx) {
  const token = parseCookies(ctx).token;
  const [enquiriesRes, contactsRes, establishmentsRes, enquiriesResCount, contactMessageResCount] = await Promise.all([
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
    fetch(`${BASE_URL}/enquiries/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${BASE_URL}/contacts/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);
  const [enquiries, contacts, establishments, enquiriesCount, contactMessageCount] = await Promise.all([
    enquiriesRes.json(),
    contactsRes.json(),
    establishmentsRes.json(),
    enquiriesResCount.json(),
    contactMessageResCount.json(),
  ]);
  return {
    props: { enquiries, contacts, establishments,enquiriesCount,contactMessageCount },
  };
}

export default Admin;
