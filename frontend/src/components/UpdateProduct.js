import React, {useState } from "react";
import {useNavigate} from 'react-router-dom';

const UpdateProductById = () => {
    const [name, setName] = useState("")
    const [brand, setBrand] = React.useState("")
    const [price, setPrice] = useState("")
    const [productId, setProductId] = useState("")
    const [error, setError] = React.useState(false)


    const handleProductId= (e) => {
        setProductId(e.target.value)
    }
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
     

    const updateProduct = async () => {

        if (!productId || !name || !price || !brand) {
            setError(true)
            return false;
        }

       let result = await fetch(`http://localhost:5000/update/${productId}`,{
        method: 'Put',
        body : JSON.stringify({name,brand,price}),
        headers : {
            'Content-Type' : 'application/json',
            authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       });
       result = await result.json();
       console.log(result);
       
       if(result.modifiedCount){
        alert(`Product Details Updated`);
        navigate('/');
       }     
       else{
        alert(`Invalid Product Details`);
       }
    }


    return (
        <div className="add-product">
            <h2>Update Product</h2>
            <input type="text" className='inputBox' placeholder="Enter Product Id" value={productId} onChange={handleProductId} />
            {error && !productId && <span className="invalid-input">Enter Valid Product Id</span>}

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