import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    Search,
    Plus,
    Minus,
    X,
    Clock,
    Flame
} from 'lucide-react'
import { Card, CardContent, Input, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { useFood } from '@/context/FoodContext'
import { useUser } from '@/context/UserContext'
import { indianFoods, searchFoods } from '@/data/foods'
import { FoodItem, MealType } from '@/types'

const mealTypes: { value: MealType; label: string; emoji: string }[] = [
    { value: 'breakfast', label: 'Breakfast', emoji: '🌅' },
    { value: 'lunch', label: 'Lunch', emoji: '☀️' },
    { value: 'snack', label: 'Snack', emoji: '🍪' },
    { value: 'dinner', label: 'Dinner', emoji: '🌙' }
]

export default function FoodTracker() {
    const { todayLogs, addFoodLog, removeFoodLog, getLogsByMealType, todayStats } = useFood()
    const { healthMetrics } = useUser()

    const [activeMeal, setActiveMeal] = useState<MealType>('breakfast')
    const [searchQuery, setSearchQuery] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
    const [servings, setServings] = useState(1)

    const calorieGoal = healthMetrics?.dailyCalorieGoal || 2000

    // Filter foods based on search
    const filteredFoods = useMemo(() => {
        if (!searchQuery.trim()) {
            return indianFoods
        }
        return searchFoods(searchQuery)
    }, [searchQuery])

    // Get logs for active meal
    const activeMealLogs = getLogsByMealType(activeMeal)
    const mealCalories = activeMealLogs.reduce((sum, log) => sum + log.foodItem.calories * log.servings, 0)

    const handleAddFood = (food: FoodItem) => {
        setSelectedFood(food)
        setServings(1)
        setShowAddModal(true)
    }

    const confirmAddFood = () => {
        if (selectedFood) {
            addFoodLog(selectedFood, activeMeal, servings)
            setShowAddModal(false)
            setSelectedFood(null)
            setSearchQuery('')
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-3xl font-bold text-gray-900">Food Tracker</h1>
                <p className="text-gray-600 mt-1">Log your meals and track nutrition</p>
            </motion.div>

            {/* Today's Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
            >
                <Card className="bg-gradient-to-r from-mint-500 to-teal-500 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm">Today's Intake</p>
                                <p className="text-3xl font-bold">{todayStats.caloriesConsumed} / {calorieGoal} kcal</p>
                            </div>
                            <div className="text-right">
                                <div className="flex gap-4">
                                    <div>
                                        <p className="text-white/80 text-xs">Protein</p>
                                        <p className="font-bold">{todayStats.protein}g</p>
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-xs">Carbs</p>
                                        <p className="font-bold">{todayStats.carbs}g</p>
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-xs">Fat</p>
                                        <p className="font-bold">{todayStats.fat}g</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (todayStats.caloriesConsumed / calorieGoal) * 100)}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Meal Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Tabs value={activeMeal} onValueChange={(v) => setActiveMeal(v as MealType)}>
                    <TabsList className="w-full grid grid-cols-4 mb-6">
                        {mealTypes.map((meal) => (
                            <TabsTrigger key={meal.value} value={meal.value} className="gap-2">
                                <span className="hidden sm:inline">{meal.emoji}</span>
                                {meal.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {mealTypes.map((meal) => (
                        <TabsContent key={meal.value} value={meal.value}>
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Food Search */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Add Food</h3>

                                        <Input
                                            placeholder="Search Indian foods..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            icon={<Search className="w-5 h-5" />}
                                            className="mb-4"
                                        />

                                        <div className="space-y-2 max-h-96 overflow-y-auto">
                                            {filteredFoods.slice(0, 15).map((food) => (
                                                <div
                                                    key={food.id}
                                                    className="food-card"
                                                    onClick={() => handleAddFood(food)}
                                                >
                                                    <div className="flex-1">
                                                        <div className="font-medium text-gray-900">{food.name}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {food.servingSize} • {food.calories} kcal
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                                        <span>P: {food.protein}g</span>
                                                        <span>C: {food.carbs}g</span>
                                                        <span>F: {food.fat}g</span>
                                                    </div>
                                                    <button className="w-8 h-8 rounded-full bg-mint-100 text-mint-600 flex items-center justify-center hover:bg-mint-200 transition-colors">
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Logged Foods */}
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900">{meal.label}</h3>
                                            <span className="text-sm text-gray-500">{mealCalories} kcal</span>
                                        </div>

                                        {activeMealLogs.length === 0 ? (
                                            <div className="text-center py-12 text-gray-400">
                                                <Flame className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                <p>No foods logged for {meal.label.toLowerCase()}</p>
                                                <p className="text-sm">Search and add foods from the left</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {activeMealLogs.map((log) => (
                                                    <motion.div
                                                        key={log.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                                                    >
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900">{log.foodItem.name}</div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                                <Clock className="w-3 h-3" />
                                                                {new Date(log.timestamp).toLocaleTimeString('en-IN', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                                <span>•</span>
                                                                <span>{log.servings} serving{log.servings > 1 ? 's' : ''}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-gray-900">
                                                                {Math.round(log.foodItem.calories * log.servings)} kcal
                                                            </div>
                                                            <div className="text-xs text-gray-400">
                                                                P: {Math.round(log.foodItem.protein * log.servings)}g
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFoodLog(log.id)}
                                                            className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>

            {/* Add Food Modal */}
            {showAddModal && selectedFood && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedFood.name}</h3>
                                <p className="text-gray-500">{selectedFood.servingSize}</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Nutrition Info */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="text-center p-3 bg-orange-50 rounded-xl">
                                <div className="text-lg font-bold text-orange-600">
                                    {Math.round(selectedFood.calories * servings)}
                                </div>
                                <div className="text-xs text-gray-500">kcal</div>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded-xl">
                                <div className="text-lg font-bold text-red-600">
                                    {Math.round(selectedFood.protein * servings)}g
                                </div>
                                <div className="text-xs text-gray-500">Protein</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded-xl">
                                <div className="text-lg font-bold text-yellow-600">
                                    {Math.round(selectedFood.carbs * servings)}g
                                </div>
                                <div className="text-xs text-gray-500">Carbs</div>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-xl">
                                <div className="text-lg font-bold text-blue-600">
                                    {Math.round(selectedFood.fat * servings)}g
                                </div>
                                <div className="text-xs text-gray-500">Fat</div>
                            </div>
                        </div>

                        {/* Servings */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Servings
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <div className="flex-1 text-center">
                                    <span className="text-3xl font-bold text-gray-900">{servings}</span>
                                </div>
                                <button
                                    onClick={() => setServings(servings + 0.5)}
                                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <Button onClick={confirmAddFood} className="w-full">
                            Add to {mealTypes.find(m => m.value === activeMeal)?.label}
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
