'use client';

import { Card } from 'react-bootstrap';
import Image from 'next/image';
import { Contact } from '@/lib/validationSchemas';

type Props = {
  contact: Contact;
};

const ContactCard = ({ contact }: Props) => (
  <Card className="h-100 shadow-sm">
    <Card.Header className="d-flex align-items-center gap-2">
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
        height={75}
        style={{ borderRadius: '50%' }}
      />
      <Card.Title className="mb-0">
        {contact.firstName}
        {contact.lastName}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCard;
