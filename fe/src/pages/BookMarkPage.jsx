import React, { useEffect, useState } from "react";
import { getUserBookmarks, removeBookmark } from "../api/bookmarkApi";
import { getMe } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "../assets/bookmarkPage.css";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const loadBookmarks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUserBookmarks();
      setBookmarks(data);
    } catch (err) {
      setError(err.message || "Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const data = await getMe();
      setCurrentUser(data.user);
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    loadCurrentUser();
    loadBookmarks();
  }, []);

  // ✅ Unsave and redirect
  const handleUnsave = async (recipeId, e) => {
    e.stopPropagation(); // Prevent navigation when clicking Unsave
    try {
      await removeBookmark(recipeId);
      setBookmarks((prev) => prev.filter((r) => r.id !== recipeId));
      navigate("/recipes");
    } catch (err) {
      console.error("Failed to unsave recipe:", err);
    }
  };

  return (
    <div className="bookmarks-page">
      <h2 className="bookmarks-title">My Saved Recipes</h2>

      {loading ? (
        <p className="loading-text">Loading bookmarks...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : bookmarks.length === 0 ? (
        <p className="empty-text">You haven’t saved any recipes yet.</p>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map((recipe) => (
            <div
              className="Recipe-Card"
              key={recipe.id}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {recipe.image && (
                <img
                  src={`http://localhost:5000${recipe.image}`}
                  alt={recipe.title}
                />
              )}
              <div className="recipe-card-content">
                <h3>{recipe.title}</h3>

                {/* ✅ Unsave Button */}
                <button
                  onClick={(e) => handleUnsave(recipe.id, e)}
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ff4da6",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff1a8c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff4da6")
                  }
                >
                  Unsave
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
