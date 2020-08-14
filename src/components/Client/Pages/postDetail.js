import React, { useState, useEffect } from 'react';
import axios from '../../../config';
import { useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Loader/loader';


const PostDetail = ({match}) => {
    let { id } = match.params;
    const { register, errors, handleSubmit, reset } = useForm({
        mode: "all",
        shouldFocusError: true,
    });

    const initPost = {
        id: null,
        title: "",
        body: "",
        published: false
    };
    const [post, setPost] = useState(initPost);
    const [comments, setComments] = useState([]);
    const [postsRecent, setPostsRecent] = useState([]);
    const [dataComment, setDataComment] = useState({author: '', email: '', content: ''});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get(`posts/${id}`),
            axios.get(`posts/${id}/comments?sortBy=createdAt&order=desc`),
            axios.get('posts?page=1&limit=5&sortBy=createdAt&order=desc')
        ])
        .then(res=>{
            setPost(res[0].data);
            setComments(res[1].data);
            setPostsRecent(res[2].data);
            setLoading(false)
        })
        .catch(err=>console.log(err));

    },[]);

    const onSubmit = (data, e) => {
        e.target.reset();
        axios.post(`posts/${id}/comments`,{
            postId: id,
            ...data
        })
        .then(res=>{
            let newComment = [...comments];
            setDataComment({author: '', email: '', content: ''});
            newComment.unshift(res.data);
            setComments(newComment);
            window.alert('Thành Công!');
        })
        .catch(err=>console.log(err));
    }
    
    return (
        <div>
            {
                (isLoading) ?
                <Loading /> :
                <div>
                    <div className="slider-area2 d-flex align-items-center" style={{height: '300px'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center pt-50">
                                    <h2>Blog Details</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="blog_area single-post-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 posts-list">
                                    <div className="single-post">
                                    <div className="feature-img">
                                        <img className="img-fluid" src={post.avatar} alt="" />
                                    </div>
                                    <div className="blog_details">
                                        <h2>{post.title}</h2>
                                        <ul className="blog-info-link mt-3 mb-4">
                                            <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                                            <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
                                        </ul>
                                            <p>{post.body}</p>
                                    </div>
                                    </div>
                                    <div className="navigation-top">
                                    <div className="d-sm-flex justify-content-between text-center">
                                        <p className="like-info"><span className="align-middle"><i className="fa fa-heart"></i></span> Lily and 4
                                            people like this
                                        </p>
                                        <div className="col-sm-4 text-center my-2 my-sm-0">
                                        </div>
                                        <ul className="social-icons">
                                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fab fa-dribbble"></i></a></li>
                                            <li><a href="#"><i className="fab fa-behance"></i></a></li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className="comments-area">
                                    <h4>Comments</h4>
                                        {
                                            comments.map((item, index) => ( 
                                            <div className="comment-list" key={item.id}>
                                                <div className="single-comment justify-content-between d-flex">
                                                    <div className="user justify-content-between d-flex">
                                                        <div className="thumb">
                                                        <img src="https://colorlib.com/preview/theme/petcare/assets/img/comment/comment_1.png" alt="" />
                                                        </div>
                                                        <div className="desc">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <h5>
                                                                    <a href="#">{item.author}</a>
                                                                </h5>
                                                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                                            </div>
                                                        </div>
                                                        <p className="comment">{item.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            ))
                                        }
                                    </div>
                                    <div className="comment-form">
                                    <h4>Leave a Reply</h4>
                                    <form className="form-contact comment_form" onSubmit={handleSubmit(onSubmit)} id="commentForm">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea 
                                                        name="content" 
                                                        id="content"
                                                        className={`form-control w-100 ${errors.content ? "is-invalid" : "" }`}
                                                        cols="30" rows="9" 
                                                        placeholder="Your content"
                                                        ref={register({
                                                            required: "Content không được để trống",
                                                            validate: (value) => { return !!value.trim()},
                                                            minLength: {value: 5, message: "Content phải nhiều hơn 5 kí tự"},
                                                        })}
                                                    >
                                                    </textarea>
                                                    {errors.content && <span className="text-danger">{errors.content.message}</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input 
                                                        type="text" 
                                                        name="author"
                                                        id="name"
                                                        className={`form-control ${errors.author ? "is-invalid" : "" }`}
                                                        placeholder="Your name " 
                                                        ref={register({
                                                            required: "Họ tên không được để trống",
                                                            validate: (value) => { return !!value.trim()},
                                                            minLength: {value:2, message: "Vui lòng nhập đủ họ và tên!"}
                                                        })}
                                                    />
                                                    {errors.author && <span className="text-danger">{errors.author.message}</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input 
                                                        type="text" 
                                                        name="email"
                                                        id="email"
                                                        className={`form-control ${errors.email ? "is-invalid" : "" }`}
                                                        placeholder="Your email address" 
                                                        ref={register({
                                                            required: "Email không được để trống",
                                                            validate: (value) => { return !!value.trim()},
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                message: "Invalid email address format"
                                                            }
                                                        })}
                                                    />
                                                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="button button-contactForm btn_1 boxed-btn">Send Message</button>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="blog_right_sidebar">
                                    <aside className="single_sidebar_widget popular_post_widget">
                                        <h3 className="widget_title">Recent Post</h3>
                                        {
                                            postsRecent.map((item, index) => ( 
                                            <div className="media post_item">
                                                <img src={item.avatar} alt="post" style={{width: '120px'}} />
                                                <div className="media-body">
                                                    <Link to={`/blog/${item.id}`}>
                                                    <h3>From life was you fish...</h3>
                                                    </Link>
                                                    <p>January 12, 2019</p>
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
            }
        </div>
    )
}


export default PostDetail;
