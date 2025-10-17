const API_URL = "http://localhost:5000/api/auth";

// Login (sets HTTP-only cookie)
export const login = async ({ username, password }) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include", // important to send cookie
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { user }
};

// Register (optional auto-login)
export const register = async ({ username, password, level }) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, level }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json(); // { user }
};

// Logout (clears cookie)
export const logout = async () => {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json(); // { message }
};

// Get current logged-in user (persistent login)
export const getMe = async () => {
  const res = await fetch(`${API_URL}/me`, {
    credentials: "include", // important to send cookie
  });
  if (!res.ok) throw new Error("Not logged in");
  return res.json(); // { user }
};
