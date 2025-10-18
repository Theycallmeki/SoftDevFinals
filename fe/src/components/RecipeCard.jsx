import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBookmark, removeBookmark, getUserBookmarks } from '../api/bookmarkApi';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export default function RecipeCard({ recipe, currentUser, onDelete }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const isOwner =
    currentUser?.id && recipe?.userId && currentUser.id === recipe.userId;

  // ✅ Always use local backend
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    if (!currentUser || !recipe?.id || isOwner) return;

    (async () => {
      try {
        const bookmarks = await getUserBookmarks();
        setSaved(bookmarks.some((b) => b.id === recipe.id));
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
      }
    })();
  }, [recipe, currentUser, isOwner]);

  const toggleBookmark = async (e) => {
    e.stopPropagation(); // Prevent click from opening details
    if (!currentUser || !recipe?.id) return;

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

  if (!recipe) return null;

  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition relative bg-white cursor-pointer"
      onClick={() => navigate(`/recipes/${recipe.id}`)} // 👈 click redirects to detail page
    >
      {/* Recipe Image */}
      {recipe.image && (
        <img
          src={`${BASE_URL}${recipe.image}`}
          alt={recipe.title || 'Recipe Image'}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}

      {/* Recipe Info */}
      <h3 className="font-semibold text-lg mb-1 text-gray-900">
        {recipe.title || 'Untitled Recipe'}
      </h3>

      <p className="text-gray-700 text-sm mb-2">
        <strong>Ingredients:</strong> {recipe.ingredients || 'N/A'}
      </p>

      <p className="text-gray-700 text-sm mb-3">
        <strong>Instructions:</strong> {recipe.instructions || 'N/A'}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-2">
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe.id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}

        {!isOwner && recipe.id && (
          <button
            onClick={toggleBookmark}
            className="ml-auto text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            title={saved ? 'Remove bookmark' : 'Save recipe'}
          >
            {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            <span className="text-sm font-medium">
              {saved ? 'Saved' : 'Save'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
