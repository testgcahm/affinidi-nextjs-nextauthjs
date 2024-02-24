import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from 'src/components/Header';
import ProductDisplay from 'src/components/ProductDisplay';
import Modal from 'src/components/Modal';
import Cart from 'src/components/Cart';
import Checkout from 'src/components/Checkout';

function App() {
  const [cartItems, setCartItems] = useState(() => { });
  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart');
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [])
  const [showModal, setShowModal] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      let updatedItems = [];
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      sessionStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems
    });
    setShowModal(true);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductDisplay addToCart={addToCart} />
                {showModal && <Modal closeModal={closeModal} />}
              </>
            }
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/checkout" element={<Checkout clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;