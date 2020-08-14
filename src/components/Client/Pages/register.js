import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,Redirect } from "react-router-dom";
const ID = JSON.parse(localStorage.getItem('ID'));

const Register = () => {
  //State
  const [CheckUserData, SetCheckUserData] = useState({
    NameError: "",
    AccuontError: "",
    PasswordError: "",
    ConfirmPasswordError: "",
    LengthPasswordError: "",
    AccountExists: ""
  });
  const [Register, setRegister] = useState({
    Name: "",
    Account: "",
    Password: "",
    ConfirmPassword: "",
    Sex: 'Nam'
  });
  //dispatch active
  const dispatch = useDispatch();
 
  //const PostUserAPI = user => dispatch(Actives.PostUserAPIRequest(user));
  // State
  const GetListUserResult = useSelector(state => state.GetListUser);
  
  // Function
  const OnChangeRegister = (event) => {
    setRegister({ ...Register, [event.target.name]: event.target.value });
  };

  // 
  // const ContinueRegister = {};
  // GetListUserResult.forEach(user => {
  //   ContinueRegister[user.Accuont] = user.Accuont;
  // });
  const validate = () => {
    // let NameError = "", AccuontError = "", PasswordError = "", ConfirmPasswordError = "", LengthPasswordError = "", AccountExists = "";
    // if (Register.Name.trim() === '' || Number(Register.Name.trim()) || Register.Name.trim().length > 25) {
    //   NameError = "vui lòng nhập đầy đủ họ tên";
    // }
    // if (Register.Accuont.trim() === '') {
    //   AccuontError = "vui lòng nhập tài khoản";
    // }
    // if (Register.Password.trim() === '') {
    //   PasswordError = "vui lòng nhập mật khẩu";
    // }
    // if (Register.Password.trim() !== Register.ConfirmPassword.trim()) {
    //   ConfirmPasswordError = "Mật Khẩu Không Trùng Khớp";
    // }
    // if (Register.Password.trim().length < 8) {
    //   LengthPasswordError = "Mật Khẩu quá ngắn";
    // }
    // if (ContinueRegister[Register.Accuont.trim()]) {
    //   AccountExists = 'Tài Khoản Tồn Tại';
    // }

    // if (NameError || AccuontError || PasswordError || ConfirmPasswordError || LengthPasswordError || AccountExists) {
    //   SetCheckUserData({ NameError, AccuontError, PasswordError, ConfirmPasswordError, LengthPasswordError, AccountExists })
    //   return false;
    // }
    return true;
  }
  // 
  const onSubmitRegister = (event) => {


    // event.preventDefault();
    // const isValid = validate();
    // if (isValid) {
    //   SetCheckUserData({ NameError: '', AccuontError: '', PasswordError: '', ConfirmPasswordError: '', LengthPasswordError: '', AccountExists: '' })
    //   const newRegister = {
    //     Name: Register.Name,
    //     Accuont: Register.Accuont,
    //     Password: Register.Password,
    //     Avatar: Register.Sex === 'Nam' ? 1 : 0,
    //     Sex: Register.Sex
    //   }
    //   PostUserAPI(newRegister)
    //   setRegister({ Name: '', Accuont: '', Password: '', ConfirmPassword: '', Sex: 'Nam' });
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Đăng Ký Thành Công',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // }
  }
  //useEffect
  if(ID)     return <Redirect to="/" />
    return (
        <div className="col-lg-4 col-md-6 mx-auto">
            <div className="card rounded shadow shadow-sm">
                <div className="card-header text-center">
                    <h3 className="mb-0">Đăng ký</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmitRegister} className="form">

                        <div className="name-use">
                        <p>Tên Của Bạn Là Gì ?</p>
                        <div className="form-group">
                            <div className="icon-input">
                            <i className="far fa-user" />
                            </div>
                            <div className="text-input">
                            <input
                                type="text"
                                name="Name"
                                onChange={OnChangeRegister}
                                value={Register.Name}
                                className="form-control form-control-lg rounded-0"
                            />
                            </div>
                        </div>
                        <span>{CheckUserData.NameError}</span>
                        </div>
                        <div className="name-use">
                        <p>Giới Tính</p>
                        <div className="form-group">
                            <div className="icon-input">
                            <i className="fas fa-restroom" />
                            </div>
                            <div className="grounp-sex">
                            <label  >
                                Nam
                                <input
                                type="radio"
                                name="Sex"
                                onChange={OnChangeRegister}
                                defaultChecked
                                value='Nam'
                                />
                                <span className="checkmark"></span>

                            </label>
                            <label  >
                                Nữ
                                <input
                                type="radio"
                                name="Sex"

                                value='Nữ'
                                onChange={OnChangeRegister}
                                />
                                <span className="checkmark"></span>

                            </label>
                            </div>
                        </div>
                        </div>
                        <div className="account-use">
                        <p>Tài Khoản</p>
                        <div className="form-group">
                            <div className="icon-input">
                            <i className="far fa-envelope" />
                            </div>
                            <div className="text-input">
                            <input
                                type="text"
                                name="Accuont"
                                onChange={OnChangeRegister}
                                value={Register.Accuont}
                                className="form-control form-control-lg rounded-0"
                            />
                            </div>
                        </div>
                        <span>{CheckUserData.AccuontError ? CheckUserData.AccuontError : CheckUserData.AccountExists}</span>
                        </div>
                        <div className="pass-use">
                        <p>Mật Khẩu</p>
                        <div className="form-group">
                            <div className="icon-input">
                            <i className="fas fa-lock" />
                            </div>
                            <div className="text-input">
                            <input
                                type="password"
                                name="Password"
                                value={Register.Password}
                                onChange={OnChangeRegister}
                                className="form-control form-control-lg rounded-0"
                            />
                            </div>
                        </div>
                        <span>{(CheckUserData.PasswordError ? CheckUserData.PasswordError : CheckUserData.LengthPasswordError)}</span>
                        </div>
                        <div className="comfirm-use">
                        <p>Xác Nhận Lại Lại Mật Khẩu</p>
                        <div className="form-group">
                            <div className="icon-input">
                            <i className="fas fa-lock" />
                            </div>
                            <div className="text-input">
                            <input
                                type="password"
                                name="ConfirmPassword"
                                onChange={OnChangeRegister}
                                value={Register.ConfirmPassword}
                                className="form-control form-control-lg rounded-0"
                            />
                            </div>
                        </div>
                        <span>{CheckUserData.LengthPasswordError ? CheckUserData.LengthPasswordError : CheckUserData.ConfirmPasswordError} </span>
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <button type="submit" className="btn btn-success btn-md" id="btnLogin"><i className="fas fa-user-plus"></i> Đăng Ký</button>
                            <Link to="/login" className="btn btn-primary btn-md"><i className="fas fa-sign-in-alt"></i> Đăng Nhập</Link>
                        </div>
                    </form>
                    <p className="text-center my-3"> OR  </p>
                    <div className="social-login d-flex justify-content-around">
                        <button className="btn facebook-btn social-btn" style={{backgroundColor:'#3C589C',color:'white'}} type="button"><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
                        <button className="btn google-btn social-btn" style={{backgroundColor:'#DF4B3B',color:'white'}} type="button"><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;