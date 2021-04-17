import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import { BASE_URL } from './../../constants/api';
import Image from 'next/image'

export default function EstablishmentsPage({establishments}) {
    return (
		<div className="establishments">
			{establishments.map(establishment => (	
				<Link href="/establishments/[name]" as={`/establishments/${establishment.name}`} key={establishment.id}>
					<Container className="establishment-container" >
						<Row className="establishment-specific">
							<Col xs={12} md={3}>
								<Image src={establishment.promoteImage.url} width="auto" height="auto" />
							</Col>	
							<Col  xs={12} md={9}>
								<h3>{ establishment.name }</h3>
								<p>{establishment.description}</p>
								<p className="price">NOK {establishment.price},- per night </p>

							</Col>
						</Row>
					</Container>
                </Link>
            ))}	

			<style global jsx>
				
				{`
					.establishment-container {
						margin-top: 5rem;
						transition: .5s;
						margin-bottom: 100px;
						border-radius: 50px;
					}
	    
	    				.main {
	    					height: 100vh;

	    				}

					.establishment-container:hover  {
						transform: scale(1.01);
						cursor: pointer;
						background: #fafafa;
					}

					.establishment-specific {
						padding-top: 30px;
					}

					h3 {
						font-weight: bold;
						margin-bottom: 20px;
						font-size: 20px;
					}

					p {
						font-size: 14px;
					}

					.price {
						text-align: right;
						font-weight: bold;
					}

					img {
						border-radius: 10px;
					}
        	`}
			</style>
		</div>
    )
}

export async function getStaticProps() {
	const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
	const resPrice = await fetch(`${BASE_URL}/establishments?_sort=price:asc`);
	const establishments = await res.json();
	return {
	  props: { establishments },
		revalidate: 1,
	};
  }