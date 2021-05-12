import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Container, Input, Nav, Navbar, NavbarToggler } from 'reactstrap'
import SearchInput from './search/searchInput';


const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
         <>
        <Navbar color="dark" dark expand="lg" className="sticky-top">
            <Container>
                <Link to="/" className="text-white text-decoration-none">
                        Brownie
                </Link>
                
                <NavbarToggler />
                <Collapse isOpen={true} navbar>
                <SearchInput isOpen={isOpen} />
                <Nav className="ml-auto d-flex justify-content-around" navbar>
                    {false ?
                        (
                            <h1 className="text-white">authLink</h1> 
                        ) : (
                            <h1 className="text-white">geustLink</h1>
                        )
                    }
                </Nav>
                </Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default AppNavbar;
