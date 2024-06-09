import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';

const UpdateProductById = () => {
    const [name, setName] = useState("")
    const [brand, setBrand] = React.useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = React.useState(false)


    const params = useParams(); //returns as object...

    useEffect(()=>{
        getProductDetails();
    },[])  // [] is for oneTime use of getProductDetails()...Second param is the dependencyList --> If present, effect will only activate if the values in the list change.

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleBrand = (e) => {
        setBrand(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }


    const navigate = useNavigate();
     
    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setBrand(result.brand);
        setPrice(result.price);
    }

    const updateProduct = async () => {

        if (!name || !price || !brand) {
            setError(true)
            return false;
        }

       let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method: 'Put',
        body : JSON.stringify({name,brand,price}),
        headers : {
            'Content-Type' : 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       });
       result = await result.json();
       console.log(result);
       
       if(result.modifiedCount){
        alert(`Product Details Updated`);
        navigate('/');
       }
       else{
        alert(`No Product Details Updated`);
       }
       
    }


    return (
        <div className="add-product">
            <h2>Update Product</h2>
            <input type="text" className='inputBox' placeholder="Enter Product Name" value={name} onChange={handleName} />
            {error && !name && <span className="invalid-input">Enter Valid Name</span>}

            <input type="text" className='inputBox' placeholder="Enter Product Brand" value={brand} onChange={handleBrand} />
            {error && !brand && <span className="invalid-input">Enter Valid Brand Name</span>}

            <input type="number" className='inputBox' placeholder="Enter Product Price" value={price} onChange={handlePrice} />
            {error && !price && <span className="invalid-input">Enter Valid Price</span>}

            <button className='button' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProductById;