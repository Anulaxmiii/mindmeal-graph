import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Scale, Ruler, Activity, LogOut, TrendingUp, Download } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/context/UserContext'
import { useFood } from '@/context/FoodContext'
import { getBMICategoryInfo } from '@/utils/mlCalculations'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

export default function Profile() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { profile, healthMetrics } = useUser()
    const { foodLogs } = useFood()

    const bmiInfo = healthMetrics?.bmiCategory ? getBMICategoryInfo(healthMetrics.bmiCategory) : null

    // Generate weekly data
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        const dateStr = date.toISOString().split('T')[0]
        const dayLogs = foodLogs.filter(log => log.date === dateStr)
        const calories = dayLogs.reduce((sum, log) => sum + log.foodItem.calories * log.servings, 0)
        return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()], calories }
    })

    const handleLogout = () => { logout(); navigate('/') }

    // Export user data as JSON
    const handleExportData = () => {
        const exportData = {
            exportDate: new Date().toISOString(),
            user: {
                name: user?.name,
                email: user?.email
            },
            profile: profile,
            healthMetrics: healthMetrics,
            foodLogs: foodLogs,
            weeklyCalories: weeklyData
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `mindmeal-data-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* BMI Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Body Mass Index</h3>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-5xl font-bold" style={{ color: bmiInfo?.color }}>{healthMetrics?.bmi?.toFixed(1)}</div>
                                    <div className="text-sm text-gray-500 mt-1">kg/m²</div>
                                </div>
                                <div className="flex-1">
                                    <div className="px-3 py-1 rounded-full text-sm font-medium inline-block mb-2" style={{ backgroundColor: `${bmiInfo?.color}20`, color: bmiInfo?.color }}>{bmiInfo?.label}</div>
                                    <p className="text-sm text-gray-600">{bmiInfo?.description}</p>
                                    <div className="h-3 bg-gray-100 rounded-full mt-3 overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (healthMetrics?.bmi || 22) / 40 * 100)}%`, background: `linear-gradient(to right, #22c55e, #f59e0b, #ef4444)` }} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Health Stats */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Health Stats</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3"><Scale className="w-5 h-5 text-mint-500" /><span>Weight</span></div>
                                    <span className="font-bold">{profile?.weight} kg</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3"><Ruler className="w-5 h-5 text-blue-500" /><span>Height</span></div>
                                    <span className="font-bold">{profile?.height} cm</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3"><Activity className="w-5 h-5 text-orange-500" /><span>Activity</span></div>
                                    <span className="font-bold capitalize">{profile?.activityLevel?.replace('_', ' ')}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Weekly Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-2">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-mint-500" />Weekly Calorie Intake</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Bar dataKey="calories" fill="#14b890" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Export & Logout */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-2 space-y-3">
                    <Button
                        variant="outline"
                        onClick={handleExportData}
                        className="w-full border-mint-500 text-mint-600 hover:bg-mint-50"
                    >
                        <Download className="w-5 h-5 mr-2" />Export My Data
                    </Button>
                    <Button variant="destructive" onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600">
                        <LogOut className="w-5 h-5 mr-2" />Logout
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
