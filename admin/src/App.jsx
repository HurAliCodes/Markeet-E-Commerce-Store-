import { useState, useEffect } from 'react'
import NavBar from './components/NavBar.jsx'
import SideBar from './components/SideBar.jsx'
import Login from './pages/Login.jsx'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Order.jsx'
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;


const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
      {token === "" ?
        <Login setToken={setToken}/> :
        (
          <>
          <NavBar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <SideBar />
              <div className='w-full'>
                <Routes>
                  <Route path="/" element={<List />} />
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App