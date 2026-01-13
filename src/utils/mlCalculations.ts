/**
 * ML Calculations Module
 * Implements health metrics calculations based on scientific formulas
 */

import { ActivityLevel, BMICategory, MedicalCondition, UserProfile } from '@/types'

/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight (kg) / height (m)²
 */
export function calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)
    return Math.round(bmi * 10) / 10
}

/**
 * Get BMI Category based on WHO standards
 */
export function getBMICategory(bmi: number): BMICategory {
    if (bmi < 18.5) return 'underweight'
    if (bmi < 25) return 'normal'
    if (bmi < 30) return 'overweight'
    return 'obese'
}

/**
 * Get BMI Category display info
 */
export function getBMICategoryInfo(category: BMICategory): { label: string; color: string; description: string } {
    const info = {
        underweight: {
            label: 'Underweight',
            color: '#3b82f6',
            description: 'Below healthy weight range'
        },
        normal: {
            label: 'Normal',
            color: '#22c55e',
            description: 'Healthy weight range'
        },
        overweight: {
            label: 'Overweight',
            color: '#f59e0b',
            description: 'Above healthy weight range'
        },
        obese: {
            label: 'Obese',
            color: '#ef4444',
            description: 'Significantly above healthy range'
        }
    }
    return info[category]
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * Male: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age(years) + 5
 * Female: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age(years) - 161
 */
export function calculateBMR(
    weight: number,
    height: number,
    age: number,
    gender: 'male' | 'female' | 'other'
): number {
    const baseBMR = 10 * weight + 6.25 * height - 5 * age

    switch (gender) {
        case 'male':
            return Math.round(baseBMR + 5)
        case 'female':
            return Math.round(baseBMR - 161)
        default:
            // For 'other', use average of male and female
            return Math.round(baseBMR - 78)
    }
}

/**
 * Activity level multipliers for TDEE calculation
 */
const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * TDEE = BMR × Activity Factor
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
    const multiplier = activityMultipliers[activityLevel]
    return Math.round(bmr * multiplier)
}

/**
 * Calculate daily calorie goal based on user's goals
 */
export function calculateDailyCalorieGoal(
    tdee: number,
    goals: string[]
): number {
    // Deficit for weight loss, surplus for weight gain
    if (goals.includes('weight_loss')) {
        return Math.round(tdee - 500) // ~0.5 kg per week loss
    }
    if (goals.includes('weight_gain') || goals.includes('muscle_building')) {
        return Math.round(tdee + 500) // ~0.5 kg per week gain
    }
    return tdee // Maintenance
}

/**
 * Calculate Emotional Balance Index (EBI)
 * A custom metric that estimates mental wellness based on various factors
 * Scale: 0-100 (higher is better)
 */
export function calculateEmotionalBalanceIndex(
    profile: UserProfile
): number {
    let score = 70 // Base score

    // Activity level impact (exercise improves mental health)
    const activityBonus: Record<ActivityLevel, number> = {
        sedentary: -10,
        lightly_active: 0,
        moderately_active: 10,
        very_active: 15,
        extremely_active: 12 // Slightly lower due to potential burnout
    }
    score += activityBonus[profile.activityLevel]

    // Medical conditions impact
    const conditionImpact: Record<MedicalCondition, number> = {
        depression: -15,
        anxiety: -12,
        thyroid: -5,
        diabetes: -5,
        hypertension: -3,
        pcos: -5,
        heart_disease: -5,
        none: 5
    }

    profile.medicalConditions.forEach(condition => {
        score += conditionImpact[condition] || 0
    })

    // Goal orientation bonus
    if (profile.goals.includes('improve_mental_health')) {
        score += 5 // Self-awareness bonus
    }

    // Age factor (middle-aged typically have more stability)
    if (profile.age >= 25 && profile.age <= 45) {
        score += 5
    } else if (profile.age > 60) {
        score += 3
    }

    // BMI impact on mood
    const bmi = calculateBMI(profile.weight, profile.height)
    if (bmi >= 18.5 && bmi < 25) {
        score += 5
    } else if (bmi < 18.5 || bmi >= 30) {
        score -= 5
    }

    // Clamp to 0-100 range
    return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Get macro nutrient targets based on goals and TDEE
 */
export function calculateMacroTargets(
    dailyCalories: number,
    goals: string[]
): { protein: number; carbs: number; fat: number } {
    let proteinPercent = 0.25
    let carbsPercent = 0.45
    let fatPercent = 0.30

    // Adjust based on goals
    if (goals.includes('muscle_building') || goals.includes('weight_gain')) {
        proteinPercent = 0.30
        carbsPercent = 0.45
        fatPercent = 0.25
    } else if (goals.includes('weight_loss')) {
        proteinPercent = 0.30
        carbsPercent = 0.40
        fatPercent = 0.30
    }

    return {
        protein: Math.round((dailyCalories * proteinPercent) / 4), // 4 cal/g
        carbs: Math.round((dailyCalories * carbsPercent) / 4), // 4 cal/g
        fat: Math.round((dailyCalories * fatPercent) / 9) // 9 cal/g
    }
}

/**
 * Get all health metrics for a user profile
 */
export function calculateAllHealthMetrics(profile: UserProfile) {
    const bmi = calculateBMI(profile.weight, profile.height)
    const bmiCategory = getBMICategory(bmi)
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender)
    const tdee = calculateTDEE(bmr, profile.activityLevel)
    const dailyCalorieGoal = calculateDailyCalorieGoal(tdee, profile.goals)
    const emotionalBalanceIndex = calculateEmotionalBalanceIndex(profile)
    const macros = calculateMacroTargets(dailyCalorieGoal, profile.goals)

    return {
        bmi,
        bmiCategory,
        bmr,
        tdee,
        dailyCalorieGoal,
        emotionalBalanceIndex,
        macros
    }
}

/**
 * Get personalized diet type based on calorie goal
 */
export function getDietType(dailyCalorieGoal: number): { type: string; description: string } {
    if (dailyCalorieGoal <= 1400) {
        return {
            type: 'Weight Loss',
            description: 'Calorie-deficit diet for healthy weight reduction'
        }
    } else if (dailyCalorieGoal >= 2200) {
        return {
            type: 'Weight Gain',
            description: 'Calorie-surplus diet for healthy weight increase'
        }
    }
    return {
        type: 'Maintenance',
        description: 'Balanced diet to maintain current weight'
    }
}
