import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/Signup';
import PrivateRoute from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';
import UpdateProductById from './components/UpdateProductById';
import Profile from './components/Profile';


function App() {
  return (
    <div className="App">  {/*This is not html, this is JSX or JavaScript Xml...*/}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProductById />} />
            <Route path="/update" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
