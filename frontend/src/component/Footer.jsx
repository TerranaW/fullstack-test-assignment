import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: "#FFAF00",
                color: "white",
                textAlign: "center",
                padding: "10px 0",
                fontSize: "14px",
                marginTop: "auto",
            }}
        >
            <Container>
                <p className="m-0">
                    Copyright © 2020 Dewe Tour - Terrana Willma - NIS. All Rights Reserved
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
