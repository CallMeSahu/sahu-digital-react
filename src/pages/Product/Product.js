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
    return(
        <div>
        {sortedData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
    )
}