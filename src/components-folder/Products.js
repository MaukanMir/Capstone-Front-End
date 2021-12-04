import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
// import { popularProducts } from '../data';
import Product from './Product';
import axios from "axios"
import { infoRequests, BASE_URL } from '../CleanMethods';



const Container = styled.div`
padding:20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;
const Products = ({  cat, filters, sort }) => {


    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    

    useEffect(() => {
        
        const findProducts = async ()=>{
            try{
                const response = await axios.get( cat ? `${infoRequests}products?category=${cat}`: BASE_URL + "products")

                setProducts(response.data);
            }catch(err){

            }
        }
        findProducts()
    }, [cat]);

    console.log(products)
    console.log(cat)




    useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);


    useEffect(()=>{
        if(sort === "latest"){
            setFilteredProducts((change) => [...change].sort((a,b) => a.createdAt - b.createdAt));
        }else if(sort ==="highest"){
            setFilteredProducts((change) => [...change].sort((a,b) => b.price - a.price));
        }else{
            setFilteredProducts((change) => [...change].sort((a,b) => a.price - b.price));
        }
    }, [sort]);


    return (
        <Container>
           { cat ? filteredProducts.map((item)=>
           <Product item = {item} key = {item._id} />
           ):products.slice(0,8).map((item) => <Product item = {item} key = {item._id} />)} 
        </Container>
    )
}

export default Products
