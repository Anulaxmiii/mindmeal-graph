import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, User } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'

export default function Signup() {
    const navigate = useNavigate()
    const { signup } = useAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const validatePassword = (pass: string): string[] => {
        const errors: string[] = []
        if (pass.length < 8) errors.push('At least 8 characters')
        if (!/[A-Z]/.test(pass)) errors.push('One uppercase letter')
        if (!/[a-z]/.test(pass)) errors.push('One lowercase letter')
        if (!/[0-9]/.test(pass)) errors.push('One number')
        return errors
    }

    const passwordErrors = validatePassword(password)
    const isPasswordValid = passwordErrors.length === 0

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!isPasswordValid) {
            setError('Please meet all password requirements.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsLoading(true)

        try {
            const success = await signup(name, email, password)
            if (success) {
                navigate('/onboarding')
            } else {
                setError('Failed to create account. Please try again.')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-teal-50 flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-mint-600 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint-500 to-teal-500 flex items-center justify-center">
                            <Leaf className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">MindMeal</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-mint-600 font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                icon={<User className="w-5 h-5" />}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail className="w-5 h-5" />}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    icon={<Lock className="w-5 h-5" />}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Requirements */}
                            {password && (
                                <div className="mt-2 space-y-1">
                                    {['At least 8 characters', 'One uppercase letter', 'One lowercase letter', 'One number'].map((req, index) => {
                                        const passed = !passwordErrors.includes(req)
                                        return (
                                            <div key={index} className={`text-xs flex items-center gap-1 ${passed ? 'text-green-600' : 'text-gray-400'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${passed ? 'bg-green-500' : 'bg-gray-300'}`} />
                                                {req}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                icon={<Lock className="w-5 h-5" />}
                                required
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-red-500">Passwords do not match</p>
                            )}
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-mint-500 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
                    <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8">
                        <Leaf className="w-14 h-14 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-center">Join MindMeal</h1>
                    <p className="text-xl text-white/80 text-center max-w-md">
                        Start your personalized health journey with AI-powered nutrition recommendations.
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold">10k+</div>
                            <div className="text-white/70">Happy Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold">50+</div>
                            <div className="text-white/70">Indian Foods</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
