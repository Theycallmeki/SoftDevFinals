import React, { useEffect, useState, useCallback } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../api/RecipeApi';
import { addBookmark, removeBookmark, getUserBookmarks } from '../api/bookmarkApi';
import { getMe } from '../api/authApi';
import { getComments, addComment } from '../api/commentApi';
import "../main.css";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const loadRecipe = useCallback(async () => {
    try {
      const data = await getRecipeById(id);
      setRecipe(data);
    } catch {
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const loadUserAndBookmarks = useCallback(async () => {
    try {
      const userData = await getMe();
      setCurrentUser(userData.user);
      const bookmarks = await getUserBookmarks();
      const isBookmarked = bookmarks.some((b) => b.id === parseInt(id));
      setBookmarked(isBookmarked);
    } catch {
      setCurrentUser(null);
    }
  }, [id]);

  const loadComments = useCallback(async () => {
    try {
      const data = await getComments(id);
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  }, [id]);

  useEffect(() => {
    loadRecipe();
    loadUserAndBookmarks();
    loadComments();
  }, [loadRecipe, loadUserAndBookmarks, loadComments]);

  const handleBookmark = async () => {
    if (!currentUser) return setMessage('Please log in to bookmark recipes.');
    try {
      if (bookmarked) {
        await removeBookmark(id);
        setBookmarked(false);
        setMessage('Removed from bookmarks.');
      } else {
        await addBookmark(id);
        setBookmarked(true);
        setMessage('Recipe bookmarked!');
      }
    } catch (err) {
      setMessage(err.message || 'Bookmark action failed.');
    }
  };

  const handleAddComment = async () => {
    if (!currentUser) return setMessage('Please log in to comment.');
    if (!newComment.trim()) return;
    try {
      await addComment(id, newComment);
      setNewComment('');
      await loadComments();
    } catch {
      setMessage('Failed to add comment.');
    }
  };

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  const isOwner = currentUser?.id === recipe?.userId;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail-image">
        {recipe.image ? (
          <img src={`http://localhost:5000${recipe.image}`} alt={recipe.title} />
        ) : (
          <p className="no-image-text">No image available</p>
        )}
      </div>

      <div className="recipe-detail-info">
        {/* Title and Author */}
        <div>
          <h2 className="recipe-detail-title">{recipe.title}</h2>
          <p className="recipe-detail-author">
            Recipe by: <strong>{recipe.User?.username || 'Unknown User'}</strong>
          </p>
        </div>

        {/* Ingredients */}
        <div>
          <p className="section-label">Ingredients:</p>
          <p className="section-content">{recipe.ingredients}</p>
        </div>
        <div>
          <p className="section-label">Instructions:</p>
          <p className="section-content">{recipe.instructions}</p>
        </div>

      {/* Bookmark Button */}
{!isOwner && (
  <button
    className={`bookmark-btn ${bookmarked ? 'bookmarked' : 'not-bookmarked'}`}
    onClick={async () => {
      await handleBookmark(); // Save or unsave
      if (!bookmarked) {
        // ✅ Redirect only after saving (not when removing)
        setTimeout(() => navigate('/bookmarks'), 300);
      }
    }}
  >
    {bookmarked ? '★ Remove Bookmark' : '☆ Add to Bookmarks'}
  </button>
)}



        {message && <p className="recipe-detail-message">{message}</p>}

        {/* Comments */}
        <div className="comments-section">
          <h3 className="comments-title">Comments</h3>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment-item">
                <p>
                  <strong>{c.User?.username || 'Anonymous'}:</strong> {c.text}
                </p>
                <small>{new Date(c.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="no-comments-text">No comments yet. Be the first to comment!</p>
          )}

          {currentUser && (
            <div className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
              />
              <button onClick={handleAddComment}>Post Comment</button>
            </div>
          )}
        </div>

        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/recipes')}>
          ← Back to Recipes
        </button>
      </div>
    </div>
  );
}
