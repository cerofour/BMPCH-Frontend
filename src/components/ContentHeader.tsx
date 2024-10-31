import {Stack } from "react-bootstrap";

export default function MyMainContentHeader(title: string, subtitle: string) {

    return (
        <>
            <Stack direction="horizontal" style={{paddingBottom: '20px'}}>
                <Stack>
                    <h1 className="mb-2">{title}</h1>
                    <h5>{subtitle}</h5>
                </Stack>
            </Stack>
        </>
    );
}