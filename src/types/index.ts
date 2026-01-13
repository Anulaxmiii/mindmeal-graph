// User Types
export interface User {
    id: string
    name: string
    email: string
    createdAt: string
}

export interface UserProfile {
    location: string
    language: 'english' | 'hindi' | 'malayalam'
    gender: 'male' | 'female' | 'other'
    goals: Goal[]
    activityLevel: ActivityLevel
    age: number
    height: number // in cm
    weight: number // in kg
    targetWeight?: number // optional, depends on goal
    medicalConditions: MedicalCondition[]
}

export type Goal =
    | 'weight_loss'
    | 'weight_gain'
    | 'maintain_weight'
    | 'diet_plan'
    | 'calorie_tracking'
    | 'muscle_building'
    | 'improve_mental_health'

export type ActivityLevel =
    | 'sedentary'      // Little or no exercise
    | 'lightly_active' // Light exercise 1-3 days/week
    | 'moderately_active' // Moderate exercise 3-5 days/week
    | 'very_active'    // Hard exercise 6-7 days/week
    | 'extremely_active' // Very hard exercise, physical job

export type MedicalCondition =
    | 'diabetes'
    | 'thyroid'
    | 'hypertension'
    | 'depression'
    | 'anxiety'
    | 'pcos'
    | 'heart_disease'
    | 'none'

// Food Types
export interface FoodItem {
    id: string
    name: string
    nameHindi?: string
    calories: number
    protein: number // grams
    carbs: number // grams
    fat: number // grams
    fiber?: number // grams
    category: FoodCategory
    servingSize: string
    servingGrams: number
}

export type FoodCategory =
    | 'breakfast'
    | 'lunch'
    | 'dinner'
    | 'snack'
    | 'beverage'
    | 'fruit'
    | 'vegetable'
    | 'protein'
    | 'grain'
    | 'dairy'

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner'

export interface FoodLog {
    id: string
    foodItem: FoodItem
    mealType: MealType
    servings: number
    timestamp: string
    date: string // YYYY-MM-DD format
}

// Health Metrics Types
export interface HealthMetrics {
    bmi: number
    bmiCategory: BMICategory
    bmr: number
    tdee: number
    dailyCalorieGoal: number
    emotionalBalanceIndex: number
}

export type BMICategory =
    | 'underweight'
    | 'normal'
    | 'overweight'
    | 'obese'

// ML Types
export interface UserCluster {
    clusterId: number
    clusterName: string
    characteristics: string[]
}

export interface Recommendation {
    id: string
    type: 'food' | 'exercise' | 'mental_health'
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    relevanceScore: number
}

// Chat Types
export interface ChatMessage {
    id: string
    content: string
    sender: 'user' | 'ai'
    timestamp: string
}

// Onboarding Types
export interface OnboardingStep {
    id: number
    title: string
    description: string
    field: keyof UserProfile | 'intro' | 'complete'
}

// Analytics Types
export interface DailyStats {
    date: string
    caloriesConsumed: number
    calorieGoal: number
    protein: number
    carbs: number
    fat: number
    water: number // glasses
}

export interface WeeklyProgress {
    weekStart: string
    weekEnd: string
    averageCalories: number
    weightChange?: number
    completedDays: number
}
