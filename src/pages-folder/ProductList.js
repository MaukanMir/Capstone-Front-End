import React from 'react'
import styled from 'styled-components'
import Navbar from '../components-folder/Navbar';
import Annoumcement from '../components-folder/Annoumcement';
import Products from '../components-folder/Products';
import Newsletter from '../components-folder/Newsletter';
import Footer from '../components-folder/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router';
import { useState } from 'react';

const Container = styled.div`

`;
const FilterContainer = styled.div`
display:flex;
justify-content: space-between;
`;
const Filter = styled.div`
margin:20px;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const Title = styled.h1`
margin: 20px;
text-transform:capitalize;
`;

const FilterText = styled.span`
font-size: 20px;
font-weight:600;
margin-right: 20px;
 ${mobile({ marginRight: "0px" })}
`
const Select = styled.select`
padding: 10px;
margin-right: 20px;
 ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;



const ProductList = () => {
    const location = useLocation();

    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("latest");

    console.log(cat)

    const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };


    return (
        <Container>
            <Annoumcement />
            <Navbar />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter><FilterText> Find the right styles: </FilterText>
                {/* <Select name ="color" onChange = {handleFilters}>
                <Option disabled >Color</Option>
                <Option>white</Option>
                <Option>black</Option>
                <Option>red</Option>
                <Option>blue</Option>
                <Option>yellow</Option>
                <Option>green</Option> 
            </Select> */}
            <Select name ="size" onChange = {handleFilters}>
            <Option disabled >Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
          </Select>
          </Filter>
                <Filter> 
                <FilterText>Organize by Feature:</FilterText>
            <Select onChange ={(e) => setSort(e.target.value)}>
            <Option value ="latest">Latest</Option>
            <Option value ="highest">Price ( Highest )</Option>
            <Option value ="lowest">Price ( Lowest )</Option>
          </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList
