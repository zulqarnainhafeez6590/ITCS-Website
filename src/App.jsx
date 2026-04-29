import './App.css'
import ScrollToTop from './Components/ScrollToTop'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home/Home'
import Services from './Components/Services/Services'
import Vision from './Components/Vision/Vision'
import AboutUs from './Components/AboutUs/AboutUs'
import Contact from './Components/Contact/Contact'
//import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'

import Blog from './Components/Blog/Blog'
import BlogDetail from './Components/Blog/BlogDetail'
import AdminPanel from './Components/AdminPanel/AdminPanel'
import BlogApproval from "./Components/AdminPanel/BlogApproval/BlogApproval";
import AdminBlogDetail from "./Components/AdminPanel/BlogApproval/AdminBlogDetail";
import AdminRoute from './Components/AdminPanel/AdminRoute'

//Dropdowns
import Cloud from './Components/Services-Dropdown/Cloud/Cloud'
import CloudDesign from './Components/Services-Dropdown/Cloud/CloudDesign/CloudDesign'
import CloudMigration from './Components/Services-Dropdown/Cloud/CloudMigration/CloudMigration'
import CloudSecurity from './Components/Services-Dropdown/Cloud/CloudSecurity/CloudSecurity'
import Consulting from './Components/Services-Dropdown/Consulting/Consulting'
import CyberSecurity from './Components/Services-Dropdown/CyberSecurity/CyberSecurity'
import Enterprise from './Components/Services-Dropdown/Enterprise-Solutions/Enterprise'
import ITServices from './Components/Services-Dropdown/IT-Services/ITServices'
import Network from './Components/Services-Dropdown/Network-Solutions/Network'
import NetworkDesign from './Components/Services-Dropdown/Network-Solutions/NetworkDesign/NetworkDesign'
import NetworkSecurity from './Components/Services-Dropdown/Network-Solutions/NetworkSecurity/NetworkSecurity'
import NetworkSupport from './Components/Services-Dropdown/Network-Solutions/NetworkSupport/NetworkSupport'
import WebDevelopment from './Components/Services-Dropdown/WebDevelopment/WebDevelopment'
import SecurityAssessment from './Components/Services-Dropdown/CyberSecurity/SecurityAssessment/SecurityAssessment'
import Careers from './Components/Careers/Careers'
import ApplyJob from './Components/Careers/ApplyJob/ApplyJob'
import JobDetail from './Components/Careers/JobDetail/JobDetail'

function App() {
  const location = useLocation()

  const hideLayoutRoutes = ['/signup', '/login', '/admin']

  return (
    <>
      {!hideLayoutRoutes.includes(location.pathname) && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/cloud" element={<Cloud />} />
        <Route path="/services/cloud/design" element={<CloudDesign />} />
        <Route path="/services/cloud/migration" element={<CloudMigration />} />
        <Route path="/services/cloud/security" element={<CloudSecurity />} />
        <Route path="/services/cyber-security" element={<CyberSecurity />} />
        <Route path="/services/cyber-security/assessment" element={<SecurityAssessment />} />
        <Route path="/services/consulting" element={<Consulting />} />
        <Route path="/services/enterprise-solutions" element={<Enterprise />} />
        <Route path="/services/it-services" element={<ITServices />} />
        <Route path="/services/network-solutions" element={<Network />} />
        <Route path="/services/network-solutions/design" element={<NetworkDesign />} />
        <Route path="/services/network-solutions/security" element={<NetworkSecurity />} />
        <Route path="/services/network-solutions/support" element={<NetworkSupport />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/vision-mission" element={<Vision />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<JobDetail />} />
        <Route path="/apply" element={<ApplyJob />} />

        <Route path="/login" element={<Login />} />
        {/*<Route path="/signup" element={<Signup />} />*/}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminRoute>
              <BlogApproval />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/blog/:id"
          element={
            <AdminRoute>
              <AdminBlogDetail />
            </AdminRoute>
          }
        />


      </Routes>
      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
