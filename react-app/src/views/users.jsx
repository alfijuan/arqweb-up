import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Layout } from './layout';

export const UserList = () => {

  const [users, setUsers] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    axios.get('http://localhost:4000/users')
    .then(response => {
      setUsers(response.data.users)
    })
  }, [])

  const deleteObject = (id) => {
    if(window.confirm('¿Estas seguro que queres borrar el usuario?')){
      axios.delete(`http://localhost:4000/users/${id}`)
      .then(response => {
        if(response.data.delete){
          setStatus('success')
          setUsers(users.filter(item => item._id !== id))
        } else {
          setStatus('danger')
        }
      })
    }
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            {status !== '' && 
            <Alert variant={status}>
              {status === "danger" ? "Error. Reintente mas tarde" : "El usuario ha sido eliminado"}
            </Alert>}
            <div className="d-flex justify-content-end my-3">
              <Link to="/users/add">
                <Button variant="primary" type="submit">Crear nuevo</Button>
              </Link>
            </div>
            {users ? 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, k) => (
                  <tr key={k}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/users/${user._id}`}><Button variant="outline-success">Editar</Button></Link>{' '}
                      <Button variant="outline-danger" onClick={() => deleteObject(user._id)}>Borrar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>}
            
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const UserABM = ({match}) => {

  const [user, setUser] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  const isNew = match.params.id === "add";

  React.useEffect(() => {
    if(!isNew){
      axios.get(`http://localhost:4000/users/${match.params.id}`)
      .then(response => {
        setUser(response.data.user)
      })
    } else {
      setUser({})
    }
  }, [match])

  const updateValues = (e) => {
    let u = user;
    u[e.currentTarget.name] = e.currentTarget.value;
    setUser({
      ...u
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    if(!isNew){
      axios.put(`http://localhost:4000/users/${match.params.id}`, user)
      .then(response => {
        if(response.data.user){
          setUser(response.data.user)
          setStatus('success');
        } else {
          setStatus('danger');
        }
      })
    } else {
      axios.post(`http://localhost:4000/users`, user)
      .then(response => {
        if(response.data.user){
          const { email, name, password } = response.data.user;
          setUser({
            email,
            name,
            password
          })
          setStatus('success');
        } else {
          setStatus('danger');
        }
      })
    }
  }

  return (
    <Layout>
      <Container className="">
        <Row>
          <Col>
            {status !== '' && 
            <Alert variant={status}>
              {status === "danger" ? "Error. Reintente" : isNew ? "El usuario ha sido agregado" : "El usuario ha sido editado correctamente"}
            </Alert>}
            {user ? 
            <Form className="mt-2" onSubmit={(e) => submitForm(e)}>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre" value={user.name} name="name" onChange={(e) => updateValues(e)}/>
              </Form.Group>
            
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese el email" value={user.email} name="email" onChange={(e) => updateValues(e)} required />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Ingrese la password" value={user.password} name="password" onChange={(e) => updateValues(e)} required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Form>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}