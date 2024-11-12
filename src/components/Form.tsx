import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Spinner,
  Alert,
  DropdownButton,
  Form,
  Container,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import { FormEvent } from "react";

import MultiSelectWithAutocomplete from "./MultiSelectInput";

import {
  TextDTO,
  AuthorAPIObject,
  TextTypeAPIObject,
  EditorialAPIObject,
  AuthorDTO,
} from "../api/types";
import {
  getAllTypes,
  getAllEditorials,
  getAllAuthors,
  newText,
  newUser,
  newAuthor,
} from "../api/api";

type CustomDropdownProps<T> = {
  qKey: string[];
  qFn: () => Promise<T[]>;
  getOptionLabel: any;
  setSelectedItem: any;
  mapSelectedValue: (e: any) => string | number;
};

function CustomDropdown<T>({
  qKey,
  qFn,
  getOptionLabel,
  setSelectedItem,
  mapSelectedValue,
}: CustomDropdownProps<T>) {
  const {
    isLoading,
    isError,
    data: data,
  } = useQuery<T[], Error>({
    queryKey: qKey,
    queryFn: qFn,
  });

  const [dropdownTitle, setDropdownTitle] = useState("Seleccione una opción");

  if (isLoading) return <Spinner animation="border" role="status" />;

  if (isError) return <Alert variant="danger">No se pudo cargar.</Alert>;

  return (
    <DropdownButton variant="outline-secondary" title={dropdownTitle}>
      {data?.map((e: any) => (
        <Dropdown.Item
          key={getOptionLabel(e)}
          onClick={() => {
            setSelectedItem(mapSelectedValue(e));
            setDropdownTitle(getOptionLabel(e));
          }}
        >
          {getOptionLabel(e)}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export function NewTextForm({ show, setShow, reload, setReload }: any) {
  const [title, setTitle] = useState("");
  const [editorialId, setEditorialId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [publicationDate, setPublicationDate] = useState(new Date());
  const [numPages, setPages] = useState(0);
  const [edition, setEdition] = useState(0);
  const [volume, setVolume] = useState(0);
  const [authors, setAuthors] = useState<number[]>([]);

  const mutation = useMutation({
    mutationFn: newText,
    onSuccess: () => {
      setReload(true);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requestBody: TextDTO = {
      title,
      editorialId,
      publicationDate,
      typeId,
      edition,
      volume,
      numPages,
      authors,
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
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Fecha de Publicación</Form.Label>
            <Form.Control
              onChange={(e) => setPublicationDate(new Date(e.target.value))}
              type="date"
              required
            ></Form.Control>
          </Form.Group>

          <Container className="d-flex justify-content-between px-0">
            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label> Cantidad de Páginas</Form.Label>
              <Form.Control
                onChange={(e) => setPages(parseInt(e.target.value))}
                type="number"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label> Edición</Form.Label>
              <Form.Control
                onChange={(e) => setEdition(parseInt(e.target.value))}
                type="number"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label>Volumen</Form.Label>
              <Form.Control
                onChange={(e) => setVolume(parseInt(e.target.value))}
                type="number"
                required
              ></Form.Control>
            </Form.Group>
          </Container>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex justify-content-between">
              <Form.Label>Editorial</Form.Label>
              <CustomDropdown
                qKey={["getAllEditorials"]}
                qFn={getAllEditorials}
                getOptionLabel={(e: EditorialAPIObject) => e.name}
                setSelectedItem={setEditorialId}
                mapSelectedValue={(e: EditorialAPIObject) => e.id}
              ></CustomDropdown>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex justify-content-between">
              <Form.Label>Tipo de Texto</Form.Label>
              <CustomDropdown
                qKey={["getAllTypes"]}
                qFn={getAllTypes}
                getOptionLabel={(e: TextTypeAPIObject) => e.typename}
                setSelectedItem={setTypeId}
                mapSelectedValue={(e: TextTypeAPIObject) => e.typeId}
              ></CustomDropdown>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex justify-content-between">
              <Form.Label>Seleccionar Autores</Form.Label>
              <MultiSelectWithAutocomplete
                qKey={["getAllAuthors"]}
                qFn={getAllAuthors}
                getOptionLabel={(e: AuthorAPIObject) =>
                  `${e.name} ${e.plastName} ${e.mlastName}`
                }
                getOptionValue={(e: AuthorAPIObject) => e.id}
                setSelected={setAuthors}
              ></MultiSelectWithAutocomplete>
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
          <Form.Group className="mb-3" controlId="formDni">
            <Form.Label> DNI </Form.Label>
            <Form.Control
              placeholder="DNI"
              onChange={(e) => setDocument(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label> Nombre </Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Apellido Paterno </Form.Label>
            <Form.Control
              onChange={(e) => setPlastname(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Apellido Materno </Form.Label>
            <Form.Control
              onChange={(e) => setMlastname(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Número de Celular </Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label> Contraseña </Form.Label>
            <Form.Control
              onChange={(e) => setPsk(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Button
            onClick={(e) => handleSubmit(e)}
            variant="primary"
            type="submit"
          >
            Registrar Usuario
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function NewCustomerForm() {
  return <h1>Clientes!</h1>;
}

export function NewAuthorForm({ show, setShow, reload, setReload }: any) {
  const [name, setName] = useState("");
  const [plastName, setPlastName] = useState("");
  const [mlastName, setMlastName] = useState("");

  const mutation = useMutation({
    mutationFn: newAuthor,
    onSuccess: () => {
      setReload(true);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requestBody: AuthorDTO = {
      name,
      plastName,
      mlastName
    };
    setShow(false);
    mutation.mutate(requestBody as AuthorDTO);
  };

  return (
    <>
      <Container fluid>
        <Form>
          <Form.Group className="mb-3" controlId="formNameAuthor">
            <Form.Label> Nombre del autor </Form.Label>
            <Form.Control
              placeholder="Escribe el nombre del autor"
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlastName">
            <Form.Label> Apellido Paterno del autor </Form.Label>
            <Form.Control
              placeholder="Escribe el apellido paterno del autor"
              onChange={(e) => setPlastName(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMlastName">
            <Form.Label> Apellido Materno del autor </Form.Label>
            <Form.Control
              placeholder="Escribe el apellido materno del autor"
              onChange={(e) => setMlastName(e.target.value)}
              type="text"
              required
            ></Form.Control>
          </Form.Group>

          <Button
            onClick={(e) => handleSubmit(e)}
            variant="primary"
            type="submit"
          >
            Crear Autor
          </Button>
        </Form>
      </Container>
    </>
  );
}
