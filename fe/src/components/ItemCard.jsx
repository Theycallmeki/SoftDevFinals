import React from 'react';

export default function ItemCard({ item, onDelete }) {
  return (
    <div className="border rounded p-4 shadow">
      {item.picture && (
        <img
          src={`http://localhost:5000${item.picture}`}
          alt={item.name}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="font-bold mb-2">₱{item.price}</p>
      <p className="text-sm text-gray-500 mb-2">Stock: {item.stock}</p>
      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
}
