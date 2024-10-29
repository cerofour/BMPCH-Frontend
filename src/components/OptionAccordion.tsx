import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

export default function MyOptionAccordion(title: string, links: React.ReactNode[]) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return(
        <>
            <Accordion
                defaultActiveKey="1"
                style={{width: '100%'}}
            >
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#1f283a', border: 'none' }}>
                    <Accordion.Header
                        onClick={handleToggle}
                        style={{    
                            cursor: 'pointer',
                            border: 'none',
                            backgroundColor: '#1f283a',
                        }}
                    >
                        {title}
                    </Accordion.Header>
                    <Accordion.Body
                        style={{
                            backgroundColor: '#1f283a',
                            color: '#06b195',
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