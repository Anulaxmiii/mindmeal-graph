import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useUser } from './context/UserContext'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import FoodTracker from './pages/FoodTracker'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import About from './pages/About'
import Architecture from './pages/Architecture'

// Layout
import Layout from './components/layout/Layout'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth()
    const { hasCompletedOnboarding } = useUser()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (!hasCompletedOnboarding) {
        return <Navigate to="/onboarding" replace />
    }

    return <>{children}</>
}

// Auth Route - Redirect if already logged in
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth()
    const { hasCompletedOnboarding } = useUser()

    if (isAuthenticated) {
        if (!hasCompletedOnboarding) {
            return <Navigate to="/onboarding" replace />
        }
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/architecture" element={<Architecture />} />

            {/* Auth Routes */}
            <Route
                path="/login"
                element={
                    <AuthRoute>
                        <Login />
                    </AuthRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <AuthRoute>
                        <Signup />
                    </AuthRoute>
                }
            />

            {/* Onboarding - Requires auth but not onboarding completion */}
            <Route
                path="/onboarding"
                element={
                    <Onboarding />
                }
            />

            {/* Welcome Page - After onboarding */}
            <Route
                path="/welcome"
                element={
                    <ProtectedRoute>
                        <Welcome />
                    </ProtectedRoute>
                }
            />

            {/* Protected Routes with Layout */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/food-tracker"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <FoodTracker />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Chat />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Profile />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
