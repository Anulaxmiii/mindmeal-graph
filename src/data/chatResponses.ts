/**
 * AI Chat responses for the health assistant
 */
export const chatResponses: Record<string, string[]> = {
    greeting: [
        "Hello! I'm your MindMeal AI assistant. How can I help you with your health and nutrition today? 🌿",
        "Hi there! Ready to help you on your wellness journey. What would you like to know?",
        "Welcome! I'm here to assist with diet, nutrition, and mental wellness questions."
    ],

    weight_loss: [
        "For healthy weight loss, aim for a calorie deficit of 500-750 calories per day. This translates to losing about 0.5-0.75 kg per week.\n\n**Key Tips:**\n• Eat protein-rich breakfast (eggs, paneer, dal)\n• Include fiber in every meal\n• Drink water before meals\n• Avoid sugary beverages\n• Practice portion control",
        "Weight loss is most effective when combined with regular physical activity. Start with 30 minutes of walking daily and gradually increase intensity.\n\n**Focus on:**\n• Whole grains over refined carbs\n• Vegetables in every meal\n• Lean proteins\n• Mindful eating practices"
    ],

    weight_gain: [
        "For healthy weight gain, aim for a calorie surplus of 300-500 calories per day.\n\n**Nutrient-Dense Foods:**\n• Nuts and nut butters\n• Whole milk and dairy\n• Ghee and healthy oils\n• Bananas and mangoes\n• Whole grain rotis with ghee\n\nFocus on strength training to build muscle mass.",
        "Gaining weight healthily requires eating more frequently and choosing calorie-dense nutritious foods.\n\n**Meal Ideas:**\n• Add extra ghee to dal and rice\n• Snack on dry fruits between meals\n• Include protein shakes\n• Have a banana with peanut butter"
    ],

    high_protein: [
        "**High-Protein Indian Foods (per 100g):**\n\n• Paneer: 18g protein\n• Chicken breast: 31g protein\n• Eggs: 13g protein\n• Chana: 19g protein\n• Moong dal: 24g protein\n• Greek yogurt: 10g protein\n• Tofu: 8g protein\n• Fish: 20-25g protein\n\nAim for 1.6-2g protein per kg body weight for muscle building.",
        "For vegetarians, combine legumes with grains for complete protein:\n\n• Dal + Rice = Complete amino acids\n• Rajma + Roti\n• Chole + Bhature\n• Paneer dishes\n• Sprouts salad\n\nAdd nuts and seeds as snacks for extra protein."
    ],

    mental_health: [
        "**Foods that Support Mental Health:**\n\n🧠 **Omega-3 Rich:** Walnuts, flaxseeds, chia seeds\n🌿 **Mood Boosters:** Dark chocolate, bananas, berries\n💚 **B-Vitamins:** Whole grains, eggs, leafy greens\n🍊 **Vitamin D:** Sunlight, fortified milk, mushrooms\n\nRegular exercise and adequate sleep are equally important for mental wellness.",
        "The gut-brain connection is powerful! A healthy gut promotes better mental health.\n\n**Gut-Friendly Foods:**\n• Curd/Yogurt (probiotics)\n• Fiber-rich vegetables\n• Fermented foods (idli, dosa, kanji)\n• Whole grains\n\nAvoid processed foods and excess sugar which can worsen anxiety."
    ],

    diabetes: [
        "**For Blood Sugar Management:**\n\n✅ **Choose Low GI Foods:**\n• Brown rice over white rice\n• Whole wheat roti\n• Legumes and lentils\n• Non-starchy vegetables\n\n❌ **Limit:**\n• Sugary drinks\n• White bread and maida\n• Potatoes in excess\n• Fruit juices\n\nEat smaller, frequent meals to maintain stable blood sugar.",
        "Managing diabetes with Indian diet:\n\n**Breakfast:** Vegetable upma, besan chilla, or idli with sambar\n**Lunch:** Roti + dal + sabzi + salad\n**Snack:** Sprouts, makhana, or handful of nuts\n**Dinner:** Light dal, grilled paneer/fish with vegetables\n\nMonitor portions and timing of carbohydrates."
    ],

    calories: [
        "Understanding your calorie needs:\n\n**BMR (at rest):** Based on age, weight, height, gender\n**TDEE:** BMR × Activity factor\n\n**Activity Multipliers:**\n• Sedentary: 1.2\n• Lightly active: 1.375\n• Moderately active: 1.55\n• Very active: 1.725\n\nYour personalized calorie goal is shown on your dashboard!",
        "Tips for calorie tracking:\n\n1. Log everything, including cooking oil\n2. Use measuring cups initially\n3. Don't forget beverages\n4. Read food labels\n5. Plan meals in advance\n\nThe MindMeal food tracker makes this easy - try logging your next meal!"
    ],

    exercise: [
        "**Simple Exercise Routine for Beginners:**\n\n🚶 **Week 1-2:** 15-20 min walking daily\n🏃 **Week 3-4:** 25-30 min brisk walking\n💪 **Week 5+:** Add bodyweight exercises\n\n**Home Workout Ideas:**\n• Surya Namaskar (10 rounds)\n• Squats (3×15)\n• Push-ups (3×10)\n• Planks (30 seconds × 3)",
        "For best results, combine cardio with strength training:\n\n**Cardio (3 days/week):**\n• Walking, jogging, cycling\n• Dancing, aerobics\n\n**Strength (2-3 days/week):**\n• Bodyweight exercises\n• Resistance bands\n• Light weights\n\nRest is important - take 1-2 rest days per week."
    ],

    default: [
        "I can help you with:\n\n🥗 Diet and nutrition advice\n💪 Weight management tips\n🧠 Mental health and food connection\n📊 Understanding calories and macros\n🏃 Exercise recommendations\n\nWhat would you like to know more about?",
        "Feel free to ask me about:\n\n• Weight loss or gain strategies\n• High-protein meal ideas\n• Foods for mental wellness\n• Managing conditions like diabetes\n• Calorie and macro information\n\nI'm here to help!"
    ]
}

/**
 * Get AI response based on message keywords
 */
export function getAIResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    // Check for keywords and return appropriate response
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return getRandomResponse('greeting')
    }
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight') || lowerMessage.includes('slim')) {
        return getRandomResponse('weight_loss')
    }
    if (lowerMessage.includes('weight gain') || lowerMessage.includes('gain weight') || lowerMessage.includes('bulk')) {
        return getRandomResponse('weight_gain')
    }
    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
        return getRandomResponse('high_protein')
    }
    if (lowerMessage.includes('mental') || lowerMessage.includes('mood') || lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('depression')) {
        return getRandomResponse('mental_health')
    }
    if (lowerMessage.includes('diabetes') || lowerMessage.includes('sugar') || lowerMessage.includes('blood sugar')) {
        return getRandomResponse('diabetes')
    }
    if (lowerMessage.includes('calorie') || lowerMessage.includes('calories') || lowerMessage.includes('bmr') || lowerMessage.includes('tdee')) {
        return getRandomResponse('calories')
    }
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('gym') || lowerMessage.includes('fitness')) {
        return getRandomResponse('exercise')
    }

    return getRandomResponse('default')
}

function getRandomResponse(category: string): string {
    const responses = chatResponses[category] || chatResponses.default
    return responses[Math.floor(Math.random() * responses.length)]
}
