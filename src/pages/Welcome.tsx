import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Leaf,
    ArrowRight,
    Utensils,
    BarChart3,
    Bot,
    Activity,
    Sparkles,
    CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/context/UserContext'

export default function Welcome() {
    const { user } = useAuth()
    const { profile, healthMetrics } = useUser()

    const features = [
        {
            icon: BarChart3,
            title: 'Track Your Calories',
            description: 'Log meals and monitor your daily calorie intake',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: Utensils,
            title: 'Indian Food Database',
            description: '50+ common Indian foods with nutritional data',
            color: 'bg-orange-100 text-orange-600'
        },
        {
            icon: Bot,
            title: 'AI Health Assistant',
            description: 'Get instant answers to health & nutrition questions',
            color: 'bg-purple-100 text-purple-600'
        },
        {
            icon: Activity,
            title: 'Personalized Plans',
            description: 'ML-powered recommendations for your goals',
            color: 'bg-mint-100 text-mint-600'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-mint-500/25">
                        <Leaf className="w-12 h-12 text-white" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint-100 text-mint-700 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Profile Complete!
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome, {user?.name?.split(' ')[0] || 'there'}! 🎉
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your personalized health journey starts now. We've set up everything based on your preferences.
                    </p>
                </motion.div>

                {/* Profile Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
                >
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-mint-500" />
                        Your Health Profile
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-mint-600">
                                {healthMetrics?.dailyCalorieGoal || 2000}
                            </div>
                            <div className="text-sm text-gray-500">Daily Calories</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">
                                {healthMetrics?.bmi?.toFixed(1) || '22.0'}
                            </div>
                            <div className="text-sm text-gray-500">BMI</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-purple-600">
                                {healthMetrics?.bmr || 1600}
                            </div>
                            <div className="text-sm text-gray-500">BMR</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-orange-600">
                                {healthMetrics?.emotionalBalanceIndex || 70}%
                            </div>
                            <div className="text-sm text-gray-500">Wellness Score</div>
                        </div>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-4 mb-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Link to="/dashboard">
                        <Button size="lg" className="px-12">
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
