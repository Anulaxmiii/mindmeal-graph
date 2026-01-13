import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Flame,
    Droplet,
    Dumbbell,
    Apple,
    ChevronRight,
    Plus,
    Minus,
    TrendingUp,
    Target,
    Zap
} from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'
import { useUser } from '@/context/UserContext'
import { useFood } from '@/context/FoodContext'
import { useAuth } from '@/context/AuthContext'
import { getDietType } from '@/utils/mlCalculations'
import { simulateKMeansClustering, simulateRandomForestPredictions } from '@/utils/mlSimulation'

export default function Dashboard() {
    const { user } = useAuth()
    const { profile, healthMetrics } = useUser()
    const { todayStats } = useFood()

    const calorieGoal = healthMetrics?.dailyCalorieGoal || 2000
    const caloriesConsumed = todayStats.caloriesConsumed
    const caloriesRemaining = Math.max(0, calorieGoal - caloriesConsumed)
    const calorieProgress = Math.min(100, (caloriesConsumed / calorieGoal) * 100)

    const dietType = getDietType(calorieGoal)

    // Get ML recommendations
    const cluster = profile ? simulateKMeansClustering(profile) : null
    const recommendations = profile && cluster ? simulateRandomForestPredictions(profile, cluster) : []

    // Calculate remaining macros
    const macroGoals = healthMetrics?.macros || { protein: 100, carbs: 250, fat: 70 }

    // Water tracking state
    const [waterGlasses, setWaterGlasses] = useState(0)
    const waterGoal = 8 // glasses per day

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Greeting */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900">
                    Good {getGreeting()}, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-gray-600 mt-1">
                    {cluster ? `You're a ${cluster.clusterName}` : 'Track your meals and stay healthy'}
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Main Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Calorie Ring Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    {/* Calorie Ring */}
                                    <div className="relative w-48 h-48 flex-shrink-0">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <defs>
                                                <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#14b890" />
                                                    <stop offset="100%" stopColor="#2dd4aa" />
                                                </linearGradient>
                                            </defs>
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth="16"
                                            />
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="url(#calorieGradient)"
                                                strokeWidth="16"
                                                strokeLinecap="round"
                                                strokeDasharray={`${calorieProgress * 5.02} 502`}
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-bold text-gray-900">{caloriesRemaining}</span>
                                            <span className="text-sm text-gray-500">cal remaining</span>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex-1 w-full">
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-sm text-gray-500">Goal</div>
                                                <div className="text-xl font-bold text-gray-900">{calorieGoal}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-500">Eaten</div>
                                                <div className="text-xl font-bold text-mint-600">{caloriesConsumed}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-500">Left</div>
                                                <div className="text-xl font-bold text-orange-500">{caloriesRemaining}</div>
                                            </div>
                                        </div>

                                        <Link to="/food-tracker">
                                            <Button className="w-full">
                                                <Plus className="w-5 h-5 mr-2" />
                                                Log Food
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        <Card className="stat-card">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <Flame className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{todayStats.caloriesConsumed}</div>
                                    <div className="text-xs text-gray-500">Calories</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="stat-card">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{todayStats.protein}g</div>
                                    <div className="text-xs text-gray-500">Protein</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="stat-card">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    <Apple className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{todayStats.carbs}g</div>
                                    <div className="text-xs text-gray-500">Carbs</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="stat-card">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Droplet className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{todayStats.fat}g</div>
                                    <div className="text-xs text-gray-500">Fat</div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Diet Plan Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Your Diet Plan</h3>
                                        <p className="text-sm text-gray-500">{dietType.description}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-mint-100 text-mint-700 text-sm font-medium">
                                        {dietType.type}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Target className="w-5 h-5 text-mint-500" />
                                            <span className="font-medium">Daily Calorie Target</span>
                                        </div>
                                        <span className="font-bold">{calorieGoal} kcal</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Zap className="w-5 h-5 text-red-500" />
                                            <span className="font-medium">Protein Goal</span>
                                        </div>
                                        <span className="font-bold">{macroGoals.protein}g</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <TrendingUp className="w-5 h-5 text-blue-500" />
                                            <span className="font-medium">BMR (Base Metabolism)</span>
                                        </div>
                                        <span className="font-bold">{healthMetrics?.bmr || 1600} kcal</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Right Column - Recommendations */}
                <div className="space-y-6">
                    {/* Water Intake Tracker */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Water Intake</h3>
                                    <span className="text-sm text-gray-500">{waterGlasses}/{waterGoal} glasses</span>
                                </div>

                                {/* Water Glass Progress */}
                                <div className="flex gap-2 mb-4">
                                    {Array.from({ length: waterGoal }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 h-8 rounded-lg transition-all duration-300 ${i < waterGlasses
                                                    ? 'bg-gradient-to-b from-blue-400 to-blue-500'
                                                    : 'bg-gray-100'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                                        disabled={waterGlasses === 0}
                                        aria-label="Remove glass"
                                    >
                                        <Minus className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <Droplet className="w-8 h-8 text-blue-500" />
                                        <span className="text-3xl font-bold text-gray-900">{waterGlasses}</span>
                                    </div>
                                    <button
                                        onClick={() => setWaterGlasses(Math.min(waterGoal, waterGlasses + 1))}
                                        className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors disabled:opacity-50"
                                        disabled={waterGlasses >= waterGoal}
                                        aria-label="Add glass"
                                    >
                                        <Plus className="w-5 h-5 text-blue-600" />
                                    </button>
                                </div>

                                {waterGlasses >= waterGoal && (
                                    <p className="text-center text-green-600 text-sm mt-3 font-medium">
                                        🎉 Great job! You've reached your water goal!
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Workout Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="bg-gradient-to-br from-mint-500 to-teal-600 text-white overflow-hidden">
                            <CardContent className="p-6 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                        <Dumbbell className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Today's Workout</h3>
                                    <p className="text-white/80 text-sm mb-4">
                                        {profile?.activityLevel === 'sedentary'
                                            ? '15 min walk recommended to boost energy'
                                            : '30 min moderate exercise for best results'}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="px-2 py-1 bg-white/20 rounded-lg">~150 cal</span>
                                        <span className="px-2 py-1 bg-white/20 rounded-lg">15-30 min</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* AI Recommendations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">AI Recommendations</h3>
                                <div className="space-y-3">
                                    {recommendations.slice(0, 3).map((rec, index) => (
                                        <div
                                            key={index}
                                            className="p-3 bg-gray-50 rounded-xl"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 text-sm">{rec.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{rec.description}</p>
                                                </div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${rec.priority === 'high'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {rec.priority}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    to="/chat"
                                    className="flex items-center justify-center gap-2 mt-4 text-mint-600 font-medium text-sm hover:underline"
                                >
                                    Get personalized advice
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link to="/food-tracker" className="p-4 bg-orange-50 rounded-xl text-center hover:bg-orange-100 transition-colors">
                                        <Apple className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                        <span className="text-sm font-medium">Log Meal</span>
                                    </Link>
                                    <Link to="/chat" className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition-colors">
                                        <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                        <span className="text-sm font-medium">Ask AI</span>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function getGreeting(): string {
    const hour = new Date().getHours()
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    return 'Evening'
}
