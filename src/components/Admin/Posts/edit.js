import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../../../config';

const EditForm = () => {
    let history = useHistory();
    let { id } = useParams();
    const { register, errors, handleSubmit } = useForm({
        mode: "all",
        shouldFocusError: true,
    });

    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        Promise.all([
            axios.get('categories'),
            axios.get(`posts/${id}`)
        ])
        .then(res=>{
            setCategories(res[0].data);
            setPost(res[1].data);
            setLoading(false);
        })
        .catch(err=>console.log(err));
    
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const handleEditorChange = (content, editor) => {
        setPost({ ...post, body: content });
    }

    const savePost = (data) => {
        let newPost = {...post, cateId:data.cateId, avatar:data.avatar, title:data.title};

        axios.put(`posts/${id}`, newPost)
          .then(res => {
            localStorage.setItem('actionMessage', 'Thành công!');
            history.push('/admin/posts');
          })
          .catch(e => console.log(e));
    };

    return (
        <div className="submit-form">
            <div className="container">
                <h1>Đây là edit form page {id}</h1>
                <form onSubmit={handleSubmit(savePost)} className="col-lg-8">
                    <div className="form-group">
                        <label htmlFor="cateId">Categories</label>
                        <select name="cateId" ref={register} style={{display: 'block !importan'}} className="form-control">
                            <option value="0">No cate</option>
                            {
                                categories.map(item=>(
                                    <option value={item.id} key={item.id} selected={item.id==post.cateId}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Avatar</label>
                        <input
                            name="avatar"
                            placeholder="Enter avatar"
                            value={post.avatar}
                            className={`form-control ${errors.avatar ? "is-invalid" : "" }`}
                            onChange={handleInputChange}
                            ref={register({
                                required: "Avatar is required",
                                maxLength: {value: 1000, message: "length message"},
                            })}
                        />
                        {errors.avatar && <span className="text-danger">{errors.avatar.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            onChange={handleInputChange}
                            placeholder="Enter title"
                            value={post.title}
                            name="title"
                            ref={register({
                                required: "Title is required",
                                maxLength: {value: 60, message: "Title phải ít hơn 60 kí tự"},
                            })}
                        />
                         {errors.title && <span className="text-danger">{errors.title.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        { (!isLoading) ?
                        <Editor
                            initialValue={post.body}
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                        : ''
                        }       
                        
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};


export default EditForm;