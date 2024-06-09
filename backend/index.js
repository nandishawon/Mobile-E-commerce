const express = require('express');
const cors = require('cors')
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');


const jwtKey = 'e-comm';  //we can make a ENV file and put it inside that...

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ Warning: "Something Went Wrong..." })
        }
        resp.send({ result, auth: token })
    })

});

app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ Warning: "Something Went Wrong..." })
                }
                resp.send({ user, auth: token })
            })

        }
        else {
            resp.send({ Warning: "No user found..." });

        }
    }
    else {
        resp.send({ Warning: "Invalid credentials , enter email & password for login..." });
    }
});


app.post('/add-product',verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get('/productList',verifyToken, async (req, resp) => {
    let list = await Product.find();
    if (list.length > 0) {
        resp.send(list)
    }
    else {
        resp.send({ Warning: "No Product Found" })  //error value ta keo json format ei patha te hbe...
    }
});

app.delete('/product/:_id',verifyToken, async (req, resp) => {
    let result = await Product.deleteOne(req.params)
    resp.send(result);
});

app.get('/product/:_id',verifyToken, async (req, resp) => {
    let product = await Product.findOne(req.params);
    if (product) {
        resp.send(product)
    }
    else {
        resp.send({ Warning: "No Product Found" })
    }
});


app.put('/product/:_id',verifyToken, async (req, resp) => {
    let data = await Product.updateOne(
        (req.params),
        {
            $set: req.body
        }
    )
    if (data) {
        resp.send(data)
    }
    else {
        resp.send({ Warning: "No Data To Change" })
    }
});

app.put('/update/:productId',verifyToken, async (req, resp) => {
    let data = await Product.updateOne(
        {
            "name": { $regex: req.params.productId }   //$or , name , brand will work with or without  " " ....   
        },
        {
            $set: req.body
        }
    );
    if (data) {
        resp.send(data)
    }
    else {
        resp.send({ Warning: "No Data To Change" })
    }
});


app.get('/search/:key',verifyToken, async (req, resp) => {
    let data = await Product.find(
        {
            $or: [
                { name: { $regex: req.params.key } },   //$or , name , brand will work with or without  " " ....
                { brand: { $regex: req.params.key } },
            ]
        })

    if (data) {
        resp.send(data);
    }
    else {
        resp.send([]);
    }

});

function verifyToken(req, resp, next) {  //req & resp aage  middleware die pass hbe...
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1]  //returns array...
        console.warn("middleware called", token);
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ Warning: "Please provide valid token..." })
            }
            else {
                next();
            }
        })
    }
    else {
        resp.status(403).send({ Warning: "Please add token with header" })
    }


}

// app.put()
app.listen(5000);