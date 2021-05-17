import Link from "next/link";
import Head from "next/head";
import { parseCookies } from "nookies";
// LAYOUT
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// ICONS
import EditIcon from "@material-ui/icons/Edit";
// MY COMPONENTS
import { BASE_URL } from "../constants/api";
import CreateEstablishment from "../components/admin/establishment/CreateEstablishment";
import EnquiryMessages from "../components/admin/dashboard/EnquiryMessages";
import ContactMessages from "../components/admin/dashboard/ContactMessages";
import Sidebar from "../components/admin/dashboard/Sidebar";

const Admin = ({
  enquiries,
  contacts,
  establishments,
  enquiriesCount,
  contactMessageCount,
}) => {
  //title of contact message -> 
  let contactTitle = "Contact Messages";
  //title of enquiries -> 
  let enquiriesTitle = "Enquiries";

  //if there are no contact messages -> 
  if (contacts == 0) {
    contactTitle = "No messages";
  }
 //if there are no enquiries -> 
  if (enquiries == 0) {
    enquiriesTitle = "No enquiries";
  }

  return (
    <Container fluid className="p-0">
      <Head>
        <title>Holidaze - Admin Dashboard</title>
      </Head>
      <Tab.Container defaultActiveKey="first">
        <Row className="p-0 m-0">
          <Sidebar {...{ enquiriesCount, contactMessageCount }} />
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Container className="mt-5">
                  <h2>{enquiriesTitle}</h2>
                  {enquiries.map((enquiry) => (
                    <EnquiryMessages key={enquiry.id} {...enquiry} />
                  ))}
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Container className="mt-5">
                  <h2>{contactTitle}</h2>
                  {contacts.map((contact) => (
                    <ContactMessages key={contact.id} {...contact} />
                  ))}
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Container className="mt-5">
                  <h2>Create establishment</h2>
                  <CreateEstablishment {...establishments} />
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <Container className="create-establishment mt-5">
                  <ListGroup className="mb-5">
                    <h2>Edit a establishment</h2>
                    {establishments.map((establishment) => (
                      <Container className="mt-3" key={establishment.id}>
                        <Link
                          href="/admin/edit/[name]"
                          as={`/admin/edit/${establishment.name}`}>
                          <ListGroup.Item className="edit-list-item">
                            {establishment.name} <EditIcon />
                          </ListGroup.Item>
                        </Link>
                      </Container>
                    ))}
                  </ListGroup>
                </Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <style global jsx>
        {`
          .main {
            height: auto;
            min-height: 100vh;
          }
          .edit-list-item {
            transition: 1s;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
          }

          .edit-list-item:hover {
            cursor: pointer;
            transform: scale(1.01);
          }
        `}
      </style>
    </Container>
  );
};
//Fetch all the admin data -> 
export async function getServerSideProps(ctx) {
  //Needs valid token to get data -> 
  const token = parseCookies(ctx).token;
  const [
    enquiriesRes,
    contactsRes,
    establishmentsRes,
    enquiriesResCount,
    contactMessageResCount,
    //Fetch all the data -> 
  ] = await Promise.all([
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
    fetch(`${BASE_URL}/establishments?_sort=name:asc`, {
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
  const [
    enquiries,
    contacts,
    establishments,
    enquiriesCount,
    contactMessageCount,
  ] = await Promise.all([
    enquiriesRes.json(),
    contactsRes.json(),
    establishmentsRes.json(),
    enquiriesResCount.json(),
    contactMessageResCount.json(),
  ]);
  return {
    props: {
      enquiries,
      contacts,
      establishments,
      enquiriesCount,
      contactMessageCount,
    },
  };
}

export default Admin;
