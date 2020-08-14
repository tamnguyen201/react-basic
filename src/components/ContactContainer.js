import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactContainer = (props) => {
    const { register, errors, handleSubmit } = useForm({
        mode: "all",
        reValidateMode: 'all',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
      });
    const [dataContact, setDataContact] = useState({email: '', content: ''});
    
    const onSubmit = () => {
        window.alert('Submit thành công!');
        setDataContact({email: '', content: ''});
    }

    const handleInput = event => {
        const { name, value } = event.target;
        setDataContact({ ...dataContact, [name]: value });
    }  

    // const handleInputValidation = event => {
    //     const { name, value } = event.target;
    //     setDataContact({ ...dataContact, [name]: value })
    
    // }
    
    
    return(
        <div className="container">
        <div className="row pt-5" id="contact">
            <div className="col-lg-6">
                <h2 className="font-weight-bold">Contact Us</h2>
                <p>
                    <i className="fas fa-map-marker-alt"></i> 
                    {props.name}
                </p>
                <p>
                    <i className="fas fa-mobile-alt"></i>
                    {props.phone}
                </p>
                <p>
                    <i className="far fa-envelope"></i>
                    {props.email}
                </p>
            </div>
                
            <div className="col-lg-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                                    message: "Chưa đúng định dạng email"
                                }
                            })}
                        />
                         {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea 
                            name="content" 
                            id="content"
                            className={`form-control p-3 ${errors.content ? "is-invalid" : "" }`}
                            cols="30" rows="10" 
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
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Send</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
export default ContactContainer;