import { parseCookies  } from 'nookies'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { BASE_URL } from '../../constants/api'
import Link from "next/link";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AddCircle } from '@material-ui/icons'

const Admin = ({enquiries, contacts}) => {
	return (
		<Container fluid className="p-0">
			<Tabs defaultActiveKey="enquiries" >
				<Tab eventKey="enquiries" title="Enquiries">
					<Container>	<h1>Enquiries</h1></Container>
					{enquiries.map(enquiry => ( 
						<Container key={enquiry.id} className="establishment-container" >	
							<Row className="establishment-specific">
								<Col xs={12} md={9} className="mt-5">
									<p>Name: {enquiry.firstname} {enquiry.lastname}</p>
									<p>Establishment: {enquiry.establishmentName}</p>
									<p>Email: {enquiry.email}</p>
									<p>Check in: {enquiry.startDate}</p>
									<p>Check out: {enquiry.endDate}</p>
								</Col>
							</Row>
					</Container>
					))}
				</Tab>
				<Tab eventKey="contact" title="Contact">
				<Container>	<h1>Contact messages</h1></Container>
					{contacts.map(contact => (
						<Container key={contact.id} className="establishment-container" >
						<Row className="establishment-specific">
							<Col xs={12} md={9} className="mt-5">
								<p>Name: {contact.firstname} {contact.lastname}</p>
								<p>Email: {contact.email}</p>
								<p>Message: {contact.message}</p>
							</Col>
						</Row>
				</Container>
					))}	
				</Tab>				
				<Tab eventKey="createEstablishment" title="Create new establishment">
					<Container className="create-establishment">
						<Row><Col><h2>Create establishment</h2></Col></Row>
						<Link href="/admin/createEstablishment"><button className="create-establishment-button"><AddCircleIcon /></button></Link>
					</Container>
				</Tab>
				<Tab eventKey="editEstablishment" title="Edit establishments">
				<Container className="create-establishment">
						<Row><Col><h2>Edit a establishment</h2></Col></Row>
						<Link  href="/admin/editEstablishments"><button className="create-establishment-button"><AddCircleIcon /></button></Link>
					</Container>
	
				</Tab>
			</Tabs>
			<style global jsx >
			{`
				.main {
					height: auto;
					min-height: 100vh;
				}	
				.nav-tabs {
					color: white; 
					background: black;
					display: flex;
					justify-content: space-evenly;
					margin-bottom: 5rem;
				}

				.create-establishment{
					display: flex;
					flex-direction: column;
					justify-content: center;
					text-align: center;
				}

				.create-establishment-button {
					background: none;
					border: none;
				}

				.MuiSvgIcon-root {
					font-size: 10rem !important;
					transisition: .3s;
				}

				.MuiSvgIcon-root:hover {
					transform: scale(1.1);
				}
				
			`}
		</style>
		</Container>
	);
  };
  export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).token
    const [enquiriesRes, contactsRes, establishmentsRes] = await Promise.all([
		fetch(`${BASE_URL}/enquiries`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}),
		fetch(`${BASE_URL}/contacts`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}),
		fetch(`${BASE_URL}/establishments`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	]);
    	const [enquiries, contacts, establishments] = await  Promise.all ([
			enquiriesRes.json(),
			contactsRes.json(),
			establishmentsRes.json()
		]);		
	return { props: { enquiries, contacts, establishments } };
}

export default Admin;



