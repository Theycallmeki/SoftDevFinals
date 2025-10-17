import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  // If user is undefined (still loading), render nothing or a loader
  if (user === undefined) return <p>Loading...</p>;

  // If user is null, redirect to login
  if (!user) return <Navigate to="/login" />;

  return children;
}
