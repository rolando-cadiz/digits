/* eslint-disable react/prop-types */
/* eslint-disable @next/next/no-img-element */

'use client';

import { ListGroup } from 'react-bootstrap';
import { Note } from '@/lib/validationSchemas';

const NoteItem: React.FC<{ note: Note }> = ({ note }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{new Date(note.createdAt).toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
