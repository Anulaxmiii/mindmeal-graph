import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Database, GitBranch, RefreshCw, Users, Cpu, BarChart3, MessageSquare } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

export default function Architecture() {
    const steps = [
        { icon: Users, title: 'User Data Collection', desc: 'Onboarding collects health profile, goals, and preferences', color: 'bg-blue-100 text-blue-600' },
        { icon: Database, title: 'Data Processing', desc: 'Calculate BMI, BMR, TDEE, and Emotional Balance Index', color: 'bg-purple-100 text-purple-600' },
        { icon: Brain, title: 'K-Means Clustering', desc: 'Group users into health profile clusters for targeted recommendations', color: 'bg-orange-100 text-orange-600' },
        { icon: Cpu, title: 'Random Forest Prediction', desc: 'Generate personalized nutrition and exercise recommendations', color: 'bg-mint-100 text-mint-600' },
        { icon: BarChart3, title: 'Real-time Tracking', desc: 'Monitor daily intake, macros, and progress toward goals', color: 'bg-red-100 text-red-600' },
        { icon: RefreshCw, title: 'Continuous Learning', desc: 'Feedback loop improves recommendations over time', color: 'bg-teal-100 text-teal-600' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-mint-600 mb-8"><ArrowLeft className="w-4 h-4" />Back to Home</Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">System Architecture</h1>
                    <p className="text-xl text-gray-600">ML-powered recommendation system design</p>
                </motion.div>

                {/* ML Pipeline */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">ML Pipeline</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {steps.map((step, index) => (
                            <Card key={index}>
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Step {index + 1}</div>
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
                                            <p className="text-xs text-gray-600">{step.desc}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Algorithm Details */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid md:grid-cols-2 gap-6 mb-12">
                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center"><GitBranch className="w-6 h-6 text-white" /></div>
                                <h3 className="text-xl font-bold text-gray-900">K-Means Clustering</h3>
                            </div>
                            <p className="text-gray-700 mb-4">Groups users into distinct clusters based on:</p>
                            <ul className="text-sm space-y-1 text-gray-600">
                                <li>• BMI and body composition</li>
                                <li>• Activity level and lifestyle</li>
                                <li>• Health goals and conditions</li>
                                <li>• Dietary preferences</li>
                            </ul>
                            <div className="mt-4 p-3 bg-white/50 rounded-lg text-xs font-mono">Clusters: Health Starter, Active Optimizer, Weight Manager, Wellness Seeker</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center"><Cpu className="w-6 h-6 text-white" /></div>
                                <h3 className="text-xl font-bold text-gray-900">Random Forest</h3>
                            </div>
                            <p className="text-gray-700 mb-4">Predicts optimal recommendations using:</p>
                            <ul className="text-sm space-y-1 text-gray-600">
                                <li>• User cluster assignment</li>
                                <li>• Historical food preferences</li>
                                <li>• Nutritional requirements</li>
                                <li>• Medical condition constraints</li>
                            </ul>
                            <div className="mt-4 p-3 bg-white/50 rounded-lg text-xs font-mono">Output: Food, Exercise, Mental Health recommendations</div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Health Metrics */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Metrics Calculated</h2>
                    <Card><CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>BMI:</strong> weight / (height/100)² - Body composition indicator</div>
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>BMR:</strong> 10×wt + 6.25×ht - 5×age ±5 - Basal metabolic rate</div>
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>TDEE:</strong> BMR × activity factor - Daily energy needs</div>
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>EBI:</strong> Custom metric combining activity, conditions, and goals</div>
                        </div>
                    </CardContent></Card>
                </motion.div>

                <div className="mt-12 text-center">
                    <Link to="/signup"><Button size="lg">Try MindMeal Graph</Button></Link>
                </div>
            </div>
        </div>
    )
}
