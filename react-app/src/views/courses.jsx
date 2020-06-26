import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Layout } from './layout';

export const CoursesList = () => {

  const [courses, setCourses] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    axios.get('http://localhost:4000/courses')
    .then(response => {
      setCourses(response.data.courses)
    })
  }, [])

  const deleteObject = (id) => {
    if(window.confirm('¿Estas seguro que queres borrar el curso?')){
      axios.delete(`http://localhost:4000/courses/${id}`)
      .then(response => {
        if(response.data.delete){
          setStatus('success')
          setCourses(courses.filter(item => item._id !== id))
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
              {status === "danger" ? "Error. Reintente mas tarde" : "El curso ha sido eliminado"}
            </Alert>}
            <div className="d-flex justify-content-end my-3">
              <Link to="/courses/add">
                <Button variant="primary" type="submit">Crear nuevo</Button>
              </Link>
            </div>
            {courses ? 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th width={'30%'}>Titulo</th>
                  <th>Cantidad clases</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, k) => (
                  <tr key={k}>
                    <td>{course._id}</td>
                    <td>{course.title}</td>
                    <td>{course.lessons.length}</td>
                    <td>
                      <Link to={`/courses/${course._id}`}><Button variant="outline-success">Editar</Button></Link>{' '}
                      <Button variant="outline-danger" onClick={() => deleteObject(course._id)}>Borrar</Button>{' '}
                      <Link to={`/courses/${course._id}/lessons`}><Button variant="outline-primary">Ver clases</Button></Link>{' '}
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

export const CoursesABM = ({match}) => {

  const [course, setCourse] = React.useState(undefined);
  const [categories, setCategories] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  const isNew = match.params.id === "add";

  React.useEffect(() => {
    axios.get('http://localhost:4000/categories')
    .then(response => {
      setCategories(response.data.categories)
    })
    if(!isNew){
      axios.get(`http://localhost:4000/courses/${match.params.id}`)
      .then(response => {
        setCourse(response.data.course)
      })
    } else {
      setCourse({})
    }
  }, [match, isNew])

  const updateValues = (e) => {
    let u = course;
    if(e.currentTarget.name === "categories"){
      u['categories'] = [...e.currentTarget.options].filter(({selected}) => selected).map(({value}) => value)
    } else {
      u[e.currentTarget.name] = e.currentTarget.value;
    }
    setCourse({
      ...u
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    if(!isNew){
      axios.put(`http://localhost:4000/courses/${match.params.id}`, course)
      .then(response => {
        if(response.data.course){
          setCourse(response.data.course)
          setStatus('success');
        } else {
          setStatus('danger');
        }
      })
    } else {
      axios.post(`http://localhost:4000/courses`, course)
      .then(response => {
        if(response.data.course){
          const { email, name, password } = response.data.course;
          setCourse({
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
            <div className="mt-4"></div>
            {status !== '' && 
            <Alert variant={status}>
              {status === "danger" ? "Error. Reintente" : isNew ? "El curso ha sido agregado" : "El curso ha sido editado correctamente"}
            </Alert>}
            {course ? 
            <Form className="mt-2" onSubmit={(e) => submitForm(e)}>
              <Form.Group controlId="formTitle">
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el titulo" value={course.title} name="title" onChange={(e) => updateValues(e)} required />
              </Form.Group>

              <Form.Group controlId="formSubtitle">
                <Form.Label>Subtitulo</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el subtitulo" value={course.subtitle} name="subtitle" onChange={(e) => updateValues(e)} />
              </Form.Group>

              <Form.Group controlId="formSubtitle">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Ingrese la descripcion" value={course.description} name="description" onChange={(e) => updateValues(e)} />
              </Form.Group>

              <Form.Check 
                type={'checkbox'}
                id={`newLabelCourse`}
                label={`¿Es nuevo?`}
                name="new"
                className="mb-3"
                onChange={(e) => setCourse({...course, new: !course.new})}
                checked={course.new}
              />

              {categories && <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Categorias</Form.Label>
                <Form.Control as="select" name="categories" multiple onChange={(e) => updateValues(e)}>
                  {categories.map((item, k) => <option value={item._id} key={k} selected={course.categories && course.categories.includes(item._id)}>{item.title}</option>)}
                </Form.Control>
              </Form.Group>}

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