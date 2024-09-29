
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile2 from './components/Profile2'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetUp from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'
import AdminJobsBetaTesting from './components/admin/AdminJobsBetaTesting'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/signup',
    element: <Signup/>
  },
  {
    path:'/jobs',
    element: <Jobs/>
  },
  {
    path:'/description/:id',
    element: <JobDescription/>
  },
  {
    path:'/browse',
    element: <Browse/>
  },
  {
    path:'/profile',
    element: <Profile2/>
  },
  {
    path:'/admin/companies',
    element: <Companies/>
  },
  {
    path:'/admin/companies/create',
    element: <CompanyCreate/>
  },
  {
    path:'/admin/companies/:id',
    element: <CompanySetUp/>
  },
  {
    path:'/admin/jobs',
    element: <AdminJobsBetaTesting/>
  },
  {
    path:'/admin/jobs/create',
    element: <PostJob/>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element: <Applicants/>
  },
])

function App() { 

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
