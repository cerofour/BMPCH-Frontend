import { Container, Stack } from "react-bootstrap";
import MyMainContentHeader from "../components/ContentHeader";
import { MyReadersTable } from "../components/ReadersTable";
import MySearchForm from "../components/SearchForm";

export default function ManageReaders() {

    const pageTitle = "LECTORES";
    const subtitle = "LISTADO DE LECTORES";

    const header = MyMainContentHeader(pageTitle, subtitle);

    return(
        <>
            <Container style={{paddingTop: '50px'}}>
                <Container style={{backgroundColor: '#fff', padding: '20px'}}>
                    <Stack direction="horizontal">
                        {header}
                        <MySearchForm/>
                    </Stack>
                    <MyReadersTable/>
                </Container>
            </Container>
        </>
    );
}