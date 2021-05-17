import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Collapse, Container, Input, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap'
import { LOGOUT_REQUEST } from '../redux/types';
import LoginModal from './auth/LoginModal';
import SearchInput from './search/searchInput';


const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, userRole } = useSelector(state => state.auth);
    console.log(userRole, "userRole");

    const dispatch = useDispatch();
    /**
     * useCallback: useEffect와 유사,
     * 메모이제이션 콜백을 반환
     */
    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        })
    }, [dispatch]);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    const guestLink = (
        <Fragment>
            <NavItem>
                회원가입
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    );

    return (
         <>
        <Navbar color="dark" dark expand="lg" className="sticky-top">
            <Container>
                <Link to="/" className="text-white text-decoration-none">
                        Brownie
                </Link>
                
                <NavbarToggler onClick={handleToggle}/>
                <Collapse isOpen={isOpen} navbar>
                <SearchInput isOpen={isOpen} />
                <Nav className="ml-auto d-flex justify-content-around" navbar>
                    {false ?
                        (
                            <h1 className="text-white">authLink</h1> 
                        ) : (
                            <LoginModal/>
                        )
                    }
                    {/* {isAuthenticated ? (
                         <h1 className="text-white">authLink</h1>
                    ) : (
                        <LoginModal/>
                    )}         */}
                            
                </Nav>
                </Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default AppNavbar;
