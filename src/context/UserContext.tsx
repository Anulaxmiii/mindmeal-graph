import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserProfile, Goal, ActivityLevel, MedicalCondition } from '@/types'
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '@/utils/storage'
import { calculateAllHealthMetrics } from '@/utils/mlCalculations'

interface UserContextType {
    profile: UserProfile | null
    hasCompletedOnboarding: boolean
    healthMetrics: ReturnType<typeof calculateAllHealthMetrics> | null
    updateProfile: (data: Partial<UserProfile>) => void
    completeOnboarding: () => void
    resetProfile: () => void
}

const defaultProfile: UserProfile = {
    location: '',
    language: 'english',
    gender: 'male',
    goals: [],
    activityLevel: 'sedentary',
    age: 25,
    height: 170,
    weight: 70,
    targetWeight: undefined,
    medicalConditions: []
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

    // Load profile from storage on mount
    useEffect(() => {
        const storedProfile = getStorageItem<UserProfile>(STORAGE_KEYS.PROFILE)
        const onboardingComplete = getStorageItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE)

        if (storedProfile) {
            setProfile(storedProfile)
        }
        if (onboardingComplete) {
            setHasCompletedOnboarding(true)
        }
    }, [])

    // Calculate health metrics when profile changes
    const healthMetrics = profile ? calculateAllHealthMetrics(profile) : null

    // Update profile
    const updateProfile = (data: Partial<UserProfile>) => {
        setProfile(prev => {
            const updated = { ...(prev || defaultProfile), ...data }
            setStorageItem(STORAGE_KEYS.PROFILE, updated)
            return updated
        })
    }

    // Mark onboarding as complete
    const completeOnboarding = () => {
        setHasCompletedOnboarding(true)
        setStorageItem(STORAGE_KEYS.ONBOARDING_COMPLETE, true)
    }

    // Reset profile
    const resetProfile = () => {
        setProfile(null)
        setHasCompletedOnboarding(false)
    }

    return (
        <UserContext.Provider
            value={{
                profile,
                hasCompletedOnboarding,
                healthMetrics,
                updateProfile,
                completeOnboarding,
                resetProfile
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
