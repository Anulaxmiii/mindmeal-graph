import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    Languages,
    Users,
    Target,
    Activity,
    Calendar,
    Ruler,
    Scale,
    Heart,
    Check,
    Leaf
} from 'lucide-react'
import { Button, Progress } from '@/components/ui'
import { useUser } from '@/context/UserContext'
import { useAuth } from '@/context/AuthContext'
import { indianStates, languages, activityLevels, healthGoals, medicalConditions } from '@/data/states'
import { Goal, ActivityLevel, MedicalCondition } from '@/types'

const steps = [
    { id: 1, title: 'Location', icon: MapPin, field: 'location' },
    { id: 2, title: 'Language', icon: Languages, field: 'language' },
    { id: 3, title: 'Gender', icon: Users, field: 'gender' },
    { id: 4, title: 'Goals', icon: Target, field: 'goals' },
    { id: 5, title: 'Activity', icon: Activity, field: 'activityLevel' },
    { id: 6, title: 'Age', icon: Calendar, field: 'age' },
    { id: 7, title: 'Height', icon: Ruler, field: 'height' },
    { id: 8, title: 'Weight', icon: Scale, field: 'weight' },
    { id: 9, title: 'Target', icon: Target, field: 'targetWeight' },
    { id: 10, title: 'Health', icon: Heart, field: 'medicalConditions' },
]

export default function Onboarding() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const { updateProfile, completeOnboarding } = useUser()

    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        location: '',
        language: 'english' as const,
        gender: 'male' as const,
        goals: [] as Goal[],
        activityLevel: 'sedentary' as ActivityLevel,
        age: 25,
        height: 170,
        weight: 70,
        targetWeight: 65,
        medicalConditions: [] as MedicalCondition[]
    })

    // Check if target weight step should be skipped
    const shouldSkipTargetWeight = !formData.goals.includes('weight_loss') &&
        !formData.goals.includes('weight_gain')

    const totalSteps = shouldSkipTargetWeight ? 9 : 10
    const effectiveStep = shouldSkipTargetWeight && currentStep >= 9 ? currentStep + 1 : currentStep
    const progress = (currentStep / totalSteps) * 100

    const handleNext = () => {
        // Skip target weight step if not applicable
        if (currentStep === 8 && shouldSkipTargetWeight) {
            setCurrentStep(10)
        } else if (currentStep < 10) {
            setCurrentStep(currentStep + 1)
        } else {
            // Complete onboarding
            updateProfile(formData)
            completeOnboarding()
            navigate('/welcome')
        }
    }

    const handleBack = () => {
        if (currentStep === 10 && shouldSkipTargetWeight) {
            setCurrentStep(8)
        } else if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.location !== ''
            case 2: return true
            case 3: return true
            case 4: return formData.goals.length > 0
            case 5: return true
            case 6: return formData.age >= 13 && formData.age <= 100
            case 7: return formData.height >= 100 && formData.height <= 250
            case 8: return formData.weight >= 30 && formData.weight <= 300
            case 9: return formData.targetWeight >= 30 && formData.targetWeight <= 300
            case 10: return true
            default: return false
        }
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
        navigate('/login')
        return null
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Where are you from?</h2>
                        <p className="text-gray-600">This helps us provide location-relevant food suggestions.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 max-h-80 overflow-y-auto">
                            {indianStates.map((state) => (
                                <button
                                    key={state.value}
                                    onClick={() => setFormData({ ...formData, location: state.value })}
                                    className={`p-3 rounded-xl border-2 text-left transition-all ${formData.location === state.value
                                            ? 'border-mint-500 bg-mint-50 text-mint-700'
                                            : 'border-gray-200 hover:border-mint-300'
                                        }`}
                                >
                                    {state.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Preferred Language</h2>
                        <p className="text-gray-600">Choose your preferred language for the app.</p>
                        <div className="space-y-3 mt-6">
                            {languages.map((lang) => (
                                <button
                                    key={lang.value}
                                    onClick={() => setFormData({ ...formData, language: lang.value as any })}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${formData.language === lang.value
                                            ? 'border-mint-500 bg-mint-50'
                                            : 'border-gray-200 hover:border-mint-300'
                                        }`}
                                >
                                    <span className="font-medium">{lang.label}</span>
                                    {formData.language === lang.value && (
                                        <Check className="w-5 h-5 text-mint-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What's your gender?</h2>
                        <p className="text-gray-600">This helps calculate your daily calorie needs accurately.</p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[
                                { value: 'male', label: 'Male', emoji: '👨' },
                                { value: 'female', label: 'Female', emoji: '👩' },
                                { value: 'other', label: 'Other', emoji: '🧑' }
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setFormData({ ...formData, gender: option.value as any })}
                                    className={`p-6 rounded-xl border-2 text-center transition-all ${formData.gender === option.value
                                            ? 'border-mint-500 bg-mint-50'
                                            : 'border-gray-200 hover:border-mint-300'
                                        }`}
                                >
                                    <div className="text-4xl mb-2">{option.emoji}</div>
                                    <div className="font-medium">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What are your goals?</h2>
                        <p className="text-gray-600">Select all that apply to personalize your experience.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                            {healthGoals.map((goal) => {
                                const isSelected = formData.goals.includes(goal.value as Goal)
                                return (
                                    <button
                                        key={goal.value}
                                        onClick={() => {
                                            const newGoals = isSelected
                                                ? formData.goals.filter(g => g !== goal.value)
                                                : [...formData.goals, goal.value as Goal]
                                            setFormData({ ...formData, goals: newGoals })
                                        }}
                                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${isSelected
                                                ? 'border-mint-500 bg-mint-50'
                                                : 'border-gray-200 hover:border-mint-300'
                                            }`}
                                    >
                                        <span className="text-2xl">{goal.icon}</span>
                                        <span className="font-medium">{goal.label}</span>
                                        {isSelected && <Check className="w-5 h-5 text-mint-600 ml-auto" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">How active are you?</h2>
                        <p className="text-gray-600">Your activity level affects your daily calorie needs.</p>
                        <div className="space-y-3 mt-6">
                            {activityLevels.map((level) => (
                                <button
                                    key={level.value}
                                    onClick={() => setFormData({ ...formData, activityLevel: level.value as ActivityLevel })}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${formData.activityLevel === level.value
                                            ? 'border-mint-500 bg-mint-50'
                                            : 'border-gray-200 hover:border-mint-300'
                                        }`}
                                >
                                    <div className="font-medium">{level.label}</div>
                                    <div className="text-sm text-gray-500">{level.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )

            case 6:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">How old are you?</h2>
                        <p className="text-gray-600">Age is important for calculating your metabolic rate.</p>
                        <div className="mt-8 flex flex-col items-center">
                            <div className="text-7xl font-bold text-mint-600 mb-8">{formData.age}</div>
                            <input
                                type="range"
                                min="13"
                                max="100"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mint-500"
                            />
                            <div className="flex justify-between w-full mt-2 text-sm text-gray-500">
                                <span>13</span>
                                <span>100</span>
                            </div>
                        </div>
                    </div>
                )

            case 7:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What's your height?</h2>
                        <p className="text-gray-600">Enter your height in centimeters.</p>
                        <div className="mt-8 flex flex-col items-center">
                            <div className="text-7xl font-bold text-mint-600 mb-2">{formData.height}</div>
                            <div className="text-xl text-gray-500 mb-8">cm</div>
                            <input
                                type="range"
                                min="100"
                                max="250"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mint-500"
                            />
                            <div className="flex justify-between w-full mt-2 text-sm text-gray-500">
                                <span>100 cm</span>
                                <span>250 cm</span>
                            </div>
                        </div>
                    </div>
                )

            case 8:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What's your current weight?</h2>
                        <p className="text-gray-600">Enter your weight in kilograms.</p>
                        <div className="mt-8 flex flex-col items-center">
                            <div className="text-7xl font-bold text-mint-600 mb-2">{formData.weight}</div>
                            <div className="text-xl text-gray-500 mb-8">kg</div>
                            <input
                                type="range"
                                min="30"
                                max="200"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mint-500"
                            />
                            <div className="flex justify-between w-full mt-2 text-sm text-gray-500">
                                <span>30 kg</span>
                                <span>200 kg</span>
                            </div>
                        </div>
                    </div>
                )

            case 9:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What's your target weight?</h2>
                        <p className="text-gray-600">This helps us create a personalized plan for you.</p>
                        <div className="mt-8 flex flex-col items-center">
                            <div className="text-7xl font-bold text-mint-600 mb-2">{formData.targetWeight}</div>
                            <div className="text-xl text-gray-500 mb-8">kg</div>
                            <input
                                type="range"
                                min="30"
                                max="200"
                                value={formData.targetWeight}
                                onChange={(e) => setFormData({ ...formData, targetWeight: parseInt(e.target.value) })}
                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mint-500"
                            />
                            <div className="flex justify-between w-full mt-2 text-sm text-gray-500">
                                <span>30 kg</span>
                                <span>200 kg</span>
                            </div>
                            <div className="mt-4 text-center">
                                <span className={`text-sm font-medium ${formData.targetWeight < formData.weight ? 'text-blue-600' :
                                        formData.targetWeight > formData.weight ? 'text-green-600' : 'text-gray-600'
                                    }`}>
                                    {formData.targetWeight < formData.weight
                                        ? `Aiming to lose ${formData.weight - formData.targetWeight} kg`
                                        : formData.targetWeight > formData.weight
                                            ? `Aiming to gain ${formData.targetWeight - formData.weight} kg`
                                            : 'Maintaining current weight'}
                                </span>
                            </div>
                        </div>
                    </div>
                )

            case 10:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Any medical conditions?</h2>
                        <p className="text-gray-600">This helps us provide safer recommendations.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                            {medicalConditions.map((condition) => {
                                const isSelected = formData.medicalConditions.includes(condition.value as MedicalCondition)
                                return (
                                    <button
                                        key={condition.value}
                                        onClick={() => {
                                            let newConditions: MedicalCondition[]
                                            if (condition.value === 'none') {
                                                newConditions = isSelected ? [] : ['none']
                                            } else {
                                                newConditions = isSelected
                                                    ? formData.medicalConditions.filter(c => c !== condition.value)
                                                    : [...formData.medicalConditions.filter(c => c !== 'none'), condition.value as MedicalCondition]
                                            }
                                            setFormData({ ...formData, medicalConditions: newConditions })
                                        }}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                ? 'border-mint-500 bg-mint-50'
                                                : 'border-gray-200 hover:border-mint-300'
                                            }`}
                                    >
                                        <div className="font-medium">{condition.label}</div>
                                        <div className="text-sm text-gray-500">{condition.description}</div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50">
            {/* Header */}
            <div className="max-w-2xl mx-auto px-6 py-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">MindMeal</span>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm font-medium text-mint-600">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <Progress value={progress} />
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                    >
                        {currentStep === 10 ? 'Complete' : 'Next'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
