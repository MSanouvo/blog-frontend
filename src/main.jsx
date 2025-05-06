import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login Page/Login.jsx'
import SignUp from './Sign Up Page/SignUp.jsx'
import AuthorDashboard from './Auth. Dash/A. Dash.jsx'
import AuthorEdit from './Auth. Edit/A.Edit.jsx'
import ReaderDashboard from './Reader Dash/R.Dash.jsx'
import ReaderView from './ReaderView/ReaderView.jsx'
import WriteArticle from './WriteArticle/WriteArticle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <SignUp />
    <AuthorDashboard />
    <WriteArticle />
    <AuthorEdit />
    <ReaderDashboard />
    <ReaderView />
  </StrictMode>,
)
