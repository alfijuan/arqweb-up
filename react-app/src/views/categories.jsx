import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Layout } from './layout';

export const CategoriesList = () => {

  const [categories, setCategories] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    axios.get('http://localhost:4000/categories')
    .then(response => {
      setCategories(response.data.categories)
    })
  }, [])

  const deleteObject = (id) => {
    if(window.confirm('¿Estas seguro que queres borrar la categoria?')){
      axios.delete(`http://localhost:4000/categories/${id}`)
      .then(response => {
        if(response.data.delete){
          setStatus('success')
          setCategories(categories.filter(item => item._id !== id))
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
              {status === "danger" ? "Error. Reintente mas tarde" : "La categoria ha sido eliminada"}
            </Alert>}
            <div className="d-flex justify-content-end my-3">
              <Link to="/categories/add">
                <Button variant="primary" type="submit">Crear nueva</Button>
              </Link>
            </div>
            {categories ? 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, k) => (
                  <tr key={k}>
                    <td>{category.title}</td>
                    <td>
                      <Link to={`/categories/${category._id}`}><Button variant="outline-success">Editar</Button></Link>{' '}
                      <Button variant="outline-danger" onClick={() => deleteObject(category._id)}>Borrar</Button>
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

export const CategoriesABM = ({match}) => {

  const [category, setCategory] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  const isNew = match.params.id === "add";

  React.useEffect(() => {
    if(!isNew){
      axios.get(`http://localhost:4000/categories/${match.params.id}`)
      .then(response => {
        setCategory(response.data.category)
      })
      .catch(response => {
        console.log('error here')
      })
    } else {
      setCategory({})
    }
  }, [match, isNew])

  const updateValues = (e) => {
    let u = category;
    u[e.currentTarget.name] = e.currentTarget.value;
    setCategory({
      ...u
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    if(!isNew){
      axios.put(`http://localhost:4000/categories/${match.params.id}`, category)
      .then(response => {
        if(response.data.category){
          setCategory(response.data.category)
          setStatus('success');
        } else {
          setStatus('danger');
        }
      })
    } else {
      axios.post(`http://localhost:4000/categories`, category)
      .then(response => {
        if(response.data.category){
          const { email, name, password } = response.data.category;
          setCategory({
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
              {status === "danger" ? "Error. Reintente" : isNew ? "La categoria ha sido agregada" : "La categoria ha sido editada correctamente"}
            </Alert>}
            {category ? 
            <Form className="mt-2" onSubmit={(e) => submitForm(e)}>
              <Form.Group controlId="formTitle">
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el titulo" value={category.title} name="title" onChange={(e) => updateValues(e)} required />
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