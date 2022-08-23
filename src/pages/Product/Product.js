import React, { useEffect, useState } from 'react';
import { useData } from '../../context';
import "./Product.css";
import { ProductCard } from './components/ProductCard';
import { ProductFilterBar } from "./components/ProductFilterBar";
import { filterData, sortData } from '../../utils';
import { searchProduct } from "../../utils/getFilterData";

export function Product(){
    const {
        category,
        products: data,
        sortBy,
        priceRange,
        sortByRating,
        setLoader,
        search,
        drawer,
        setDrawer,
        changeTitle,
      } = useData();

      const searchData = searchProduct([...data], search);
      const filteredData = filterData([...searchData], category);
      const sortedData = sortData([...filteredData], sortBy, priceRange, sortByRating);

      useEffect(() => {
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      }, [])

    return(
        <div className="product-main-container">
          <ProductFilterBar />
          <div className="product-list-container" onClick={() => drawer && setDrawer(!drawer)}>
            <div className="product-list-header">
              {sortedData.length > 0 ? (
                <><h2>All Products</h2><p className="paragraph-medium">(Showing {sortedData.length} Products)</p></>
              ):(
                data.length > 0 && <><h2>Sorry, no results found!</h2> <p className="paragraph-medium">Please check the spelling or try searching for something else</p></>
              )}
            </div>

            <div className="product-item-container">
              {sortedData.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
    );
}