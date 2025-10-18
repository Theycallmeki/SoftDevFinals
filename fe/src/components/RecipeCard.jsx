import React from 'react';

export default function RecipeCard({ recipe, onDelete }) {
  return (
    <div className="border rounded p-4 shadow">
      {recipe.image && (
        <img
          src={`http://localhost:5000${recipe.image}`}
          alt={recipe.title}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}

      <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
      <p className="text-gray-600 text-sm mb-2">
        <strong>Ingredients:</strong> {recipe.ingredients}
      </p>
      <p className="text-gray-600 text-sm mb-3">
        <strong>Instructions:</strong> {recipe.instructions}
      </p>

      {onDelete && (
        <button
          onClick={() => onDelete(recipe.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
}
