'use client'

import { Col, Container, Row } from "react-bootstrap";
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from "react";

export default function Home() {

  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User>();

  supabase.auth.getUser()
  .then(response => {
    
    if (response.error) {
      console.log(response.error);
      return;
    }

    if (response.data.user) {

      setUser(response.data.user);
    }
  }).catch(error => {
    console.log(error);
  });

  return (
    <Container fluid={true}>
      <Row className="justify-content-center">
          <Col md={10}>
              <div className='top-separator'>
                  <h3>Bienvenido!</h3>
                  <div className='top-separator'></div>
                  <p>{user?.email}</p>
              </div>
          </Col>
      </Row>
    </Container>        
  )
}
