import { FoodItem } from '@/types'

/**
 * Comprehensive Indian Food Database
 * Contains nutritional information for common Indian foods
 */
export const indianFoods: FoodItem[] = [
    // Breakfast Items
    {
        id: 'idli',
        name: 'Idli',
        nameHindi: 'इडली',
        calories: 39,
        protein: 2,
        carbs: 8,
        fat: 0.1,
        fiber: 0.5,
        category: 'breakfast',
        servingSize: '1 piece',
        servingGrams: 30
    },
    {
        id: 'dosa',
        name: 'Plain Dosa',
        nameHindi: 'डोसा',
        calories: 168,
        protein: 4,
        carbs: 28,
        fat: 4,
        fiber: 1,
        category: 'breakfast',
        servingSize: '1 medium',
        servingGrams: 100
    },
    {
        id: 'masala-dosa',
        name: 'Masala Dosa',
        nameHindi: 'मसाला डोसा',
        calories: 250,
        protein: 5,
        carbs: 35,
        fat: 10,
        fiber: 2,
        category: 'breakfast',
        servingSize: '1 medium',
        servingGrams: 150
    },
    {
        id: 'poha',
        name: 'Poha',
        nameHindi: 'पोहा',
        calories: 180,
        protein: 4,
        carbs: 32,
        fat: 5,
        fiber: 2,
        category: 'breakfast',
        servingSize: '1 plate',
        servingGrams: 150
    },
    {
        id: 'upma',
        name: 'Upma',
        nameHindi: 'उपमा',
        calories: 200,
        protein: 5,
        carbs: 30,
        fat: 7,
        fiber: 3,
        category: 'breakfast',
        servingSize: '1 plate',
        servingGrams: 150
    },
    {
        id: 'paratha',
        name: 'Aloo Paratha',
        nameHindi: 'आलू पराठा',
        calories: 300,
        protein: 6,
        carbs: 40,
        fat: 12,
        fiber: 3,
        category: 'breakfast',
        servingSize: '1 piece',
        servingGrams: 120
    },
    {
        id: 'puri',
        name: 'Puri',
        nameHindi: 'पूड़ी',
        calories: 150,
        protein: 2,
        carbs: 15,
        fat: 9,
        fiber: 1,
        category: 'breakfast',
        servingSize: '2 pieces',
        servingGrams: 60
    },

    // Rice & Grains
    {
        id: 'white-rice',
        name: 'White Rice',
        nameHindi: 'चावल',
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3,
        fiber: 0.4,
        category: 'grain',
        servingSize: '1 cup cooked',
        servingGrams: 100
    },
    {
        id: 'brown-rice',
        name: 'Brown Rice',
        nameHindi: 'ब्राउन राइस',
        calories: 112,
        protein: 2.3,
        carbs: 24,
        fat: 0.8,
        fiber: 1.8,
        category: 'grain',
        servingSize: '1 cup cooked',
        servingGrams: 100
    },
    {
        id: 'chapati',
        name: 'Chapati / Roti',
        nameHindi: 'चपाती',
        calories: 104,
        protein: 3,
        carbs: 20,
        fat: 2,
        fiber: 2,
        category: 'grain',
        servingSize: '1 medium',
        servingGrams: 40
    },
    {
        id: 'naan',
        name: 'Naan',
        nameHindi: 'नान',
        calories: 260,
        protein: 9,
        carbs: 45,
        fat: 5,
        fiber: 2,
        category: 'grain',
        servingSize: '1 piece',
        servingGrams: 90
    },
    {
        id: 'jeera-rice',
        name: 'Jeera Rice',
        nameHindi: 'जीरा राइस',
        calories: 180,
        protein: 3,
        carbs: 30,
        fat: 5,
        fiber: 1,
        category: 'grain',
        servingSize: '1 cup',
        servingGrams: 150
    },
    {
        id: 'biryani',
        name: 'Veg Biryani',
        nameHindi: 'बिरयानी',
        calories: 290,
        protein: 6,
        carbs: 45,
        fat: 10,
        fiber: 3,
        category: 'grain',
        servingSize: '1 plate',
        servingGrams: 200
    },

    // Dal & Lentils
    {
        id: 'dal-tadka',
        name: 'Dal Tadka',
        nameHindi: 'दाल तड़का',
        calories: 150,
        protein: 9,
        carbs: 20,
        fat: 4,
        fiber: 6,
        category: 'protein',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'sambar',
        name: 'Sambar',
        nameHindi: 'सांभर',
        calories: 120,
        protein: 6,
        carbs: 18,
        fat: 3,
        fiber: 5,
        category: 'protein',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'chana-masala',
        name: 'Chana Masala',
        nameHindi: 'छोले',
        calories: 210,
        protein: 12,
        carbs: 30,
        fat: 6,
        fiber: 8,
        category: 'protein',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'rajma',
        name: 'Rajma',
        nameHindi: 'राजमा',
        calories: 180,
        protein: 10,
        carbs: 28,
        fat: 4,
        fiber: 7,
        category: 'protein',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'dal-makhani',
        name: 'Dal Makhani',
        nameHindi: 'दाल मखनी',
        calories: 250,
        protein: 10,
        carbs: 25,
        fat: 12,
        fiber: 6,
        category: 'protein',
        servingSize: '1 bowl',
        servingGrams: 150
    },

    // Vegetables
    {
        id: 'aloo-gobi',
        name: 'Aloo Gobi',
        nameHindi: 'आलू गोभी',
        calories: 150,
        protein: 4,
        carbs: 22,
        fat: 5,
        fiber: 4,
        category: 'vegetable',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'palak-paneer',
        name: 'Palak Paneer',
        nameHindi: 'पालक पनीर',
        calories: 280,
        protein: 14,
        carbs: 10,
        fat: 20,
        fiber: 4,
        category: 'vegetable',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'bhindi',
        name: 'Bhindi Fry',
        nameHindi: 'भिंडी',
        calories: 120,
        protein: 3,
        carbs: 15,
        fat: 6,
        fiber: 4,
        category: 'vegetable',
        servingSize: '1 bowl',
        servingGrams: 100
    },
    {
        id: 'baingan-bharta',
        name: 'Baingan Bharta',
        nameHindi: 'बैंगन भर्ता',
        calories: 130,
        protein: 3,
        carbs: 12,
        fat: 8,
        fiber: 5,
        category: 'vegetable',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'mixed-veg',
        name: 'Mixed Vegetable',
        nameHindi: 'मिक्स वेज',
        calories: 110,
        protein: 4,
        carbs: 15,
        fat: 4,
        fiber: 4,
        category: 'vegetable',
        servingSize: '1 bowl',
        servingGrams: 150
    },

    // Protein Sources
    {
        id: 'paneer-tikka',
        name: 'Paneer Tikka',
        nameHindi: 'पनीर टिक्का',
        calories: 260,
        protein: 18,
        carbs: 8,
        fat: 18,
        fiber: 1,
        category: 'protein',
        servingSize: '6 pieces',
        servingGrams: 150
    },
    {
        id: 'boiled-egg',
        name: 'Boiled Egg',
        nameHindi: 'उबला अंडा',
        calories: 78,
        protein: 6,
        carbs: 0.6,
        fat: 5,
        fiber: 0,
        category: 'protein',
        servingSize: '1 large',
        servingGrams: 50
    },
    {
        id: 'egg-bhurji',
        name: 'Egg Bhurji',
        nameHindi: 'अंडा भुर्जी',
        calories: 200,
        protein: 14,
        carbs: 4,
        fat: 14,
        fiber: 0.5,
        category: 'protein',
        servingSize: '2 eggs',
        servingGrams: 120
    },
    {
        id: 'chicken-curry',
        name: 'Chicken Curry',
        nameHindi: 'चिकन करी',
        calories: 280,
        protein: 25,
        carbs: 8,
        fat: 16,
        fiber: 2,
        category: 'protein',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'tandoori-chicken',
        name: 'Tandoori Chicken',
        nameHindi: 'तंदूरी चिकन',
        calories: 220,
        protein: 30,
        carbs: 4,
        fat: 10,
        fiber: 0,
        category: 'protein',
        servingSize: '2 pieces',
        servingGrams: 150
    },
    {
        id: 'fish-curry',
        name: 'Fish Curry',
        nameHindi: 'मछली करी',
        calories: 200,
        protein: 22,
        carbs: 6,
        fat: 10,
        fiber: 1,
        category: 'protein',
        servingSize: '1 piece',
        servingGrams: 150
    },

    // Snacks
    {
        id: 'samosa',
        name: 'Samosa',
        nameHindi: 'समोसा',
        calories: 260,
        protein: 4,
        carbs: 28,
        fat: 15,
        fiber: 2,
        category: 'snack',
        servingSize: '1 piece',
        servingGrams: 80
    },
    {
        id: 'pakora',
        name: 'Pakora',
        nameHindi: 'पकौड़ा',
        calories: 180,
        protein: 3,
        carbs: 18,
        fat: 11,
        fiber: 2,
        category: 'snack',
        servingSize: '5 pieces',
        servingGrams: 80
    },
    {
        id: 'dhokla',
        name: 'Dhokla',
        nameHindi: 'ढोकला',
        calories: 160,
        protein: 5,
        carbs: 28,
        fat: 3,
        fiber: 2,
        category: 'snack',
        servingSize: '4 pieces',
        servingGrams: 100
    },
    {
        id: 'sprouts-chaat',
        name: 'Sprouts Chaat',
        nameHindi: 'स्प्राउट्स चाट',
        calories: 120,
        protein: 7,
        carbs: 18,
        fat: 2,
        fiber: 5,
        category: 'snack',
        servingSize: '1 bowl',
        servingGrams: 100
    },
    {
        id: 'makhana',
        name: 'Roasted Makhana',
        nameHindi: 'मखाना',
        calories: 100,
        protein: 3,
        carbs: 18,
        fat: 0.5,
        fiber: 1,
        category: 'snack',
        servingSize: '1 cup',
        servingGrams: 30
    },

    // Fruits
    {
        id: 'banana',
        name: 'Banana',
        nameHindi: 'केला',
        calories: 89,
        protein: 1,
        carbs: 23,
        fat: 0.3,
        fiber: 2.6,
        category: 'fruit',
        servingSize: '1 medium',
        servingGrams: 100
    },
    {
        id: 'apple',
        name: 'Apple',
        nameHindi: 'सेब',
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
        fiber: 2.4,
        category: 'fruit',
        servingSize: '1 medium',
        servingGrams: 100
    },
    {
        id: 'mango',
        name: 'Mango',
        nameHindi: 'आम',
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fat: 0.4,
        fiber: 1.6,
        category: 'fruit',
        servingSize: '1 cup sliced',
        servingGrams: 100
    },
    {
        id: 'papaya',
        name: 'Papaya',
        nameHindi: 'पपीता',
        calories: 43,
        protein: 0.5,
        carbs: 11,
        fat: 0.3,
        fiber: 1.7,
        category: 'fruit',
        servingSize: '1 cup',
        servingGrams: 100
    },
    {
        id: 'pomegranate',
        name: 'Pomegranate',
        nameHindi: 'अनार',
        calories: 83,
        protein: 1.7,
        carbs: 19,
        fat: 1.2,
        fiber: 4,
        category: 'fruit',
        servingSize: '1/2 fruit',
        servingGrams: 100
    },

    // Dairy
    {
        id: 'milk',
        name: 'Milk (Full Fat)',
        nameHindi: 'दूध',
        calories: 150,
        protein: 8,
        carbs: 12,
        fat: 8,
        fiber: 0,
        category: 'dairy',
        servingSize: '1 glass',
        servingGrams: 250
    },
    {
        id: 'curd',
        name: 'Curd / Dahi',
        nameHindi: 'दही',
        calories: 100,
        protein: 4,
        carbs: 8,
        fat: 6,
        fiber: 0,
        category: 'dairy',
        servingSize: '1 bowl',
        servingGrams: 150
    },
    {
        id: 'lassi',
        name: 'Sweet Lassi',
        nameHindi: 'मीठी लस्सी',
        calories: 180,
        protein: 5,
        carbs: 30,
        fat: 5,
        fiber: 0,
        category: 'dairy',
        servingSize: '1 glass',
        servingGrams: 250
    },
    {
        id: 'buttermilk',
        name: 'Chaas / Buttermilk',
        nameHindi: 'छाछ',
        calories: 40,
        protein: 3,
        carbs: 5,
        fat: 1,
        fiber: 0,
        category: 'dairy',
        servingSize: '1 glass',
        servingGrams: 250
    },
    {
        id: 'paneer',
        name: 'Paneer (Raw)',
        nameHindi: 'पनीर',
        calories: 265,
        protein: 18,
        carbs: 4,
        fat: 20,
        fiber: 0,
        category: 'dairy',
        servingSize: '100g',
        servingGrams: 100
    },

    // Beverages
    {
        id: 'chai',
        name: 'Masala Chai',
        nameHindi: 'चाय',
        calories: 100,
        protein: 2,
        carbs: 12,
        fat: 4,
        fiber: 0,
        category: 'beverage',
        servingSize: '1 cup',
        servingGrams: 150
    },
    {
        id: 'black-coffee',
        name: 'Black Coffee',
        nameHindi: 'ब्लैक कॉफी',
        calories: 2,
        protein: 0.3,
        carbs: 0,
        fat: 0,
        fiber: 0,
        category: 'beverage',
        servingSize: '1 cup',
        servingGrams: 240
    },
    {
        id: 'coconut-water',
        name: 'Coconut Water',
        nameHindi: 'नारियल पानी',
        calories: 45,
        protein: 2,
        carbs: 9,
        fat: 0.5,
        fiber: 2.6,
        category: 'beverage',
        servingSize: '1 cup',
        servingGrams: 240
    },
    {
        id: 'nimbu-pani',
        name: 'Nimbu Pani (Lemonade)',
        nameHindi: 'नींबू पानी',
        calories: 50,
        protein: 0,
        carbs: 13,
        fat: 0,
        fiber: 0,
        category: 'beverage',
        servingSize: '1 glass',
        servingGrams: 250
    },
    {
        id: 'green-tea',
        name: 'Green Tea',
        nameHindi: 'ग्रीन टी',
        calories: 2,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        category: 'beverage',
        servingSize: '1 cup',
        servingGrams: 240
    }
]

/**
 * Get foods by category
 */
export function getFoodsByCategory(category: string): FoodItem[] {
    return indianFoods.filter(food => food.category === category)
}

/**
 * Search foods by name
 */
export function searchFoods(query: string): FoodItem[] {
    const lowerQuery = query.toLowerCase()
    return indianFoods.filter(food =>
        food.name.toLowerCase().includes(lowerQuery) ||
        food.nameHindi?.includes(query)
    )
}

/**
 * Get food by ID
 */
export function getFoodById(id: string): FoodItem | undefined {
    return indianFoods.find(food => food.id === id)
}
