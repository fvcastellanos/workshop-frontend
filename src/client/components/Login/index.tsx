'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Alert from '../Alert'
import { ErrorView } from '@/client/domain/ErrorView'
import { UserService } from '@/services/UserService'

export default function Login() {

  const [error, setError] = useState(new ErrorView(false, ''));

  const router = useRouter()
  const supabase = createClientComponentClient()

  const userRef = useRef<HTMLInputElement | null>();
  const passwordRef = useRef<HTMLInputElement | null>();

  const userService = new UserService();

  const handleSignIn = () => {

    setError(new ErrorView(false, ''));

    const email = userRef.current?.value? userRef.current?.value : '';
    const password = passwordRef.current?.value? passwordRef.current?.value : '';

    userService.login(email, password)
        .then(() => {

            router.refresh();
        
        }).catch(error => {
                
            const message = error.message ? error.message : 'Error desconocido';
            setError(new ErrorView(true, message));
        });
  }

  return (

    <Container fluid>
        <Row className="justify-content-md-center">
            <Col md={6}>
                <div style={{marginTop: '2em'}} data-testid="login-component">
                    <Card>
                        <Card.Header>Iniciar sesión</Card.Header>
                        <Card.Body>
                            <Row className='justify-content-center top-separator'>

                                <Col md={10}>
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Usuario" ref={userRef} />                                    
                                </Col>
                                <Col md={10}>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña" ref={passwordRef} />                                    
                                </Col>
                            </Row>
                            <Alert show={error.show} message={error.message} variant='danger' />
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" onClick={handleSignIn}>Iniciar sesión</Button>
                        </Card.Footer>
                    </Card>                    
                </div>
            </Col>
        </Row>
    </Container>         
  );
}
