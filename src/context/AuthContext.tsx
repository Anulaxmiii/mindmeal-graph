import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '@/utils/storage'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<boolean>
    signup: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load user from storage on mount
    useEffect(() => {
        const storedUser = getStorageItem<User>(STORAGE_KEYS.USER)
        if (storedUser) {
            setUser(storedUser)
        }
        setIsLoading(false)
    }, [])

    // Login function
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800))

            // Check stored credentials (simplified - in real app, this would be API call)
            const storedAuth = getStorageItem<{ email: string; password: string }>(STORAGE_KEYS.AUTH)

            if (storedAuth && storedAuth.email === email && storedAuth.password === password) {
                const storedUser = getStorageItem<User>(STORAGE_KEYS.USER)
                if (storedUser) {
                    setUser(storedUser)
                    return true
                }
            }

            // For demo: allow any login if no stored auth
            if (!storedAuth) {
                const newUser: User = {
                    id: `user_${Date.now()}`,
                    name: email.split('@')[0],
                    email,
                    createdAt: new Date().toISOString()
                }
                setUser(newUser)
                setStorageItem(STORAGE_KEYS.USER, newUser)
                setStorageItem(STORAGE_KEYS.AUTH, { email, password })
                return true
            }

            return false
        } catch (error) {
            console.error('Login error:', error)
            return false
        }
    }

    // Signup function
    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800))

            // Create new user
            const newUser: User = {
                id: `user_${Date.now()}`,
                name,
                email,
                createdAt: new Date().toISOString()
            }

            // Store credentials and user
            setStorageItem(STORAGE_KEYS.AUTH, { email, password })
            setStorageItem(STORAGE_KEYS.USER, newUser)
            setUser(newUser)

            return true
        } catch (error) {
            console.error('Signup error:', error)
            return false
        }
    }

    // Logout function
    const logout = () => {
        setUser(null)
        removeStorageItem(STORAGE_KEYS.USER)
        removeStorageItem(STORAGE_KEYS.AUTH)
        removeStorageItem(STORAGE_KEYS.PROFILE)
        removeStorageItem(STORAGE_KEYS.ONBOARDING_COMPLETE)
        removeStorageItem(STORAGE_KEYS.FOOD_LOGS)
        removeStorageItem(STORAGE_KEYS.CHAT_HISTORY)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
