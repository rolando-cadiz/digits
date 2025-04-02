import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';
import Image from 'next/image';
// import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

// Removed redundant Contact type definition as it is already imported.

const contacts: Contact[] = [
  {
    firstName: 'Philip',
    lastName: 'Johnson',
    address: 'POST 307, University of Hawaii',
    image: 'https://github.com/philipmjohnson.png',
    description:
      'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director '
      + 'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
  {
    firstName: 'Henri',
    lastName: 'Casanova',
    address: 'POST 307, University of Hawaii',
    image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
    description:
      'I am originally from France. I maintain a list of reports from my surf sessions. I have proof '
      + 'that I ran the Hana relay with an actual Team.',
  },
  {
    firstName: 'Kim',
    lastName: 'Binsted',
    address: 'POST 307, University of Hawaii',
    image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
    description:
      'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence '
      + 'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of '
    + 'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as '
    + '"What do you call a Martian who drinks beer? An ale-ien!".'
    + '',
  },
];

/** Render a list of contacts for the logged in user. */
const ListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      <Container id="list" fluid className="py-3" style={{ backgroundColor: '#111', minHeight: '100vh' }}>
        <Row>
          <Col>
            <h1 style={{ color: 'white' }}>List Contacts</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`${contact.firstName}-${contact.lastName}`}>
                  <div
                    style={{
                      backgroundColor: '#333',
                      color: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                    }}
                  >
                    <Image
                      src={contact.image}
                      alt={`${contact.firstName} ${contact.lastName}`}
                      width={300}
                      height={300}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                      }}
                      priority
                    />
                    <h2>
                      {contact.firstName}
                      {contact.lastName}
                    </h2>
                    <p>{contact.address}</p>
                    <p>{contact.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
