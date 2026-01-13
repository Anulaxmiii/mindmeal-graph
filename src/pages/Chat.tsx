import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'
import { Card, CardContent, Input, Button } from '@/components/ui'
import { ChatMessage } from '@/types'
import { getAIResponse } from '@/data/chatResponses'
import { generateId } from '@/lib/utils'

const quickQuestions = [
    "How can I lose weight?",
    "High protein foods",
    "Mental health diet tips",
    "Best breakfast for energy",
    "Foods for better sleep",
    "Low calorie snacks",
]

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 'welcome', content: "Hello! I'm your MindMeal AI assistant. How can I help you with your health and nutrition today? 🌿", sender: 'ai', timestamp: new Date().toISOString() }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async (content: string) => {
        if (!content.trim()) return
        const userMessage: ChatMessage = { id: generateId(), content, sender: 'user', timestamp: new Date().toISOString() }
        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)
        await new Promise(resolve => setTimeout(resolve, 1200))
        const aiResponse = getAIResponse(content)
        setIsTyping(false)
        setMessages(prev => [...prev, { id: generateId(), content: aiResponse, sender: 'ai', timestamp: new Date().toISOString() }])
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">AI Health Assistant</h1>
                        <p className="text-gray-600 text-sm">Ask me anything about nutrition and health</p>
                    </div>
                </div>
            </motion.div>

            <div className="mb-6 flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                    <button key={i} onClick={() => sendMessage(q)} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-mint-500">{q}</button>
                ))}
            </div>

            <Card className="h-[500px] flex flex-col">
                <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-start gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-mint-500' : 'bg-purple-500'}`}>
                                        {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-gradient-to-br from-mint-500 to-mint-600 text-white rounded-tr-md' : 'bg-gray-100 text-gray-900 rounded-tl-md'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                                    <div className="bg-gray-100 rounded-2xl px-4 py-3"><div className="typing-indicator flex gap-1"><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></div></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>
                <div className="p-4 border-t border-gray-100">
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(inputValue) }} className="flex gap-3">
                        <Input placeholder="Ask about nutrition..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1" />
                        <Button type="submit" disabled={!inputValue.trim() || isTyping}><Send className="w-5 h-5" /></Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
