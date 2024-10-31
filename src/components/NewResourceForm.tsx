import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Dropdown, DropdownButton, Row, Stack } from "react-bootstrap";
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

export function NewResourceForm() {
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
                <Form.Group style={{width: '40%'}} className="mb-3" controlId="formId">
                    <div className="form-group-container">
                        <Form.Label style={{color: '#808080'}}> ID </Form.Label>
                        <Form.Control
                            style={{border: 'none'}}
                            onChange={(e) => setId(parseInt(e.target.value))}
                            type="number"
                        ></Form.Control>
                    </div>
				</Form.Group>
                <Stack direction="horizontal" gap={0}>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formTitle">
                        <div className="form-group-container"  >
                            <Form.Label style={{color: '#808080'}}> TÍTULO </Form.Label>
                            <Form.Control
                                style={{border: 'none'}}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                            ></Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formAuthor">
                        <div className="form-group-container" >
                            <Form.Label style={{color: '#808080'}}> AUTOR </Form.Label>
                            <Form.Control
                                style={{border: 'none'}}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                            ></Form.Control>
                        </div>
                    </Form.Group>
                </Stack>
                <Stack direction="horizontal" gap={0}>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formDate">
                        <div className="form-group-container">
                            <Form.Label style={{color: '#808080'}}> FECHA DE PUBLICACIÓN </Form.Label>
                            <Form.Control
                                style={{border: 'none'}}
                                onChange={(e) => setPublicationDate(new Date(e.target.value))}
                                type="date"
                            ></Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formCategories">
                        <div className="form-group-container">
                            <Form.Label style={{color: '#808080'}}> CATEGORÍAS </Form.Label>
                            <Form.Control
                                style={{border: 'none'}}
                                type="text"
                            ></Form.Control>
                        </div>
                    </Form.Group>
                </Stack>
                <Form.Group style={{width: '40%'}} className="mb-3" controlId="formPages">
                    <div className="form-group-container">
                        <Form.Label style={{color: '#808080'}}> CANTIDAD DE PÁGINAS </Form.Label>
                        <Form.Control 
                            style={{border: 'none'}}
                            onChange={(e) => setPages(parseInt(e.target.value))}
                            type="number"></Form.Control>
                    </div>
                </Form.Group>
                <Stack direction="horizontal" gap={0}>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formEdition">
                        <div className="form-group-container">
                            <Form.Label style={{color: '#808080'}}> EDICIÓN </Form.Label>
                            <Form.Control
                                style={{border: 'none'}}
                                onChange={(e) => setEdition(parseInt(e.target.value))}
                                type="number"></Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formVolume">
                        <div className="form-group-container">
                            <Form.Label style={{color: '#808080'}}>VOLUMEN</Form.Label>
                            <Form.Control
                                style={{border: 'none'}}
                                onChange={(e) => setVolume(parseInt(e.target.value))}
                                type="number"></Form.Control>
                        </div>
                    </Form.Group>
                </Stack>
                <Stack direction="horizontal" gap={0}>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formPublisher">
                        <div className="d-flex justify-content-between form-group-container">
                            <Stack>
                                <Form.Label style={{color: '#808080'}}>EDITORIAL</Form.Label>
                                <EditorialDropdown selected={editorial} setSelected={setEditorial} />
                            </Stack>
                        </div>
                    </Form.Group>
                    <Form.Group style={{width: '40%'}} className="mb-3" controlId="formBasicPublisher">
                        <div className="d-flex justify-content-between form-group-container">
                            <Stack>
                                <Form.Label style={{color: '#808080'}}>TIPO DE RECURSO</Form.Label>
                                <TypesDropdown selected={type} setSelected={setType} />
                            </Stack>
                        </div>
                    </Form.Group>
                </Stack>
				<Button variant="primary" type="submit">
					Añadir
				</Button>
			</Form>
		</>
	);
}
