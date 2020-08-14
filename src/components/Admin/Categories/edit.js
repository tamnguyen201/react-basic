import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useHistory } from 'react-router-dom';
import axios from '../../../config';

const EditFormCate = () => {
    let { id } = useParams();
    let history = useHistory();
    const { register, errors, handleSubmit } = useForm({
        mode: "all",
        shouldFocusError: true,
    });
    
    const [category, setCategory] = useState({});

    useEffect(() => {
        axios.get(`categories/${id}`)
        .then(res=>setCategory(res.data))
        .catch(e => console.log(e));
    
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const saveCate = () => {
        var data = {
            name: category.name,
        };
        
        axios.put(`categories/${id}`, data)
        .then(response => {
            localStorage.setItem('actionMessage', 'Thành công!');
            history.push('/admin/categories');
        })
        .catch(e => console.log(e));
    };

    return (
        <div className="submit-form">
            <div className="container">
                <h1>Đây là add form page</h1>
                <form onSubmit={handleSubmit(saveCate)} className="col-lg-8">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : "" }`}
                            id="name"
                            value={category.name}
                            onChange={handleInputChange}
                            name="name"
                            ref={register({
                                required: "Name is required",
                                maxLength: {value: 35, message: "Name phải ít hơn 35 kí tự"},
                            })}
                        />
                         {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};


export default EditFormCate;