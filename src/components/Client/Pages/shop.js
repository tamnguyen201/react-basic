import React, { useState, useEffect } from 'react';
import { products } from '../../data.json';

const CartItem = props => {
  return(
     props.data.map((item, index)=>{
      return( 
        <div className="col-lg-3 mb-5" key={index}>
          <div className="card">
              <img className="card-img-top img-fluid" src="https://1.bp.blogspot.com/--8AfOw0NV5w/XU5hJfuKSAI/AAAAAAAABSQ/mc8I-n_-G0MiYLUnSZDkuhoYUTl3cW8HQCLcBGAs/w350/web-design.jpg" alt="Card image" />
              <div className="card-body">
                <h5 className="card-title"><a href="" className="text-decoration-none">{item.name}</a></h5>
                <a href="{item.name}" className="text-decoration-none">{item.name}</a>
                <p className="text-decoration-none">{item.name}</p>
                <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
              </div>
            </div>
        </div>
        )
      }
    )
  )
}
const Shop = () =>
{
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });  

  return (
    console.log(count),
    <div className="container-fluid">
      <h1> Đây là trang Shop  </h1>
      <button onClick={() => setCount( count+1 )}>Click</button>

      <div className="container">
        <div className="row">
          <CartItem data={products} />         
        </div>
      </div>
    </div>
  );
};


export default Shop;