// src/pages/Register.jsx
import { useState } from "react";
import { register } from "../api/authApi"; // make sure this points to your backend helper

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("Registering user with data:", { username, password }); // <-- added

      const data = await register({ username, password });

      console.log("Backend response:", data); // <-- added

      setSuccess("Registration successful! You can now login.");
      onRegister?.(data.user);

      setUsername("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      console.error("Registration error:", err); // <-- added
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold text-center">Register</h2>

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
