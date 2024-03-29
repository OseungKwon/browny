import React, {Fragment} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';
import CardList from '../components/post/PostCardOne';
import { Col, Container, Row } from 'reactstrap';
import { Redirect, Switch, Route } from 'react-router-dom';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import CategoryResult from './normalRoute/CategoryResult';

const MyRouter = () => (
    <>
        <AppNavbar />
        <Container id="main-body">
            <Switch>
                <Route path="/" exact component={PostCardList} />
                <Route path="/post" exact component={PostWrite} />
                <Route path="/post/:id" exact component={PostDetail} />
                <Route path="/post/category/:categoryName" exact component={CategoryResult} />
                <Route path="/search/:searchTerm" exact component={Search} />
                <Redirect from="*" to="/" />
            </Switch>
        </Container>
        <Footer/>
    </>
)

export default MyRouter;