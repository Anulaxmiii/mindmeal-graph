/**
 * Indian States and Union Territories
 */
export const indianStates = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    // Union Territories
    { value: 'andaman-nicobar', label: 'Andaman and Nicobar Islands' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'dadra-nagar-haveli', label: 'Dadra and Nagar Haveli' },
    { value: 'daman-diu', label: 'Daman and Diu' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'jammu-kashmir', label: 'Jammu and Kashmir' },
    { value: 'ladakh', label: 'Ladakh' },
    { value: 'lakshadweep', label: 'Lakshadweep' },
    { value: 'puducherry', label: 'Puducherry' }
]

/**
 * Languages available
 */
export const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' }
]

/**
 * Activity Levels
 */
export const activityLevels = [
    {
        value: 'sedentary',
        label: 'Sedentary',
        description: 'Little or no exercise, desk job'
    },
    {
        value: 'lightly_active',
        label: 'Lightly Active',
        description: 'Light exercise 1-3 days per week'
    },
    {
        value: 'moderately_active',
        label: 'Moderately Active',
        description: 'Moderate exercise 3-5 days per week'
    },
    {
        value: 'very_active',
        label: 'Very Active',
        description: 'Hard exercise 6-7 days per week'
    },
    {
        value: 'extremely_active',
        label: 'Extremely Active',
        description: 'Very hard daily exercise or physical job'
    }
]

/**
 * Health Goals
 */
export const healthGoals = [
    { value: 'weight_loss', label: 'Lose Weight', icon: '⚖️' },
    { value: 'weight_gain', label: 'Gain Weight', icon: '💪' },
    { value: 'maintain_weight', label: 'Maintain Weight', icon: '🎯' },
    { value: 'diet_plan', label: 'Follow a Diet Plan', icon: '🥗' },
    { value: 'calorie_tracking', label: 'Track Calories', icon: '📊' },
    { value: 'muscle_building', label: 'Build Muscle', icon: '🏋️' },
    { value: 'improve_mental_health', label: 'Improve Mental Health', icon: '🧠' }
]

/**
 * Medical Conditions
 */
export const medicalConditions = [
    { value: 'none', label: 'None', description: 'No medical conditions' },
    { value: 'diabetes', label: 'Diabetes', description: 'Type 1 or Type 2 diabetes' },
    { value: 'thyroid', label: 'Thyroid Disorder', description: 'Hypo or hyperthyroidism' },
    { value: 'hypertension', label: 'Hypertension', description: 'High blood pressure' },
    { value: 'depression', label: 'Depression', description: 'Clinical depression' },
    { value: 'anxiety', label: 'Anxiety', description: 'Anxiety disorder' },
    { value: 'pcos', label: 'PCOS', description: 'Polycystic ovary syndrome' },
    { value: 'heart_disease', label: 'Heart Disease', description: 'Cardiovascular conditions' }
]
