import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../../actions/postActions';
import { products } from '../../data.json';
import Pagination from "../../../components/pagination";
import axios from "../../../config";
import Loading from '../../Loader/loader'; 

const CommentsList = () =>
{
    let { postId } = useParams();
    let history = useHistory();
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setLoading] = useState(true);

    

    useEffect(() => {
        axios.get(`posts/${postId}/comments`)
        .then(res=>{
            setComments(res.data);
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

    const deleteComment = (id) => {
        if (window.confirm('Xác nhận xóa?')) {
            axios.delete(`posts/${postId}/${id}`)
            .then(res => {
                setComments(comments.filter(item => item.id !== id))
                setTimeout(function () {
                window.alert('Xóa thành công!');
                }, 350)
            })
            .catch(err => console.log(err));
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
                <h1 className="m-0 text-dark">Comments Manager</h1>
            </div>
            </div>
        </div>
            <div className="row">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Content</th>
                    <th className="text-center">Setting</th>
                </tr>
                </thead>
                <tbody>
                    { (isLoading) ? <Loading /> : 
                        comments.slice(pagination.start, pagination.end).map((item, index)=>{
                        return(
                        <tr key={index}>
                            <td>{index+=1}</td>
                            <td>{item.content}</td>
                            <td className="text-center">
                                <button onClick={()=>deleteComment(item.id)} className="btn btn-sm btn-danger"><i className="fas fa-trash-alt"></i></button>
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


export default CommentsList;