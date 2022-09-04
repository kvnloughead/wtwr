import React from 'react';

import ItemCard from '../ItemCard/ItemCard';
import './ItemModal.css';

function ItemModal({ card }) {
  return (
    card !== '' && (
      <div className="overlay">
        <ItemCard modal data={card} />
      </div>
    )
  );
}

export default ItemModal;
