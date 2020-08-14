import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../../../actions/actions';


const Login = () => {
    
    let history = useHistory();
    const [ComfirmUser, SetComfirmUser] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const { register, errors, handleSubmit } = useForm({
        mode: "all",
        shouldFocusError: true,
    });

    const OnChangeLogin = event => {
        SetComfirmUser({ ...ComfirmUser, [event.target.name]: event.target.value })

    }
    const onSubmitLogin = event => {
        event.preventDefault();

        if (ComfirmUser.email.trim() === '' || ComfirmUser.password.trim() === '') {
            return alert('Tài Khoản Hoặc Mật Khẩu Không ĐƯỢC TRỐNG!');
        } else if(ComfirmUser.email == 'tam2012000@gmail.com' && ComfirmUser.password == '123456') {
            dispatch(userActions.login(ComfirmUser.email));
            history.push('/');
            return null;
        } else {
            return alert('Tài Khoản Hoặc Mật Khẩu Không Đúng');
        }
        
    }

    return (
        <div className="col-lg-4 col-md-6 mx-auto" style={{marginTop: '150px'}}>
            <div className="card rounded shadow shadow-sm">
                <div className="card-header text-center">
                    <h3 className="mb-0">Login</h3>
                </div>
                <div className="card-body">
                    <form className="form"  onSubmit={onSubmitLogin}>
                        <div className="form-group">
                            <label htmlFor="uname1">Username</label>
                            <input type="text" 
                                onChange={OnChangeLogin}
                                value={ComfirmUser.email}
                                name='email' 
                                className={`form-control form-control-lg rounded-0 ${errors.email ? "is-invalid" : "" }`} 
                                id="uname1" 
                                ref={register({
                                    required: "Email không được trống!",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email address"
                                      }
                                    
                                })}
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd1">Password</label>
                            <input type="password"  
                                name="password"
                                onChange={OnChangeLogin}
                                value={ComfirmUser.password} 
                                className={`form-control form-control-lg rounded-0 ${errors.password ? "is-invalid" : "" }`} 
                                id="pwd1"  
                                ref={register({
                                    required: "Password không được trống!",
                                })}
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <div>
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <span className="custom-control-indicator"></span>
                                <span className="custom-control-description small text-dark">Remember me on this computer</span>
                            </label>
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <button type="submit" className="btn btn-success btn-md " id="btnLogin"><i className="fas fa-sign-in-alt"></i> Login</button>
                            <Link to="/register" className="btn btn-primary btn-md "><i className="fas fa-user-plus"></i> Đăng ký</Link>
                        </div>
                    </form>
                    <p className="text-center my-3"> OR  </p>
                    <div className="social-login d-flex justify-content-around">
                        <button className="btn facebook-btn social-btn" style={{backgroundColor:'#3C589C',color:'white', padding: '15px'}} type="button"><span><i className="fab fa-facebook-f"></i> Facebook</span> </button>
                        <button className="btn google-btn social-btn" style={{backgroundColor:'#DF4B3B',color:'white', padding: '15px'}} type="button"><span><i className="fab fa-google-plus-g"></i> Google+</span> </button>
                    </div>
                </div>
            </div>

        </div>
        
    )
}
export default Login;