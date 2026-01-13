/**
 * localStorage utility functions for data persistence
 */

const STORAGE_KEYS = {
    AUTH: 'mindmeal_auth',
    USER: 'mindmeal_user',
    PROFILE: 'mindmeal_profile',
    FOOD_LOGS: 'mindmeal_food_logs',
    ONBOARDING_COMPLETE: 'mindmeal_onboarding_complete',
    CHAT_HISTORY: 'mindmeal_chat_history',
} as const

/**
 * Get item from localStorage with JSON parsing
 */
export function getStorageItem<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.error(`Error reading from localStorage: ${key}`, error)
        return null
    }
}

/**
 * Set item in localStorage with JSON stringification
 */
export function setStorageItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(`Error writing to localStorage: ${key}`, error)
    }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): void {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error(`Error removing from localStorage: ${key}`, error)
    }
}

/**
 * Clear all MindMeal data from localStorage
 */
export function clearAllStorage(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
        removeStorageItem(key)
    })
}

export { STORAGE_KEYS }
