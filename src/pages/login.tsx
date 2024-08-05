import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:5000/login'; // Update with your backend login URL
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with OAuth
      </button>
    </div>
  );
};

export default LoginPage;
