import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/users/Home"
import Login from "./pages/auth/Login"
import UserLayout from "./layout/UserLayout"
import Profile from "./pages/users/Profile"
import AuthLayout from "./layout/AuthLayout"
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
      element: <AuthLayout />,
      children: [
        {index: true, element: <Login />}
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />;
    </>
  )
}

export default App
