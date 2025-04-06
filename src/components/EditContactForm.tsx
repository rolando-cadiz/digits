'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Contacts } from '@prisma/client';
import { EditContactSchema } from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

const onSubmit = async (data: Contacts) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editContact(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditContactForm = ({ contact }: { contact: Contacts }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contacts>({
    resolver: yupResolver(EditContactSchema),
  });
  // console.log(stuff);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2 style={{ color: 'white' }}>Edit Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <input
                    type="text"
                    {...register('address')}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.address?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} defaultValue={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
