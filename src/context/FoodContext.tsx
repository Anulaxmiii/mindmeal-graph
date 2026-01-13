import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { FoodLog, FoodItem, MealType, DailyStats } from '@/types'
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '@/utils/storage'
import { getTodayDate, generateId } from '@/lib/utils'

interface FoodContextType {
    foodLogs: FoodLog[]
    todayLogs: FoodLog[]
    todayStats: DailyStats
    addFoodLog: (foodItem: FoodItem, mealType: MealType, servings?: number) => void
    removeFoodLog: (logId: string) => void
    getLogsByDate: (date: string) => FoodLog[]
    getLogsByMealType: (mealType: MealType, date?: string) => FoodLog[]
    clearTodayLogs: () => void
}

const FoodContext = createContext<FoodContextType | undefined>(undefined)

export function FoodProvider({ children }: { children: ReactNode }) {
    const [foodLogs, setFoodLogs] = useState<FoodLog[]>([])

    // Load food logs from storage on mount
    useEffect(() => {
        const storedLogs = getStorageItem<FoodLog[]>(STORAGE_KEYS.FOOD_LOGS)
        if (storedLogs) {
            setFoodLogs(storedLogs)
        }
    }, [])

    // Save to storage whenever logs change
    useEffect(() => {
        if (foodLogs.length > 0) {
            setStorageItem(STORAGE_KEYS.FOOD_LOGS, foodLogs)
        }
    }, [foodLogs])

    // Get today's logs
    const today = getTodayDate()
    const todayLogs = foodLogs.filter(log => log.date === today)

    // Calculate today's stats
    const todayStats: DailyStats = {
        date: today,
        caloriesConsumed: todayLogs.reduce((sum, log) => sum + log.foodItem.calories * log.servings, 0),
        calorieGoal: 2000, // This will be overridden by user's actual goal
        protein: todayLogs.reduce((sum, log) => sum + log.foodItem.protein * log.servings, 0),
        carbs: todayLogs.reduce((sum, log) => sum + log.foodItem.carbs * log.servings, 0),
        fat: todayLogs.reduce((sum, log) => sum + log.foodItem.fat * log.servings, 0),
        water: 0
    }

    // Add food log
    const addFoodLog = (foodItem: FoodItem, mealType: MealType, servings: number = 1) => {
        const newLog: FoodLog = {
            id: generateId(),
            foodItem,
            mealType,
            servings,
            timestamp: new Date().toISOString(),
            date: getTodayDate()
        }
        setFoodLogs(prev => [...prev, newLog])
    }

    // Remove food log
    const removeFoodLog = (logId: string) => {
        setFoodLogs(prev => prev.filter(log => log.id !== logId))
    }

    // Get logs by date
    const getLogsByDate = (date: string) => {
        return foodLogs.filter(log => log.date === date)
    }

    // Get logs by meal type
    const getLogsByMealType = (mealType: MealType, date?: string) => {
        const targetDate = date || today
        return foodLogs.filter(log => log.mealType === mealType && log.date === targetDate)
    }

    // Clear today's logs
    const clearTodayLogs = () => {
        setFoodLogs(prev => prev.filter(log => log.date !== today))
    }

    return (
        <FoodContext.Provider
            value={{
                foodLogs,
                todayLogs,
                todayStats,
                addFoodLog,
                removeFoodLog,
                getLogsByDate,
                getLogsByMealType,
                clearTodayLogs
            }}
        >
            {children}
        </FoodContext.Provider>
    )
}

export function useFood() {
    const context = useContext(FoodContext)
    if (context === undefined) {
        throw new Error('useFood must be used within a FoodProvider')
    }
    return context
}
