'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import { Contacts } from '@prisma/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  contactId: number;
  note: string;
  owner: string;

}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addNote(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddNoteForm = ({ contact }: { contact: Contacts }) => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2 style={{ color: 'white' }}>Add Note</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Add Note</Form.Label>
                  <input
                    type="text"
                    {...register('note')}
                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.note?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <input type="hidden" {...register('contactId')} value={contact.id} />
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNoteForm;
