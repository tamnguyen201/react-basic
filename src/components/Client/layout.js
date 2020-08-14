import React from 'react';
import { Link, useParams, useRouteMatch, Switch, Route } from "react-router-dom";
import Nav from "../nav";
import Home from "./Pages/Home/home";
import Blog from "./Pages/blog";
import PostDetail from "./Pages/postDetail";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Footer from "../footer";
import NotFount from '../404';


const handleSubmit = (event) =>{
  event.preventDefault();
}

const ClientLayout = () => {
  let { path, url } = useRouteMatch();
  return (
  <div>
    <Nav />

    <main>
        <Switch>
            <Route exact path={path} component={Home} />
            <Route path="/blog" exact component={Blog} />
            <Route path="/blog/:id" component={PostDetail} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route component={NotFount} />
        </Switch>
    </main>

    <Footer />
  </div>
)};


export default ClientLayout;