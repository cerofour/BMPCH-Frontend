import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { FormEvent, useState } from "react";
import {
	getAllEditorials,
	getAllTypes,
	newResource,
} from "../api/api";
import { EditorialAPIObject, TextTypeAPIObject, TextAPIObject } from "../api/api";

function MyDropdown({ data, selected, setSelected, labelKey }: { data: any; selected: any; setSelected: any; labelKey: string; }) {
    return (
        <DropdownButton variant="outline-secondary" title={selected[labelKey] || "Selecciona"}>
            {data.map((option: any) => (
                <Dropdown.Item key={option.id} onClick={() => setSelected(option)}>
                    {option[labelKey]}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

function EditorialDropdown({ selected, setSelected }: { selected: EditorialAPIObject; setSelected: (editorial: EditorialAPIObject) => void; }) {
    const { isLoading, isError, data: editorials } = useQuery<EditorialAPIObject[], Error>({
        queryKey: ["getAllEditorials"],
        queryFn: getAllEditorials,
    });

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error al cargar.</div>;

    return (
        <MyDropdown
            data={editorials || []}
            selected={selected}
            setSelected={setSelected}
            labelKey="name"
        />
    );
}

function TypesDropdown({ selected, setSelected }: { selected: TextTypeAPIObject; setSelected: (type: TextTypeAPIObject) => void; }) {
    const { isLoading, isError, data: types } = useQuery<TextTypeAPIObject[], Error>({
        queryKey: ["getAllTypes"],
        queryFn: getAllTypes,
    });

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error al cargar.</div>;

    return (
        <MyDropdown
            data={types || []}
            selected={selected}
            setSelected={setSelected}
            labelKey="typename"
        />
    );
}
//function buildUpdateResourceForm<T> (data: T) {//}

export function NewTextForm() {
	const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [publicationDate, setPublicationDate] = useState(new Date());
    const [pages, setPages] = useState(0);
    const [edition, setEdition] = useState(0);
    const [volume, setVolume] = useState(0);
    const [editorial, setEditorial] = useState<EditorialAPIObject>({ id: 0, name: "" });
    const [type, setType] = useState<TextTypeAPIObject>({ typeId: 0, typename: "" });

	const mutation = useMutation({
		mutationFn: newResource,
		onSuccess: () => {
			//useQueryClient().invalidateQueries("getAllTexts");
		},
	});

	const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const requestBody: TextAPIObject = {
            id,
            title,
            publicationDate,
            pages,
            edition,
            volume,
            editorial,
            type,
        };
        console.log(requestBody);
        mutation.mutate(requestBody);
    };

	return (
		<>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Form.Group className="mb-3" controlId="formTitle">
					<Form.Label> Título </Form.Label>
					<Form.Control
						placeholder="Escribe el título del libro"
						onChange={(e) => setTitle(e.target.value)}
						type="text"
					></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formDate">
					<Form.Label> Fecha de Publicación</Form.Label>
					<Form.Control
						onChange={(e) => setPublicationDate(new Date(e.target.value))}
						type="date"
					></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPages">
					<Form.Label> Cantidad de Páginas</Form.Label>
					<Form.Control onChange={(e) => setPages(parseInt(e.target.value))} type="number"></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formEdition">
					<Form.Label> Edición</Form.Label>
					<Form.Control onChange={(e) => setEdition(parseInt(e.target.value))} type="number"></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formVolume">
					<Form.Label>Volumen</Form.Label>
					<Form.Control onChange={(e) => setVolume(parseInt(e.target.value))} type="number"></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPublisher">
                <div className="d-flex justify-content-between">
                    <Form.Label>Editorial</Form.Label>
                    <EditorialDropdown selected={editorial} setSelected={setEditorial} />
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPublisher">
                <div className="d-flex justify-content-between">
                    <Form.Label>Tipo de Texto</Form.Label>
                    <TypesDropdown selected={type} setSelected={setType} />
                </div>
            </Form.Group>
				<Button variant="primary" type="submit">
					Crear texto
				</Button>
			</Form>
		</>
	);
}
