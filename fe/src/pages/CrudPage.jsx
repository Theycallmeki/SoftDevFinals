import React, { useEffect, useState } from 'react';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from '../api/RecipeApi';

function CrudPage() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (err) {
      console.error('Error loading recipes:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateRecipe(editId, form);
        setEditId(null);
      } else {
        await addRecipe(form);
      }
      setForm({ title: '', ingredients: '', instructions: '', image: null });
      loadRecipes();
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  const handleEdit = (recipe) => {
    setForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: null, // image not reloaded during edit
    });
    setEditId(recipe.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      loadRecipes();
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🍳 Manage Recipes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="Recipe Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={form.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={form.instructions}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleChange} accept="image/*" />

        <button type="submit">{editId ? 'Update' : 'Add'} Recipe</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>ID</th>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.title}</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{recipe.ingredients}</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{recipe.instructions}</td>
                <td>
                  {recipe.image ? (
                    <img
                      src={`http://localhost:5000${recipe.image}`}
                      alt={recipe.title}
                      style={{ width: 80, height: 80, objectFit: 'cover' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(recipe)}>✏️</button>
                  <button onClick={() => handleDelete(recipe.id)} style={{ marginLeft: 5 }}>
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No recipes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CrudPage;
