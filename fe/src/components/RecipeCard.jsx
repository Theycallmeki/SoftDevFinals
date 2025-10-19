import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { addBookmark, removeBookmark, getUserBookmarks } from '../api/bookmarkApi';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import "../main.css"; 

export default function RecipeCard({ recipe, currentUser, onDelete }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const isOwner =
    currentUser?.id && recipe?.userId && currentUser.id === recipe.userId;

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
    e.stopPropagation();
    if (!currentUser || !recipe?.id) return;

    try {
      if (saved) {
        await removeBookmark(recipe.id);
        setSaved(false);
        navigate('/recipes');
      } else {
        await addBookmark(recipe.id);
        setSaved(true);
        navigate('/bookmarks');
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
    }
  };

  if (!recipe) return null;

  return (
    <div className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
      {recipe.image && (
        <img src={`${BASE_URL}${recipe.image}`} alt={recipe.title || 'Recipe Image'} />
      )}
      
      <h3>{recipe.title || 'Untitled Recipe'}</h3>

      {/* ✅ Fixed ingredients section with indentation and line breaks */}
      <div className="recipe-section">
        <p><strong>Ingredients:</strong></p>
        <pre className="recipe-text">{recipe.ingredients || 'N/A'}</pre>
      </div>

      <div className="recipe-card-buttons">
        {onDelete && (
          <button
            className="recipe-card-delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(recipe.id); }}
          >
            Delete
          </button>
        )}

        {!isOwner && recipe.id && (
          <button
            className={`recipe-card-bookmark-btn ${saved ? 'saved' : 'not-saved'}`}
            onClick={(e) => toggleBookmark(e)}
            title={saved ? 'Remove bookmark' : 'Save recipe'}
          >
            {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
