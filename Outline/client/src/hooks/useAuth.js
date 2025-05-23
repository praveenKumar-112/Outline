// src/hooks/useAuth.js
const useAuth = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    token,
    user,
    isAdmin: user?.isAdmin || false,
    isLoggedIn: !!token
  };
};

export default useAuth;
