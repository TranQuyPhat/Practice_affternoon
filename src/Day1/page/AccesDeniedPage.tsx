import React from 'react';
import { Link } from 'react-router';

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
      >
        Go to Login
      </Link>
    </div>
  );
}
