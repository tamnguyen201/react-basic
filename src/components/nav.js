import React from 'react';
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useSelector } from 'react-redux';


const Nav = () => {
  let { path, url } = useRouteMatch();
  // const isLogin = useSelector(state => state.auth.isLogin);
  const isLogin = localStorage.getItem('user') ? true : false;

    return(
        <header>
            <div className="header-area header-transparent">
                <div className="main-header header-sticky">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-2 col-md-1">
                            <div className="logo">
                                <Link to="/">
                                    <img src="https://colorlib.com/preview/theme/petcare/assets/img/logo/logo.png" alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-10 col-lg-10 col-md-10">
                            <div className="menu-main d-flex align-items-center justify-content-end">
                                <div className="main-menu f-right d-none d-lg-block">
                                    <nav>
                                        <ul id="navigation">
                                            <li>
                                                <Link to="/admin" >Admin</Link>
                                            </li>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/blog">Blog</Link>
                                            </li>
                                            <li><a href="#contact">Contact</a></li>
                                            <li>
                                                <Link to="/login" >Login</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="header-right-btn f-right d-none d-lg-block ml-30">
                                    <Link to="#" className="header-btn">0123.456.789</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Nav;