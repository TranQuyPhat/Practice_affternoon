import React, { useContext } from 'react';
import AuthContext from '../context';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services/api';

interface IFormInput {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  })
  .required();

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const result = await login(data.username, data.password);
    const authenticatedUser = {
      id: result.loggedInUser.id,
      email: result.loggedInUser.email,
      access_token: result.access_token,
    };
    setUser(authenticatedUser);
    localStorage.setItem('user', JSON.stringify(authenticatedUser));
    localStorage.setItem('access_token', result.access_token);
    window.location.href = '/tasks';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register('username')}
            type="text"
            id="username"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md hover:opacity-90 transition-opacity font-semibold"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Forgot <a href="#" className="text-blue-600 hover:underline">Password?</a>
          <br />
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  );
}
