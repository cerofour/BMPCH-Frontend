import { Container, Stack } from "react-bootstrap";
import MyMainContentHeader from "../components/ContentHeader";
import { MyResourcesTable} from "../components/ResourcesTable";
import MySearchForm from "../components/SearchForm";

export default function ManageResources() {

    const pageTitle = "RECURSOS";
    const subtitle = "LISTADO DE RECURSOS";

    const header = MyMainContentHeader(pageTitle, subtitle);

    return(
        <>
            <Container style={{paddingTop: '50px'}}>
                <Container style={{backgroundColor: '#fff', padding: '20px'}}>
                    <Stack direction="horizontal">
                        {header}
                        <MySearchForm/>
                    </Stack>
                    <MyResourcesTable/>
                </Container>
            </Container>
        </>
    );
}