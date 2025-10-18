import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../api/RecipeApi';
import { addBookmark, removeBookmark, getUserBookmarks } from '../api/bookmarkApi';
import { getMe } from '../api/authApi';
import { getComments, addComment } from '../api/commentApi';

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

  // ✅ Fetch single recipe directly
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

  // ✅ Fetch user + bookmarks
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

  // ✅ Fetch comments
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
    <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
      <div style={{ flex: 1 }}>
        {recipe.image ? (
          <img
            src={`http://localhost:5000${recipe.image}`}
            alt={recipe.title}
            style={{ width: '100%', borderRadius: '5px' }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div style={{ flex: 2, marginLeft: '20px' }}>
        <h2>{recipe.title}</h2>

        {/* Show creator username */}
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Recipe by: <strong>{recipe.User?.username || 'Unknown User'}</strong>
        </p>

        <p><strong>Ingredients:</strong></p>
        <p>{recipe.ingredients}</p>

        <p><strong>Instructions:</strong></p>
        <p>{recipe.instructions}</p>

        {!isOwner && (
          <button onClick={handleBookmark}>
            {bookmarked ? '★ Remove Bookmark' : '☆ Add to Bookmarks'}
          </button>
        )}

        {message && <p>{message}</p>}

        {/* Comments */}
        <div style={{ marginTop: '30px' }}>
          <h3>Comments</h3>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <p style={{ margin: 0 }}>
                  <strong>{c.User?.username || 'Anonymous'}:</strong> {c.text}
                </p>
                <small style={{ color: '#888' }}>
                  {new Date(c.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}

          {currentUser ? (
            <div style={{ marginTop: '15px' }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                style={{ width: '100%', height: '80px', borderRadius: '5px', padding: '8px' }}
              ></textarea>
              <button onClick={handleAddComment} style={{ marginTop: '8px' }}>
                Post Comment
              </button>
            </div>
          ) : (
            <p style={{ color: '#888' }}>Log in to post a comment.</p>
          )}
        </div>

        <br />
        <button onClick={() => navigate('/recipes')}>← Back to Recipes</button>
      </div>
    </div>
  );
}
