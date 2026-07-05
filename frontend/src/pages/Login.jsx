import { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [ currentState, setCurrentState ] = useState('Sign Up');
  
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currentState === 'Sign Up') {
      axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        .then((response) => {
          console.log('Sign Up response:', response.data);
          if (response.data.success) {
          toast.success('Sign Up successful!');
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
        })
        .catch((error) => {
          console.error('Sign Up error:', error);
          toast.error('An error occurred during Sign Up. Please try again.');
        });
    }
    else {
      axios.post(`${backendUrl}/api/user/login`, { email, password })
        .then((response) => {
          console.log('Login response:', response.data);
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/');
          } else {
            toast.error(`Login failed: ${response.data.message}`);
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
          toast.error('An error occurred during Login. Please try again.');
        });
    }
  }

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' onSubmit={onSubmitHandler}>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Sign Up' && (
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-full py-2 px-3 border border-gray-800 focus:outline-none focus:ring-2 focus:border-shop_light_green focus:ring-shop_light_green'/>
      )}
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full py-2 px-3 border border-gray-800 focus:outline-none focus:ring-2 focus:border-shop_light_green focus:ring-shop_light_green'/>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='w-full py-2 px-3 border border-gray-800 focus:outline-none focus:ring-2 focus:border-shop_light_green focus:ring-shop_light_green'/>
      <div className='text-sm -mt-1 flex items-center gap-2 w-full justify-between'>
        <span className='text-shop_light_green hover:underline cursor-pointer'>
          Forgot Password?
        </span>
        <p className='text-gray-600 '>
          {currentState === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
          <span className='text-shop_light_green font-semibold hover:underline cursor-pointer ml-1' onClick={() => setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up')}>
            {currentState === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
      <button type='submit' className='w-full py-2 px-3 mt-2 bg-shop_light_green text-white hover:bg-shop_dark_green transition-colors duration-300'>{currentState}</button>
  
    </form>
  )
}

export default Login