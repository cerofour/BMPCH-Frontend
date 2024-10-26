import React from "react";
import { Accordion } from "react-bootstrap";

export default function MyOptionAccordion(tittle: string, links: React.ReactNode[]) {
    return(
        <>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{tittle}</Accordion.Header>
                    <Accordion.Body>{links}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>   
    );
}