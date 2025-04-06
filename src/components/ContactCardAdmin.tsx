/* eslint-disable @next/next/no-img-element */

'use client';

import { Card } from 'react-bootstrap';
import type { Contacts } from '@prisma/client';
import Link from 'next/link';

type Props = {
  contact: Contacts;
};

const ContactCardAdmin = ({ contact }: Props) => (
  <Card className="h-100 shadow-sm">
    <Card.Header className="d-flex align-items-center gap-2">
      <img
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
      <p className="blockquote-footer">{contact.owner}</p>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
