import React, { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("")
    const [brand, setBrand] = React.useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = React.useState(false)

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleBrand = (e) => {
        setBrand(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }


    const addProduct = async () => {

     //   console.warn(!name); //  retruns true-false or boolean...
        if (!name || !price || !brand) {
            setError(true)
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id; //jokhon local tsorage theke kono maal uthabo tokhn json.parse() lagate hbe...

        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, brand, price, userId }),
            headers: {
                'Content-Type' : 'application/json',
                 authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })

        result = await result.json();
        console.log(result);

        if(result._id){
            alert(`${name} Added Successfully`)
        }
        else{
            alert(result.Warning);
        }

    }


    return (
        <div className="add-product">
            <h2>Add Product</h2>
            <input type="text" className='inputBox' placeholder="Enter Product Name" value={name} onChange={handleName} />
            {/* Coditional Rendering: inline-if with logical && operator*/}
            {error && !name && <span className="invalid-input">Enter Valid Name</span>}

            <input type="text" className='inputBox' placeholder="Enter Product Brand" value={brand} onChange={handleBrand} />
            {error && !brand && <span className="invalid-input">Enter Valid Brand Name</span>}

            <input type="number" className='inputBox' placeholder="Enter Product Price" value={price} onChange={handlePrice} />
            {error && !price && <span className="invalid-input">Enter Valid Price</span>}

            <button className='button' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;