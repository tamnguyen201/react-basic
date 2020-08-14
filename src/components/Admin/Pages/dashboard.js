import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../config';
import Loading from '../../Loader/loader';

const Dashboard = () => {
    const[postsCount, setPostsCount] = useState(0);
    const[commentsCount, setCommentsCount] = useState(0);
    const[categoriesCount, setCategoriesCount] = useState(0);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        Promise.all([
            axios.get('categories'),
            axios.get('posts')
        ])
        .then(res=>{
            setCategoriesCount(res[0].data.length);
            setPostsCount(res[1].data.length);
            setLoading(false)
        })
        .catch(err=>console.log(err));

    }, {});

    return (
        <div className="container">
            <h1>General statistics</h1>
            { (isLoading) ?
            <Loading /> :
            <div className="row">
                
                <div className="col-lg-3 col-6">
                    <div className="rounded bg-success p-3">
                        <div className="inner">
                        <h3>{categoriesCount}</h3>
                            <p className="text-white">Categories</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-file-text" aria-hidden="true"></i>
                        </div>
                        <Link to="/admin/posts" className="rounded-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                
                <div className="col-lg-3 col-6">
                    <div className="rounded bg-primary p-3">
                        <div className="inner">
                        <h3>{postsCount}</h3>
                            <p className="text-white">Posts</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-file-text" aria-hidden="true"></i>
                        </div>
                        <Link to="/admin/posts" className="rounded-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};


export default Dashboard;