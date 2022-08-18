import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Home.css";
import { ACTION_TYPE } from '../../utils';
import { useData } from '../../context';

export function Home(){
    const [categories, setCategories] = useState();
    const navigate = useNavigate;
    const { dataDispatch, changeTitle } = useData();

    useEffect(() => {
        changeTitle("Online Shopping Electronics Store");
        axios
        .get("/api/categories")
        .then((response) => setCategories(response.data.categories))
        .catch((error) => console.log(error));
    }, [])

    const categoryHandler = (categoryName) => {
        dataDispatch({ 
            type: ACTION_TYPE.CATEGORY,
            payload: { [categoryName]: true},
        }); 
        navigate("/product");
    };

    return(
        <>
        <div className="home-container">
           <div className="home-img-container">
                <div className="bg-img-container"></div>
                <div className="home-page-text">
                    <div className="main-text">
                    <div>
                        <h1>A market place</h1>
                        <h1>for all your Digital Needs!</h1>
                    </div>
                    <Link to="/product">
                      <button className='shop-now-btn'>SHOP NOW</button>
                    </Link>
                    </div>
                </div>
           </div>

           <div className="catagory-container flex-center">
            <div className="catagory-heading text-center">
                <h2>Popular Brands</h2>
            </div>
            <div className="catagory-row">
                {categories && categories.map(({_id, categoryName}) => {
                    return (
                        <div className="box" key={_id} onClick={() => categoryHandler(categoryName)}>
                            <div className='detail-box text-center'>
                                <h4>{categoryName}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
           </div>
        </div>
        <div className="footer flex-center">
            <h4>Made with ❤️ by Siddhartha Sahu</h4>
            <div className="icon-bar">
                <a href="https://github.com/CallMeSahu" className="github">
                    <i className="fa fa-github" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com/in/siddhartha-sahu/" className="linkedin">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="https://twitter.com/CallMeSahu" className="twitter">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
            </div>
        </div>
        </>               
    )
}