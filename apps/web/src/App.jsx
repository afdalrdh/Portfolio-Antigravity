import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'
import Navbar from './components/layout/Navbar'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjectEditor from './pages/admin/AdminProjectEditor'
import AdminHomeEditor from './pages/admin/AdminHomeEditor'
import AdminAboutEditor from './pages/admin/AdminAboutEditor'
import AdminContactEditor from './pages/admin/AdminContactEditor'
import AdminLogin from './pages/admin/AdminLogin'
const ClientLayout = () => (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route element={<ClientLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/project/:slug" element={<ProjectDetail />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="projects/new" element={<AdminProjectEditor />} />
                    <Route path="projects/:id/edit" element={<AdminProjectEditor />} />
                    <Route path="home" element={<AdminHomeEditor />} />
                    <Route path="about" element={<AdminAboutEditor />} />
                    <Route path="contact" element={<AdminContactEditor />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
