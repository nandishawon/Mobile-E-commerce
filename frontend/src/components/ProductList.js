import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProductList = () => {
    const [products, setProducts] = useState([])


    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/productList',{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }

    }

    const handleSearchProduct = async (e) => {
        let key = e.target.value;

        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                 headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
            });
            result = await result.json();

            if (result) {
                console.log(result);
                setProducts(result);
            }
        }
        else {
            getProducts();
        }

    }



    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-product" placeholder="Search Product" onChange={handleSearchProduct} />
            <ul>
                <li>Sl. No.</li>
                <li>Name</li>
                <li>Brand</li>
                <li>Price</li>
                <li>Operation</li>
            </ul>

            {
                products.length>0 ?
                    products.map((item, index) =>  //joto gulo dataset products er moddhe ache tot gulo list map hoye jaabe...
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.brand}</li>
                            <li>Rs.{item.price}</li>
                            <li>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={`/update/${item._id}`}>Update</Link>
                            </li>

                        </ul>
                        
                    )

                    : <h3>No Record Found</h3>
            }
        </div>
    )
}



export default ProductList;