import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Container, Input, Nav, Navbar, NavbarToggler } from 'reactstrap'


const AppNavbar = () => {
    return (
         <>
        <Navbar color="dark" dark expand="lg" className="sticky-top">
            <Container>
                <Link to="/" className="text-white text-decoration-none">
                        Brownie
                </Link>
                
                    <Input
                        placeholder="검색어를 입력하세요."
                    />

                <NavbarToggler />
                <Collapse isOpen={true} navbar>
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
