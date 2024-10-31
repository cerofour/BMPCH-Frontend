import React, { useState } from "react";

export default function MyMenuAccordion(title: string, links: React.ReactNode[]) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return(
        <>
            <div className="custom-accordion" style={{ width: '100%' }}>
                <div
                    className="accordion-header"
                    onClick={handleToggle}
                    style={{
                        backgroundColor: '#1f283a',
                        cursor: 'pointer',
                        color: '#06b195',
                        padding: '0px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    {title}
                </div>
                {isOpen && (
                    <div
                        className="accordion-body"
                        style={{
                            backgroundColor: '#1f283a',
                            color: '#06b195',
                            padding: '5px',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease',
                        }}
                    >
                        {links}
                    </div>
                )}
            </div>
        </>   
    );
}