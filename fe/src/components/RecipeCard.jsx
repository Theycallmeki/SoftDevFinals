import React, { useState, useEffect } from 'react';
import { addBookmark, removeBookmark, getUserBookmarks } from '../api/bookmarkApi';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export default function RecipeCard({ recipe, onDelete }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const bookmarks = await getUserBookmarks();
        setSaved(bookmarks.some(b => b.id === recipe.id));
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
      }
    })();
  }, [recipe.id]);

  const toggleBookmark = async () => {
    try {
      if (saved) {
        await removeBookmark(recipe.id);
        setSaved(false);
      } else {
        await addBookmark(recipe.id);
        setSaved(true);
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
    }
  };

  return (
    <div className="border rounded p-4 shadow relative">
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

      <div className="flex justify-between items-center">
        {onDelete && (
          <button
            onClick={() => onDelete(recipe.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}

        <button
          onClick={toggleBookmark}
          className="ml-auto text-blue-600 hover:text-blue-800 flex items-center gap-1"
          title={saved ? 'Remove bookmark' : 'Save recipe'}
        >
          {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          <span className="text-sm">{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}
