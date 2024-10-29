import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

export default function MyOptionAccordion(title: string, links: React.ReactNode[]) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return(
        <>
            <Accordion
                defaultActiveKey="1"
                style={{ backgroundColor: '#1d2637', color: '#fff', width: '100%', border: 'none' }}
            >
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#1f283a', border: 'none' }}>
                    <Accordion.Header
                        onClick={handleToggle}
                        style={{
                            backgroundColor: isOpen ? '#1695a9' : '#1d2637', 
                            color: '#fff',
                            cursor: 'pointer',
                            border: 'none',
                        }}
                    >
                        {title}
                    </Accordion.Header>
                    <Accordion.Body
                        style={{
                            backgroundColor: '#1f283a',
                            color: '#fff',
                            border: 'none',
                        }}
                    >
                        {links}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>   
    );
}