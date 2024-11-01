import { useState, FormEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getAllEditorials,
  getAllTypes,
  newText,
  TextDTO,
  EditorialAPIObject,
  TextTypeAPIObject,
  newUser,
} from "../api/api";

import {
  Modal,
  Container,
  Form,
  Spinner,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";

function MyDropdown({ data, selected, setSelected }: any) {
  return (
    <DropdownButton variant="outline-secondary" title={selected}>
      {data.map((option: string) => (
        <Dropdown.Item key={option} onClick={() => setSelected(option)}>
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

function EditorialDropdown({ selected, setSelected }: any) {
  const {
    isLoading,
    isError,
    data: editorials,
  } = useQuery<EditorialAPIObject[], Error>({
    queryKey: ["getAllEditorials"],
    queryFn: getAllEditorials,
  });

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );

  if (isError) return "Error al cargar.";

  const elements = editorials?.map((e) => e.name);

  return (
    <MyDropdown
      data={elements}
      selected={selected}
      setSelected={setSelected}
    ></MyDropdown>
  );
}

function TypesDropdown({ selected, setSelected }: any) {
  const {
    isLoading,
    isError,
    data: types,
  } = useQuery<TextTypeAPIObject[], Error>({
    queryKey: ["getAllTypes"],
    queryFn: getAllTypes,
  });

  if (isLoading) return "Cargando...";

  if (isError) return "Error al cargar";

  const elements = types?.map((e) => e.typename);

  return (
    <MyDropdown
      data={elements}
      selected={selected}
      setSelected={setSelected}
    ></MyDropdown>
  );
}

export function NewTextForm({ setShow }: any) {
  const [title, setTitle] = useState("");
  const [editorialName, setEditorialName] = useState("");
  const [textType, setTextType] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date());
  const [numPages, setPages] = useState(0);
  const [edition, setEdition] = useState(0);
  const [volume, setVolume] = useState(0);

  const mutation = useMutation({
    mutationFn: newText,
    onSuccess: () => {
      //useQueryClient().invalidateQueries("getAllTexts");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requestBody: TextDTO = {
      title,
      editorialName,
      publicationDate,
      textType,
      edition,
      volume,
      numPages,
    };
    setShow(false);
    mutation.mutate(requestBody as TextDTO);
  };

  return (
    <>
      <Container fluid>
        <Form>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Título </Form.Label>
            <Form.Control
              placeholder="Escribe el título del libro"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Fecha de Publicación</Form.Label>
            <Form.Control
              onChange={(e) => setPublicationDate(new Date(e.target.value))}
              type="date"
            ></Form.Control>
          </Form.Group>

          <Container className="d-flex justify-content-between px-0">
            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label> Cantidad de Páginas</Form.Label>
              <Form.Control
                onChange={(e) => setPages(parseInt(e.target.value))}
                type="number"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label> Edición</Form.Label>
              <Form.Control
                onChange={(e) => setEdition(parseInt(e.target.value))}
                type="number"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label>Volumen</Form.Label>
              <Form.Control
                onChange={(e) => setVolume(parseInt(e.target.value))}
                type="number"
              ></Form.Control>
            </Form.Group>
          </Container>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex justify-content-between">
              <Form.Label>Editorial</Form.Label>
              <EditorialDropdown
                selected={editorialName}
                setSelected={setEditorialName}
              ></EditorialDropdown>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex justify-content-between">
              <Form.Label>Tipo de Texto</Form.Label>
              <TypesDropdown
                selected={textType}
                setSelected={setTextType}
              ></TypesDropdown>
            </div>
          </Form.Group>
          <Button
            onClick={(e) => handleSubmit(e)}
            variant="primary"
            type="submit"
          >
            Crear texto
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function NewTextModal({ show, setShow }: any) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir nuevo texto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewTextForm show={show} setShow={setShow}></NewTextForm>
      </Modal.Body>
    </Modal>
  );
}

export function NewUserForm({ setShow }: any) {
  let [document, setDocument] = useState("");
  let [psk, setPsk] = useState("");
  let [name, setName] = useState("");
  let [plastname, setPlastname] = useState("");
  let [mlastname, setMlastname] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");

  const mutation = useMutation({
    mutationFn: newUser,
    onSuccess: () => {
      //useQueryClient().invalidateQueries("getAllTexts");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requestBody: any = {
      document,
      documentTypeId: 1,
      roleId: 1,
      psk,
      name,
      plastname,
      mlastname,
      phoneNumber,
      genderId: 1,
    };
    setShow(false);
    console.log(requestBody);
    mutation.mutate(requestBody);
  };

  return (
    <>
      <Container fluid>
        <Form>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> DNI </Form.Label>
            <Form.Control
              placeholder="DNI"
              onChange={(e) => setDocument(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Nombre </Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Apellido Paterno </Form.Label>
            <Form.Control
              onChange={(e) => setPlastname(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Apellido Materno </Form.Label>
            <Form.Control
              onChange={(e) => setMlastname(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Número de Celular </Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Contraseña </Form.Label>
            <Form.Control
              onChange={(e) => setPsk(e.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Button
            onClick={(e) => handleSubmit(e)}
            variant="primary"
            type="submit"
          >
            Crear texto
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function NewUserModal({ show, setShow }: any) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir nuevo texto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewUserForm show={show} setShow={setShow}></NewUserForm>
      </Modal.Body>
    </Modal>
  );
}
