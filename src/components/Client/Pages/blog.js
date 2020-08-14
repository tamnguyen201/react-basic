import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "../../../config";
import Loading from '../../Loader/loader';
import Pagination from "../../../components/blogPagi";


const Blog = ({match}) => {
    let { cateId } = useParams();
    const [Posts, setPosts] = useState([]);
    const [PostsFilter, setPostsFilter] = useState();
    const [Paginate, setPaginate] = useState(true);
    const [postsRecent, setPostsRecent] = useState([]);
    const [categories, setCategories] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        Promise.all([
            axios.get('categories'),
            axios.get('posts'),
            axios.get('posts?page=1&limit=5')
        ])
        .then(res=>{
            setCategories(res[0].data);
            let postData = (cateId) ? res[1].data.filter(item => item.cateId==cateId) : res[1].data;
            console.log(postData);
            setPosts(res[1].data);
            setPostsCount(res[1].data.length);
            setPostsRecent(res[2].data);
            setLoading(false)
        })
        .catch(err=>console.log(err));

    },[]);

    const abc = (id) => {
        setPaginate(false);
        setPostsFilter(Posts.filter(item=>item.cateId == id))
    } 

    const [showPerPage, setShowPerPage] = useState(5);
    const [pagination, setPagination] = useState({
      start: 0,
      end: showPerPage,
    });
  
    const onPaginationChange = (start, end) => {
      setPagination({ start: start, end: end });
    };

    return (
        <div>
            <div className="slider-area2 d-flex align-items-center" style={{height: '300px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap text-center pt-50"><h2>Blog</h2></div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="blog_area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mb-5 mb-lg-0">
                            <div className="blog_left_sidebar">
                            { (isLoading) ?
                                <Loading /> :
                                (PostsFilter != null) ?
                                PostsFilter.map((item, index) => 
                                ( 
                                <article className="blog_item">
                                    <div className="blog_item_img">
                                    <img className="card-img rounded-0" src={item.avatar} alt="" />
                                    </div>
                                    <div className="blog_details">
                                    <Link className="d-inline-block" to={`/blog/${item.id}`}>
                                        <h2>{item.title}</h2>
                                    </Link>
                                    <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                                    he earth it first without heaven in place seed it second morning saying.</p>
                                    <ul className="blog-info-link">
                                    <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                                    <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
                                    </ul>
                                    </div>
                                </article>
                                ))
                                :
                                Posts.slice(pagination.start, pagination.end).map((item, index) => 
                                ( 
                                <article className="blog_item">
                                    <div className="blog_item_img">
                                    <img className="card-img rounded-0" src={item.avatar} alt="" />
                                    </div>
                                    <div className="blog_details">
                                    <Link className="d-inline-block" to={`/blog/${item.id}`}>
                                        <h2>{item.title}</h2>
                                    </Link>
                                    <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                                    he earth it first without heaven in place seed it second morning saying.</p>
                                    <ul className="blog-info-link">
                                    <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                                    <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
                                    </ul>
                                    </div>
                                </article>
                                ))
                            }
                                {
                                    (!isLoading) ?
                                    (Paginate) ?
                                    <Pagination
                                        showPerPage={showPerPage}
                                        onPaginationChange={onPaginationChange}
                                        total={postsCount}
                                    /> 
                                    : ''
                                    : ''
                                }
                            </div>
                        </div>
                <div className="col-lg-4">
                    <div className="blog_right_sidebar">

                        <aside className="single_sidebar_widget post_category_widget">
                            <h4 className="widget_title">Category</h4>
                            <ul className="list cat-list">
                            {
                                categories.map(item => 
                                ( 
                                <li key={item.id}>
                                    <Link onClick={()=>abc(item.id)} className="d-flex"><p>{item.name}</p></Link>
                                </li>
                                ))
                            }
                            </ul>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget">
                            <h3 className="widget_title">Recent Post</h3>
                            {
                                postsRecent.map(item => 
                                ( 
                                <div className="media post_item" key={item.id}>
                                <img src={item.avatar} alt="post" style={{width: '120px'}} />
                                <div className="media-body">
                                <Link to={`/blog/${item.id}`}>
                                <h3>{item.title}</h3>
                                </Link>
                                <p>{item.createdAt}</p>
                                </div>
                                </div>
                                ))
                            }
                        </aside>
                    </div>
                </div>
                </div>
                </div>
            </section>
        </div>
    );
};


export default Blog;