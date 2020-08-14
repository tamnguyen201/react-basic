import React from 'react';
import { Link, useParams, useRouteMatch, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import AddForm from "./Posts/add";
import AddFormCate from "./Categories/add";
import ListCate from "./Categories";
import ListPost from "./Posts";
import ListComment from "./Comments";
import ViewPost from "./Posts/viewPost";
import EditCate from "./Categories/edit";
import Edit from "./Posts/edit";


const handleSubmit = (event) =>{
  event.preventDefault();
}

// const handleLogout = (event) => {
//     event.preventDefault();
//     return confirm('Banj co muon dang xuaat?') ? alert('ok') : '';
// }

const AdminLayout = () => {
    let { path, url } = useRouteMatch();
    return (
        <div className="container-fluid pt-5">
            <header>
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <Link className="navbar-brand" to="/admin">Admin</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
                    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    </ul>
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                            <Link className="dropdown-item" to="/" >Logout</Link>
                        </div>
                    </li>
                    </ul>
                </div>
                </nav>
            </header>
            <div className="row mt-3">
                <div className="col-lg-3">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action" to="/admin">Dashboard</Link>
                        <Link className="list-group-item list-group-item-action" to="/admin/categories" >Categories</Link>
                        <Link className="list-group-item list-group-item-action" to="/admin/categories/add" >Cate add</Link>
                        <Link className="list-group-item list-group-item-action" to="/admin/posts" >Posts</Link>
                        <Link className="list-group-item list-group-item-action" to="/admin/posts/add" >Posts add</Link>
                    </div>
                </div>
                <div className="col-lg-9">
                    <Switch>
                        <Route path={`${path}/categories`} exact component={ListCate} />
                        <Route path={`${path}/categories/add`} component={AddFormCate} />
                        <Route path={`${path}/categories/edit/:id`} component={EditCate} />

                        <Route path={`${path}/posts`} exact component={ListPost} />
                        <Route path={`${path}/posts/add`} component={AddForm} />
                        <Route path={`${path}/posts/edit/:id`} component={Edit} />

                        <Route path={`${path}/posts/:postId/comments`} exact component={ListComment} />

                        <Route exact path={path} component={Dashboard} />
                    </Switch>
                </div>
            </div>
        </div>
    )
};


export default AdminLayout;