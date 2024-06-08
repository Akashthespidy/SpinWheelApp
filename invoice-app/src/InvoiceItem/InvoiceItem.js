import React from 'react';

const InvoiceItem = ({ item }) => {
  return (
    <div>
      <span>{item.description}</span>
      <span>{item.quantity}</span>
      <span>${item.price.toFixed(2)}</span>
      <span>${(item.quantity * item.price).toFixed(2)}</span>
    </div>
  );
};

export default InvoiceItem;
