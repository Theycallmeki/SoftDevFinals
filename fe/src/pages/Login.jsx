import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ username, password });
      console.log("Login successful:", data); // debug
      // No localStorage needed; cookie is automatically set by backend
      onLogin?.(data.user); // update parent App state
      navigate("/"); // redirect to homepage
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm">
          Don't have an account? <a href="/register" className="underline">Register</a>
        </p>
      </form>
    </div>
  );
}
