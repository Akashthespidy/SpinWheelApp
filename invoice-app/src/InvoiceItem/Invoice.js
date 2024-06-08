import React, { useState } from 'react';
import InvoiceItem from './InvoiceItem';

const Invoice = () => {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const addItem = () => {
    setItems([...items, { description, quantity, price }]);
    setDescription('');
    setQuantity(1);
    setPrice(0);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div>
      <h1>Invoice</h1>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div>
        {items.map((item, index) => (
          <InvoiceItem key={index} item={item} />
        ))}
      </div>
      <h2>Total: ${calculateTotal().toFixed(2)}</h2>
    </div>
  );
};

export default Invoice;
