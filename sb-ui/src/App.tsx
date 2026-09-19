import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/users/Home"
import Login from "./pages/auth/Login"
import UserLayout from "./layout/UserLayout"
import Profile from "./pages/users/Profile"
import Register from "./pages/auth/Register"
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "/login",
      children: [
        {index: true, element: <Login />},
      ]
    },
    {
      path: "/register",
      element: <Register />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
