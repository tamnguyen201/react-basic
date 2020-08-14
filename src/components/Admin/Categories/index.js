import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../../actions/postActions';
import { products } from '../../data.json';
import Pagination from "../../../components/pagination";
import axios from "../../../config";
import Loading from '../../Loader/loader'; 

const List = () =>
{
    let history = useHistory();
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    // const [tutorials, setTutorials] = useState([]);
    // const [currentTutorial, setCurrentTutorial] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    // const [searchTitle, setSearchTitle] = useState("");

    

    useEffect(() => {
        // dispatch(postActions.getAll());
        // setPosts(useSelector(state => state.posts.posts));
        axios.get('categories')
        .then(res=>{
            setCategories(res.data);
            setCount(res.data.length);
            setLoading(false);
        })
        .catch(e => console.log(e));

        let mess = localStorage.getItem('actionMessage');
        if (mess) {
            window.alert(mess);
            localStorage.removeItem('actionMessage');
        }

    }, []);

    const deleteCate = (id) => {
        if (window.confirm('Xác nhận xóa?')) {
            axios.get(`posts?cateId=${id}`)
            .then(res=>{
                Promise.all([
                    res.data.map(item=>{
                        axios.put(`posts/${item.id}`,{
                            cateId: 0
                        })
                    })
                ])
                .then(result=>{
                    axios.delete(`categories/${id}`)
                    .then(res => {
                        setCategories(categories.filter(item => item.id !== id))
                        setTimeout(function () {
                        window.alert('Xóa thành công!');
                        }, 350)
                    })
                    .catch(err => console.log(err));

                })
            })
            .catch(err=>console.log(err));
        }
    };

    const [showPerPage, setShowPerPage] = useState(5);
    const [pagination, setPagination] = useState({
      start: 0,
      end: showPerPage,
    });
  
    const onPaginationChange = (start, end) => {
      setPagination({ start: start, end: end });
    };

  return (
    <div className="container">
        <div className="container-fluid mb-5">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0 text-dark">Categories Manager</h1>
            </div>
            </div>
        </div>
            <div className="row">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th className="text-center">Setting</th>
                </tr>
                </thead>
                <tbody>
                    { (isLoading) ? <Loading /> : 
                        categories.slice(pagination.start, pagination.end).map((item, index)=>{
                        return(
                        <tr key={index}>
                            <td>{index+=1}</td>
                            <td>{item.name}</td>
                            <td className="text-center">
                                <Link to={`/admin/categories/edit/${item.id}`} className="btn btn-sm btn-warning" style={{padding:'10px'}}><i className="fas fa-edit"></i></Link>
                                <button onClick={()=>deleteCate(item.id)} className="btn btn-sm btn-danger" style={{padding:'10px'}}><i className="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                        )
                        }
                    )}
                </tbody>
            </table>
            {
                (!isLoading) ?
            <Pagination
                showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                total={count}
            /> : ''
            }
        </div>
    </div>
  );
};


export default List;