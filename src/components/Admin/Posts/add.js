import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../../../config';

const AddForm = () => {
    let history = useHistory();
    const { register, errors, handleSubmit } = useForm({
        mode: "all",
        criteriaMode: "firstError",
        shouldFocusError: true,
    });
    
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({
        body: ''
    });

    useEffect(()=>{
            axios.get('categories')
        .then(res=>{
            setCategories(res.data);
        })
        .catch(err=>console.log(err));

    }, {});

    const handleEditorChange = (content, editor) => {
        setPost({ ...post, 'body': content });
    }
    const savePost = (data) => {
        let newPost = {...post, cateId:data.cateId, avatar:data.avatar, title:data.title};
        axios.post('posts', newPost)
        .then(response => {
            localStorage.setItem('actionMessage', 'Thành công!');
            history.push('admin/posts');
        })
        .catch(e => console.log(e));
    };

    return (
        <div className="submit-form">
            <div className="container">
                <h1>Đây là add form page</h1>
                <form onSubmit={handleSubmit(savePost)} className="col-lg-8">
                    <div class="form-group">
                      <label htmlFor="cateId">Categories</label>
                      <select name="cateId" ref={register} style={{display: 'block !importan'}} className="form-control">
                        <option value="0">No cate</option>
                        {
                            categories.map(item=>(
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">avatar</label>
                        <input
                            type="text"
                            name="avatar"
                            placeholder="Enter avatar"
                            value={post.avatar}
                            className={`form-control ${errors.avatar ? "is-invalid" : "" }`}
                            ref={register({
                                required: "avatar is required",
                                maxLength: {value: 1000, message: "length message"},
                            })}
                        />
                        {errors.avatar && <span className="text-danger">{errors.avatar.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className={`form-control ${errors.title ? "is-invalid" : "" }`}
                            id="title"
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
                        <label htmlFor="body">Description</label>
                        <Editor
                            initialValue=""
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
                        
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};


export default AddForm;