import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/users/Home"
import Login from "./pages/auth/Login"
import UserLayout from "./layout/UserLayout"
import Profile from "./pages/users/Profile"
import Register from "./pages/auth/Register"
import AdminLayout from "./layout/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import CreateBook from "./pages/admin/CreateBook"
import Discover from "./pages/users/Discover"
import Categories from "./pages/users/Caterories"
import MyLybrary from "./pages/users/MyLibrary"
import Detail from "./pages/users/Detail"
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/profile", element: <Profile /> },
        { path: "/discovery", element: <Discover /> },
        { path: "/categories", element: <Categories /> },
        { path: "/my-library", element: <MyLybrary /> },
        { path: "/detail/:bookId", element: <Detail /> }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "books/create", element: <CreateBook /> },
      ],
    },
    {
      path: "/login",
      children: [
        { index: true, element: <Login /> },
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
