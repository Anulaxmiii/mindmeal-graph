import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Leaf,
    Brain,
    Utensils,
    LineChart,
    Bot,
    ArrowRight,
    Sparkles,
    Heart,
    Activity,
    Menu,
    X
} from 'lucide-react'
import { Button } from '@/components/ui'

export default function Landing() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50 overflow-hidden">
            {/* Navigation */}
            <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center shadow-lg shadow-mint-500/25">
                            <Leaf className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold gradient-text">MindMeal</span>
                            <span className="text-2xl font-light text-gray-400 ml-1">Graph</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/about" className="text-gray-600 hover:text-mint-600 transition-colors font-medium">
                            About Project
                        </Link>
                        <Link to="/architecture" className="text-gray-600 hover:text-mint-600 transition-colors font-medium">
                            System Architecture
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-xl bg-white/80 backdrop-blur border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                                onClick={() => setMobileMenuOpen(false)}
                            />

                            {/* Menu Panel */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 md:hidden"
                            >
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to="/about"
                                        className="px-4 py-3 rounded-xl text-gray-700 hover:bg-mint-50 hover:text-mint-600 transition-colors font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        About Project
                                    </Link>
                                    <Link
                                        to="/architecture"
                                        className="px-4 py-3 rounded-xl text-gray-700 hover:bg-mint-50 hover:text-mint-600 transition-colors font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        System Architecture
                                    </Link>
                                    <hr className="my-2 border-gray-100" />
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full">Get Started</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-24">
                {/* Background Decorations */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-mint-200 to-teal-200 rounded-full blur-3xl opacity-30 -z-10" />
                <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-br from-teal-200 to-mint-200 rounded-full blur-3xl opacity-30 -z-10" />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint-100 text-mint-700 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            B.Tech Final Year Project
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Linking Meals to{' '}
                            <span className="gradient-text">Mental & Physical</span>{' '}
                            Health
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            An intelligent health tracking system powered by Machine Learning
                            that connects your nutrition choices with mental wellness and physical health outcomes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link to="/signup">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Start Your Journey
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/architecture">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    View System Design
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-mint-600">50+</div>
                                <div className="text-sm text-gray-500">Indian Foods</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-mint-600">ML</div>
                                <div className="text-sm text-gray-500">Powered AI</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-mint-600">24/7</div>
                                <div className="text-sm text-gray-500">Health Assistant</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square">
                            {/* Central Circle */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-mint-500/30 animate-pulse-slow">
                                    <Brain className="w-24 h-24 text-white" />
                                </div>
                            </div>

                            {/* Orbital Cards */}
                            <motion.div
                                className="absolute top-8 left-1/2 -translate-x-1/2 glass p-4 rounded-2xl shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Mental Health</div>
                                        <div className="text-sm text-gray-500">Mood Tracking</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-8 left-8 glass p-4 rounded-2xl shadow-xl"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <Utensils className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Nutrition</div>
                                        <div className="text-sm text-gray-500">Food Tracking</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-8 right-8 glass p-4 rounded-2xl shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Fitness</div>
                                        <div className="text-sm text-gray-500">Activity Level</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Powered by Machine Learning
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our system uses advanced ML algorithms to provide personalized health recommendations
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Brain,
                            title: 'K-Means Clustering',
                            description: 'Groups users based on health profiles for targeted recommendations',
                            color: 'bg-purple-100 text-purple-600'
                        },
                        {
                            icon: LineChart,
                            title: 'Random Forest',
                            description: 'Predicts optimal nutrition plans using ensemble learning',
                            color: 'bg-blue-100 text-blue-600'
                        },
                        {
                            icon: Bot,
                            title: 'AI Health Assistant',
                            description: '24/7 chat support for nutrition and mental health queries',
                            color: 'bg-mint-100 text-mint-600'
                        },
                        {
                            icon: Activity,
                            title: 'Health Metrics',
                            description: 'BMI, BMR, TDEE, and Emotional Balance Index tracking',
                            color: 'bg-orange-100 text-orange-600'
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow card-hover"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl bg-gradient-to-br from-mint-500 to-teal-600 p-12 md:p-16 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Transform Your Health?
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Join MindMeal Graph and discover the connection between what you eat and how you feel.
                        </p>
                        <Link to="/signup">
                            <Button size="lg" variant="secondary" className="bg-white text-mint-600 hover:bg-gray-50">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Leaf className="w-6 h-6 text-mint-500" />
                            <span className="font-bold text-gray-900">MindMeal Graph</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            B.Tech Final Year Project © 2026
                        </div>
                        <div className="flex gap-6">
                            <Link to="/about" className="text-gray-600 hover:text-mint-600 text-sm">About</Link>
                            <Link to="/architecture" className="text-gray-600 hover:text-mint-600 text-sm">Architecture</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
