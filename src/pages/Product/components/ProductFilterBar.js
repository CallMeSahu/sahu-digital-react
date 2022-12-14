import React from 'react';
import "./ProductFilterBar.css";
import { ACTION_TYPE } from '../../../utils';
import { useData } from '../../../context';

const STARS = [1, 2, 3, 4];

export function ProductFilterBar(){
    const {
        dataDispatch,
        sortBy,
        priceRange,
        sortByRating,
        products,
        category,
        drawer,
        setDrawer,
      } = useData();
    
      const changeHandler = (typeOfDispatch, typeOfAction, e) => {
        dataDispatch({
          type: typeOfDispatch,
          payload:
            typeOfDispatch === "CATEGORY"
              ? { [typeOfAction]: e.target.checked }
              : typeOfAction,
        });
      };  
    
      const isSortByRating = (star) => sortByRating && sortByRating === star;
      const isSortByPrice = (type) => sortBy && sortBy === type;
    

    return(
        <div className={`filter-container ${drawer ? "trans-on" : "trans-off"}`}>
            <div className='filter-head'>
                <h3>Filters</h3>
                <p className="paragraph-medium clr-flt-btn"
                onClick={() => {
                    changeHandler(ACTION_TYPE.CLEAR_FILTER, products);
                    setDrawer(!drawer);
                }}
                >Clear</p>
            </div>

            <div className="filter-price">
                <h4>Price</h4>
                <div className="flex-gap">
                    <div className="price-range">
                        <p className="check-desc">₹25K</p>
                        <p className="check-desc">₹50K</p>
                        <p className="check-desc">₹75K+</p>
                    </div>
                    <input type="range" className="slider" name="rangeInput" min="25000" max="75000" value={priceRange}
                    onChange={(e) => 
                        changeHandler(ACTION_TYPE.PRICE_RANGE, e.target.value, e)
                    }
                    />
                </div>
            </div>
            
            <div className="filter-category">
                <h4>Category</h4>
                <div className="flex-gap">
                    {Object.entries(category).map((item) => {
                        const [catName, isCatChecked] = item;
                        return (
                            <label key={item} className="select-input">
                                <input
                                    type="checkbox"
                                    name="light"
                                    className="checkbox-input"
                                    checked={isCatChecked}
                                    onChange={(e) =>
                                        changeHandler(ACTION_TYPE.CATEGORY, catName, e)
                                    }
                                />
                                <span className='check-desc'>
                                    {catName}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="filter-rating">
                <h4>Rating</h4>
                <div className="flex-gap">
                    {STARS.map((star) => (
                        <label key={star} className="select-input">
                            <input
                                type="radio"
                                name='rating'
                                className='input-radio'
                                value=""
                                checked={isSortByRating(star)}
                                onChange={()=> {
                                    changeHandler(ACTION_TYPE.SORT_BY_RATING, star);
                                }}
                            />
                            <span className='check-desc'>{star} Star & Above</span>
                        </label>
                    ))}
                </div>    
            </div>  

            <div className="filter-sort">
                <h4>Sort By</h4> 
                <div className="flex-gap">
                   <label className='select-input'>
                    <input
                        type="radio"
                        name='sort'
                        className='radio-input'
                        checked={isSortByPrice("LOW_TO_HIGH")}
                        onChange={() => changeHandler(ACTION_TYPE.SORT_BY, "LOW_TO_HIGH")}
                    />
                    <span className='check-desc'>Price: Low to High</span>             
                   </label>
                   <label className='select-input'>
                    <input
                        type="radio"
                        name='sort'
                        className='radio-input'
                        checked={isSortByPrice("HIGH_TO_LOW")}
                        onChange={() => changeHandler(ACTION_TYPE.SORT_BY, "HIGH_TO_LOW")}
                    />
                    <span className='check-desc'>Price: High to Low</span>             
                   </label>
                </div>                
            </div> 
        </div>
    );
}