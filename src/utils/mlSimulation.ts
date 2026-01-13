/**
 * ML Simulation Module
 * Simulates K-Means Clustering and Random Forest predictions
 * Ready for backend integration with real ML models
 */

import { UserProfile, Recommendation, UserCluster, FoodItem, MedicalCondition } from '@/types'
import { calculateBMI, calculateTDEE, calculateBMR } from './mlCalculations'

/**
 * Simulated K-Means Clustering
 * Groups users into clusters based on their characteristics
 */
export function simulateKMeansClustering(profile: UserProfile): UserCluster {
    // Feature vector creation (simplified)
    const bmi = calculateBMI(profile.weight, profile.height)
    const activityScore = getActivityScore(profile.activityLevel)
    const goalScore = getGoalScore(profile.goals)
    const healthScore = getHealthScore(profile.medicalConditions)

    // Simulated cluster assignment based on feature combinations
    // In real implementation, this would use actual K-Means algorithm
    let clusterId = 0
    let clusterName = ''
    let characteristics: string[] = []

    // Cluster 1: Health-focused beginners
    if (activityScore < 2 && goalScore > 0) {
        clusterId = 1
        clusterName = 'Health Journey Starter'
        characteristics = [
            'New to fitness tracking',
            'Motivated to improve',
            'Needs guidance on basics',
            'Benefits from step-by-step plans'
        ]
    }
    // Cluster 2: Active fitness enthusiasts
    else if (activityScore >= 3 && bmi < 25) {
        clusterId = 2
        clusterName = 'Active Optimizer'
        characteristics = [
            'Already active lifestyle',
            'Focused on optimization',
            'Interested in performance',
            'Responds to advanced metrics'
        ]
    }
    // Cluster 3: Weight management focused
    else if (profile.goals.includes('weight_loss') && bmi >= 25) {
        clusterId = 3
        clusterName = 'Weight Manager'
        characteristics = [
            'Primary focus on weight loss',
            'Needs calorie awareness',
            'Benefits from meal planning',
            'Responds to progress tracking'
        ]
    }
    // Cluster 4: Mental health priority
    else if (profile.goals.includes('improve_mental_health') ||
        profile.medicalConditions.includes('depression') ||
        profile.medicalConditions.includes('anxiety')) {
        clusterId = 4
        clusterName = 'Wellness Seeker'
        characteristics = [
            'Prioritizes mental wellbeing',
            'Values holistic approach',
            'Interested in mood-food connection',
            'Benefits from stress-aware recommendations'
        ]
    }
    // Cluster 5: General wellness
    else {
        clusterId = 5
        clusterName = 'Balanced Lifestyle'
        characteristics = [
            'Seeks overall balance',
            'Moderate activity level',
            'Open to various recommendations',
            'Values sustainable habits'
        ]
    }

    return { clusterId, clusterName, characteristics }
}

/**
 * Simulated Random Forest Predictions
 * Generates personalized recommendations based on user profile and cluster
 */
export function simulateRandomForestPredictions(
    profile: UserProfile,
    cluster: UserCluster
): Recommendation[] {
    const recommendations: Recommendation[] = []
    const bmi = calculateBMI(profile.weight, profile.height)
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender)
    const tdee = calculateTDEE(bmr, profile.activityLevel)

    // Food Recommendations based on cluster and goals
    if (profile.goals.includes('weight_loss')) {
        recommendations.push({
            id: 'food-1',
            type: 'food',
            title: 'High-Protein Breakfast',
            description: 'Start your day with eggs, paneer, or dal chilla to boost metabolism and reduce cravings.',
            priority: 'high',
            relevanceScore: 0.95
        })
        recommendations.push({
            id: 'food-2',
            type: 'food',
            title: 'Fiber-Rich Meals',
            description: 'Include more vegetables, whole grains, and salads to feel fuller with fewer calories.',
            priority: 'high',
            relevanceScore: 0.90
        })
    }

    if (profile.goals.includes('weight_gain') || profile.goals.includes('muscle_building')) {
        recommendations.push({
            id: 'food-3',
            type: 'food',
            title: 'Calorie-Dense Healthy Foods',
            description: 'Add nuts, ghee, bananas, and whole milk to increase healthy calorie intake.',
            priority: 'high',
            relevanceScore: 0.92
        })
        recommendations.push({
            id: 'food-4',
            type: 'food',
            title: 'Post-Workout Nutrition',
            description: 'Consume protein within 30 minutes of exercise for muscle recovery.',
            priority: 'medium',
            relevanceScore: 0.85
        })
    }

    // Mental health-specific food recommendations
    if (profile.medicalConditions.includes('depression') ||
        profile.medicalConditions.includes('anxiety') ||
        profile.goals.includes('improve_mental_health')) {
        recommendations.push({
            id: 'food-5',
            type: 'food',
            title: 'Mood-Boosting Foods',
            description: 'Include omega-3 rich foods like walnuts, flaxseeds, and fatty fish to support brain health.',
            priority: 'high',
            relevanceScore: 0.93
        })
        recommendations.push({
            id: 'food-6',
            type: 'food',
            title: 'Magnesium-Rich Foods',
            description: 'Dark chocolate, bananas, and spinach can help reduce anxiety symptoms.',
            priority: 'medium',
            relevanceScore: 0.82
        })
    }

    // Exercise Recommendations
    if (profile.activityLevel === 'sedentary') {
        recommendations.push({
            id: 'exercise-1',
            type: 'exercise',
            title: 'Start with Daily Walks',
            description: '15-20 minute walks after meals can improve digestion and boost mood.',
            priority: 'high',
            relevanceScore: 0.94
        })
    } else if (profile.activityLevel === 'lightly_active') {
        recommendations.push({
            id: 'exercise-2',
            type: 'exercise',
            title: 'Add Strength Training',
            description: '2-3 days of bodyweight exercises can increase metabolism and energy levels.',
            priority: 'medium',
            relevanceScore: 0.86
        })
    }

    // Medical condition-specific recommendations
    if (profile.medicalConditions.includes('diabetes')) {
        recommendations.push({
            id: 'health-1',
            type: 'food',
            title: 'Low Glycemic Index Foods',
            description: 'Choose whole grains, legumes, and non-starchy vegetables to maintain stable blood sugar.',
            priority: 'high',
            relevanceScore: 0.96
        })
    }

    if (profile.medicalConditions.includes('hypertension')) {
        recommendations.push({
            id: 'health-2',
            type: 'food',
            title: 'Reduce Sodium Intake',
            description: 'Limit processed foods and use herbs instead of salt for flavoring.',
            priority: 'high',
            relevanceScore: 0.95
        })
    }

    // Mental Health Recommendations
    recommendations.push({
        id: 'mental-1',
        type: 'mental_health',
        title: 'Mindful Eating Practice',
        description: 'Take 5 deep breaths before meals and eat without distractions for better digestion.',
        priority: 'medium',
        relevanceScore: 0.80
    })

    // Sort by relevance score
    return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

/**
 * Generate food suggestions based on meal type and user profile
 */
export function generateMealSuggestions(
    profile: UserProfile,
    mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner',
    availableFoods: FoodItem[]
): FoodItem[] {
    const bmi = calculateBMI(profile.weight, profile.height)
    const isWeightLoss = profile.goals.includes('weight_loss')
    const isWeightGain = profile.goals.includes('weight_gain')
    const hasDiabetes = profile.medicalConditions.includes('diabetes')

    let filtered = availableFoods.filter(food => {
        // Filter by meal appropriateness
        if (mealType === 'breakfast' && !['breakfast', 'fruit', 'dairy', 'beverage'].includes(food.category)) {
            return false
        }
        if (mealType === 'snack' && !['snack', 'fruit', 'beverage'].includes(food.category)) {
            return false
        }

        // Weight loss: prioritize low calorie, high protein
        if (isWeightLoss && food.calories > 400) {
            return false
        }

        // Diabetes: avoid high-carb foods
        if (hasDiabetes && food.carbs > 50) {
            return false
        }

        return true
    })

    // Sort by relevance
    filtered.sort((a, b) => {
        let scoreA = 0
        let scoreB = 0

        // Protein priority for weight loss/muscle building
        if (isWeightLoss || profile.goals.includes('muscle_building')) {
            scoreA += a.protein * 2
            scoreB += b.protein * 2
        }

        // Calorie efficiency
        if (isWeightLoss) {
            scoreA -= a.calories / 100
            scoreB -= b.calories / 100
        } else if (isWeightGain) {
            scoreA += a.calories / 100
            scoreB += b.calories / 100
        }

        return scoreB - scoreA
    })

    return filtered.slice(0, 10)
}

// Helper functions
function getActivityScore(level: string): number {
    const scores: Record<string, number> = {
        sedentary: 1,
        lightly_active: 2,
        moderately_active: 3,
        very_active: 4,
        extremely_active: 5
    }
    return scores[level] || 1
}

function getGoalScore(goals: string[]): number {
    let score = 0
    if (goals.includes('weight_loss')) score += 2
    if (goals.includes('weight_gain')) score += 2
    if (goals.includes('muscle_building')) score += 2
    if (goals.includes('improve_mental_health')) score += 1
    if (goals.includes('calorie_tracking')) score += 1
    return score
}

function getHealthScore(conditions: MedicalCondition[]): number {
    if (conditions.includes('none') || conditions.length === 0) return 10
    return Math.max(0, 10 - conditions.length * 2)
}

/**
 * Calculate recommendation confidence score
 * Used to show how confident the system is in its recommendations
 */
export function calculateConfidenceScore(
    profile: UserProfile,
    daysOfData: number
): number {
    let confidence = 50 // Base confidence

    // More data = higher confidence
    confidence += Math.min(30, daysOfData * 3)

    // Complete profile = higher confidence
    if (profile.location) confidence += 2
    if (profile.medicalConditions.length > 0) confidence += 3
    if (profile.targetWeight) confidence += 5

    return Math.min(100, confidence)
}
