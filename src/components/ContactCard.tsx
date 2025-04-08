/* eslint-disable @next/next/no-img-element */

'use client';

import { Card, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact, Note } from '@/lib/validationSchemas';
import NoteItem from './NoteItem'; // Ensure the correct path to NoteItem
import AddNoteForm from './AddNoteForm'; // Ensure the correct path to AddNoteForm

const ContactCard = ({ contact, notes }: { contact: Contact, notes: Note[] }) => (
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
        {' '}
        {contact.lastName}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>

    </Card.Body>
    <ListGroup variant="flush">
      {notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </ListGroup>
    <AddNoteForm contact={contact} />
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
