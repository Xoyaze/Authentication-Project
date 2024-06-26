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
import TeacherDetailsPage from "./pages/TeacherDetailsPage";
import CommentDetailPage from "./pages/CommentDetailPage";


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
          path: 'details/:teacherId',
          element: <TeacherDetailsPage /> 
        },
        {
          path: "",
          element: <CommentsPage />
        },
        {
          path: '/:commentId',
          element: <CommentDetailPage /> 
        },
        {
          path: "usercomments",
          element: <UserCommentsPage />
        },
        {
          path: "writecomments",
          element: <WriteCommentsPage />,
          children: [
            {
              path: '/writecomments/:teacherId',
              element: <WriteCommentsPage />
            }
          ]
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
