import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Home,
    Utensils,
    MessageCircle,
    User,
    Menu,
    X,
    Leaf
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

interface LayoutProps {
    children: ReactNode
}

const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/food-tracker', icon: Utensils, label: 'Tracker' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
]

export default function Layout({ children }: LayoutProps) {
    const location = useLocation()
    const { user } = useAuth()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50">
            {/* Desktop Header */}
            <header className="hidden md:block sticky top-0 z-40 glass border-b border-mint-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">MindMeal</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="flex items-center gap-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                                                ? 'bg-mint-100 text-mint-700'
                                                : 'text-gray-600 hover:bg-mint-50 hover:text-mint-600'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* User Avatar */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Hi, {user?.name || 'User'}</span>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint-400 to-teal-400 flex items-center justify-center text-white font-semibold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-40 glass border-b border-mint-100">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold gradient-text">MindMeal</span>
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-mint-50"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 glass border-b border-mint-100 py-2"
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 ${isActive
                                            ? 'bg-mint-50 text-mint-700'
                                            : 'text-gray-600'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </header>

            {/* Main Content */}
            <main className="pb-24 md:pb-8">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-nav md:hidden">
                <div className="flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 ${isActive
                                        ? 'text-mint-600'
                                        : 'text-gray-400'
                                    }`}
                            >
                                <item.icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
