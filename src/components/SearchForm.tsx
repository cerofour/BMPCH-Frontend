import { Button, Form, Stack } from "react-bootstrap";

export default function MySearchForm() {
    return (
        <>
            <Form className="d-flex mb-0 d-none d-md-block" style={{ alignItems: 'center' }}>
                <Stack>
                    <Button
                        type="submit"
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#808080',
                            marginLeft: '10px',
                            textAlign: 'right', 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            maxWidth: '2500px',
                        }}
                    >
                        Buscar
                    </Button>
                    <Form.Control
                        type="search"
                        style={{
                            border: '2px solid #808080',
                            color: '#808080',
                        }}
                    />  
                </Stack>
            </Form>
        </>
    );
}