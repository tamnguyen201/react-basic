import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../../config';
import Header from '../../../header';
import ContactContainer from '../../../ContactContainer';
import Loading from '../../../Loader/loader'; 

const Card = (props) =>{
  return(
      <div className={props.className} >
          <div className="small-div">
              <i className={props.className}></i>
              <img src={props.img} alt=''/>
          </div>

          <div className="big-div">
              <span className='div-title'>
                  {props.title}
              </span>
              <br/>
              <span>
                  {props.description}
              </span>
          </div>
      </div>
  )
}

const Home = () => {
    const [isLoading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // const hobbyList = useSelector(state => state.hobby.list);
    // const dispatch = useDispatch();
    // const handleHobbyClick = (hobby) => {
    //     const action = setActiveHobby(hobby);
    //     dispatch(action);
    //   }


    useEffect(()=>{
        axios.get('posts?page=1&limit=3&sortBy=createdAt&order=desc')
        .then(res=>{
            setLoading(false);
            setPosts(res.data);
        })
        .catch(e => console.log(e));

    }, []);

  return (
    <div className="container-fluid px-0">
      { (isLoading) ?
        <Loading /> :
      <div>
        <div className="slider-area">
          <div className="slider-active dot-style">

          <div className="single-slider d-flex align-items-center slider-height">
          <div className="container">
          <div className="row align-items-center">
          <div className="col-xl-7 col-lg-8 col-md-10 ">

          <div className="video-icon">
          <a className="popup-video btn-icon" href="https://www.youtube.com/watch?v=up68UAfH0d0" data-animation="bounceIn" data-delay=".4s">
          <i className="fas fa-play"></i>
          </a>
          </div>
          <div className="hero__caption">
          <span data-animation="fadeInUp" data-delay=".3s">We help to groom your pet</span>
          <h1 data-animation="fadeInUp" data-delay=".3s">We Care Your Pets.</h1>
          <p data-animation="fadeInUp" data-delay=".6s">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna sectetur adipisci.</p>
          <a href="#" className="hero-btn" data-animation="fadeInLeft" data-delay=".3s">Contact Now<i className="ti-arrow-right"></i> </a>
          </div>
          </div>
          </div>
          </div>
          </div>

          </div>

          <div className="button-text d-none d-md-block">
          <span>Screll</span>
          </div>
        </div>

        <div class="gallery-area py-5">
          <div class="container fix">
            <div class="row justify-content-sm-center">
              <div class="cl-xl-7 col-lg-8 col-md-10">
                <div class="section-tittle text-center mb-70">
                  <span>Our Recent Photos</span>
                  <h2>Pets Photo Gallery</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="single-gallery mb-30">

                <div class="gallery-img size-img" style={{backgroundImage: 'url(https://colorlib.com/preview/theme/petcare/assets/img/gallery/gallery1.png)'}}></div>
                </div>
              </div>
              <div class="col-lg-8 col-md-6 col-sm-6">
                <div class="single-gallery mb-30">
                <div class="gallery-img size-img" style={{backgroundImage: 'url(https://colorlib.com/preview/theme/petcare/assets/img/gallery/gallery2.png)'}}></div>
                </div>
              </div>
              <div class="col-lg-8 col-md-6 col-sm-6">
                <div class="single-gallery mb-30">
                <div class="gallery-img size-img" style={{backgroundImage: 'url(https://colorlib.com/preview/theme/petcare/assets/img/gallery/gallery3.png)'}}></div>
                </div>
              </div>
              <div class="col-lg-4  col-md-6 col-sm-6">
                <div class="single-gallery mb-30">
                <div class="gallery-img size-img" style={{backgroundImage: 'url(https://colorlib.com/preview/theme/petcare/assets/img/gallery/gallery4.png)'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="home_blog-area py-5">
          <div class="container">
            <div class="row justify-content-sm-center">
            <div class="cl-xl-7 col-lg-8 col-md-10">
            <div class="section-tittle text-center mb-70">
              <span>Oure recent news</span>
              <h2>Our Recent Blog</h2>
            </div>
            </div>
          </div>
            <div class="row">
            {
              posts.map((item, index) => 
                ( 
                <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="single-blogs mb-30">
                    <div class="blog-img">
                      <img src={item.avatar} alt={item.title} />
                    </div>
                    <div class="blogs-cap">
                      <div class="date-info">
                      <span>Pet food</span>
                      <p>Nov 30, 2020</p>
                      </div>
                      <h4>{item.title}</h4>
                      <Link to={`/blog/${item.id}`} class="read-more1">Read more</Link>
                    </div>
                  </div>
                </div>
                )
              )
            }
            </div>
          </div>
        </div>

        <ContactContainer
          name='Tâm Nguyễn'
          phone='0366688888'
          email='tam2012000@gmail.com'
        />

          <div className="contact-animal-owner section-bg" style={{backgroundImage: 'url("https://colorlib.com/preview/theme/petcare/assets/img/gallery/section_bg04.png")'}}>
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-lg-8">
            <div className="contact_text text-center">
            <div className="section_title text-center">
            <h3>Any time you can call us!</h3>
            <p>Because we know that even the best technology is only as good as the people behind it. 24/7 tech support.</p>
            </div>
            <div className="contact_btn d-flex align-items-center justify-content-center">
            <a href="#contact" className="btn white-btn">Contact Us</a>
            <p>Or<a href="#"> +880 4664 216</a></p>
            </div>
            </div>
            </div>
            </div>
            </div>
          </div>

        </div>
      }
    </div>
  );
};

export default Home;