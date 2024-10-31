import { Container } from "react-bootstrap";
import MyMainContentHeader from "../components/ContentHeader";
import { NewResourceForm } from "../components/NewResourceForm";

export default function NewResource() {

    const pageTitle = "NUEVO RECURSO";
    const subtitle = "";

    const header = MyMainContentHeader(pageTitle, subtitle);

    return(
        <>
            <Container style={{paddingTop: '50px'}}>
                <Container style={{backgroundColor: '#fff', padding: '20px'}}>
                    {header}
                    <NewResourceForm/>
                </Container>
            </Container>
        </>
    );
}