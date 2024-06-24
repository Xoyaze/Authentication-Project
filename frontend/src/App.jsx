import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import PageRenderer from "./pages/PageRenderer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AuthProvider from "./pages/AuthProvider";
import LoggedInRoute from "./components/LoggedInRoute";
import UserTeachers from "./components/UserTeachers";
import CommentsPage from "./components/CommentsPage";
import UserCommentsPage from "./components/UserCommentsPage";
import WriteCommentsPage from "./components/WriteCommentsPage";
import ViewTeachersComponent from "./components/ViewTeachersComponent";
import CreateTeachersComponent from "./components/CreateTeachersComponent";


const router = createBrowserRouter([
  {
    path: '',
    element: <PageRenderer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <LoggedInRoute />,
        children: [{
          path: 'teachers',
          element: <UserTeachers />,
        },
        {
          path: "",
          element: <CommentsPage />
        },
        {
          path: "usercomments",
          element: <UserCommentsPage />
        },
        {
          path: "writecomments",
          element: <WriteCommentsPage />
        }
      ]
      },
      {
        path: 'signIn',
        element: <SignInPage />
      },
      {
        path: 'signUp',
        element: <SignUpPage />,
      },
    ]
  }
])


function App() {
  
  return (
    <>
      <ToastContainer autoClose={3000}/>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
