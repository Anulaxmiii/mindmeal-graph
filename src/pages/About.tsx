import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Target, BookOpen, Lightbulb, ArrowLeft, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-mint-600 mb-8"><ArrowLeft className="w-4 h-4" />Back to Home</Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint-100 text-mint-700 text-sm font-medium mb-4"><Sparkles className="w-4 h-4" />B.Tech Final Year Project</div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About MindMeal Graph</h1>
                    <p className="text-xl text-gray-600">Linking Meals to Mental and Physical Health Using Machine Learning</p>
                </motion.div>

                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card><CardContent className="p-6">
                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
                                <div><h2 className="text-xl font-bold text-gray-900 mb-2">Problem Statement</h2>
                                    <p className="text-gray-600">Despite growing health awareness, most nutrition apps fail to consider the connection between diet and mental health. Existing solutions focus solely on calorie counting without understanding how food choices affect mood, energy, and emotional wellbeing. There's a critical gap in personalized recommendations that account for an individual's complete health profile.</p></div></div>
                        </CardContent></Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card><CardContent className="p-6">
                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"><Target className="w-6 h-6 text-blue-600" /></div>
                                <div><h2 className="text-xl font-bold text-gray-900 mb-2">Objectives</h2>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 flex-shrink-0" />Develop a health tracking system connecting nutrition with mental wellness</li>
                                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 flex-shrink-0" />Implement ML algorithms (K-Means, Random Forest) for personalized recommendations</li>
                                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 flex-shrink-0" />Create a comprehensive Indian food database with nutritional data</li>
                                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 flex-shrink-0" />Build an AI-powered health assistant for instant nutritional advice</li>
                                    </ul></div></div>
                        </CardContent></Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card><CardContent className="p-6">
                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0"><BookOpen className="w-6 h-6 text-purple-600" /></div>
                                <div><h2 className="text-xl font-bold text-gray-900 mb-2">Literature Review</h2>
                                    <p className="text-gray-600 mb-4">Key research areas that inform our approach:</p>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div className="p-3 bg-gray-50 rounded-xl"><strong>Gut-Brain Axis:</strong> Research shows bidirectional communication between gut microbiome and brain health</div>
                                        <div className="p-3 bg-gray-50 rounded-xl"><strong>Nutritional Psychiatry:</strong> Studies link diet quality with depression and anxiety outcomes</div>
                                        <div className="p-3 bg-gray-50 rounded-xl"><strong>ML in Healthcare:</strong> Clustering and classification algorithms for personalized medicine</div>
                                        <div className="p-3 bg-gray-50 rounded-xl"><strong>Behavior Change:</strong> App-based interventions for dietary habit modification</div>
                                    </div></div></div>
                        </CardContent></Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Card><CardContent className="p-6">
                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center flex-shrink-0"><Lightbulb className="w-6 h-6 text-mint-600" /></div>
                                <div><h2 className="text-xl font-bold text-gray-900 mb-2">Innovation</h2>
                                    <p className="text-gray-600 mb-4">MindMeal Graph introduces several innovations:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li><strong>Emotional Balance Index:</strong> A novel metric combining physical and mental health indicators</li>
                                        <li><strong>Knowledge Graph Integration:</strong> Connecting foods, nutrients, health conditions, and outcomes</li>
                                        <li><strong>Indian Food Focus:</strong> Dedicated database for regional Indian cuisine</li>
                                        <li><strong>Continuous Learning:</strong> Recommendations improve based on user feedback</li>
                                    </ul></div></div>
                        </CardContent></Card>
                    </motion.div>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/architecture"><Button size="lg">View System Architecture<ArrowLeft className="w-5 h-5 ml-2 rotate-180" /></Button></Link>
                </div>
            </div>
        </div>
    )
}
