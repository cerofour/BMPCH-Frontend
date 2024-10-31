import { Container, Stack } from "react-bootstrap";
import MyMainContentHeader from "../components/ContentHeader";
import { MyWorkersTable } from "../components/WorkersTable";
import MySearchForm from "../components/SearchForm";

export default function ManageWorkers() {

    const pageTitle = "TRABAJADORES";
    const subtitle = "LISTADO DE TRABAJADORES";

    const header = MyMainContentHeader(pageTitle, subtitle);

    return(
        <>
            <Container style={{paddingTop: '50px'}}>
                <Container style={{backgroundColor: '#fff', padding: '20px'}}>
                    <Stack direction="horizontal">
                        {header}
                        <MySearchForm/>
                    </Stack>
                    <MyWorkersTable/>
                </Container>
            </Container>
        </>
    );
}