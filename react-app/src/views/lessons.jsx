import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Layout } from './layout';

export const LessonsList = ({match}) => {

  const [course, setCourse] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    axios.get(`http://localhost:4000/courses/${match.params.id}`)
    .then(response => {
      setCourse(response.data.course)
    })
    .catch(response => {
    })
  }, [match])

  const deleteObject = (id) => {
    if(window.confirm('¿Estas seguro que queres borrar la clase?')){
      // axios.delete(`http://localhost:4000/courses/${match.params.id}/lessons/${id}`)
      axios.delete(`http://localhost:4000/lessons/${id}`)
      .then(response => {
        if(response.data.delete){
          setStatus('success')
          let {lessons} = course;
          lessons = lessons.filter(item => item._id !== id);
          setCourse({
            ...course,
            lessons
          })
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
              {status === "danger" ? "Error. Reintente mas tarde" : "La clase ha sido eliminada"}
            </Alert>}
            <div className="d-flex justify-content-end my-3">
              <Link to={`/courses/${match.params.id}/lessons/add`}>
                <Button variant="primary" type="submit">Agregar clase</Button>
              </Link>
            </div>
            {course && course.lessons ? 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width="70%">Titulo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {course && course.lessons.map((lesson, k) => (
                  <tr key={k}>
                    <td>{lesson.title}</td>
                    <td>
                      <Link to={`/courses/${course._id}/lessons/${lesson._id}/`}><Button variant="outline-success">Editar</Button></Link>{' '}
                      <Button variant="outline-danger" onClick={() => deleteObject(lesson._id)}>Borrar</Button>
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

export const LessonsABM = ({match}) => {

  const [course, setCourse] = React.useState(undefined);
  const [lesson, setLesson] = React.useState(undefined);
  const [status, setStatus] = React.useState("");

  const isNew = match.params.lessonId === "add";

  React.useEffect(() => {
    axios.get(`http://localhost:4000/courses/${match.params.id}`)
    .then(response => {
      setCourse(response.data.course)
    })
    if(!isNew){
      axios.get(`http://localhost:4000/lessons/${match.params.lessonId}`)
      .then(response => {
        setLesson(response.data.lesson)
      })
    } else {
      setLesson({})
    }
  }, [match, isNew])

  const updateValues = (e) => {
    let u = lesson;
    u[e.currentTarget.name] = e.currentTarget.value;
    setLesson({
      ...u
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    if(!isNew){
      axios.put(`http://localhost:4000/lessons/${match.params.lessonId}`, lesson)
      .then(response => {
        if(response.data.lesson){
          setLesson(response.data.lesson);
          setStatus('success');
        } else {
          setStatus('danger');
        }
      })
    } else {
      axios.post(`http://localhost:4000/courses/${match.params.id}/lessons`, lesson)
      .then(response => {
        if(response.data.lesson){
          const { subtitle, title, video_url } = response.data.lesson;
          setLesson({
            subtitle,
            title,
            video_url
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
              {status === "danger" ? "Error. Reintente" : isNew ? "La clase ha sido agregada" : "La clase ha sido editada correctamente"}
            </Alert>}
            {course && lesson ? 
            <Form className="mt-2" onSubmit={(e) => submitForm(e)}>
              <Form.Group controlId="formTitle">
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el titulo" value={lesson.title} name="title" onChange={(e) => updateValues(e)} required />
              </Form.Group>

              <Form.Group controlId="formSubtitle">
                <Form.Label>Subtitulo</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el subtitulo" value={lesson.subtitle} name="subtitle" onChange={(e) => updateValues(e)} />
              </Form.Group>

              <Form.Group controlId="formVideo">
                <Form.Label>Video URL</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la url del video (embedded)" value={lesson.video_url} name="video_url" onChange={(e) => updateValues(e)} />
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