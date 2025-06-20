"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MessageCircle,
  Send,
  Bot,
  User,
  Activity,
  Shield,
  Brain,
  Pill,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sparkles,
  MapPin,
  Phone,
  Star,
  Zap,
  Target,
  Award,
  Microscope,
  Thermometer,
  Eye,
  Bone,
  Dna,
  HeartPulse,
  Siren,
  UserCheck,
  FileText,
} from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?:
    | "health-tip"
    | "symptom-analysis"
    | "general"
    | "emergency"
    | "medication"
    | "doctor-referral"
    | "treatment-plan"
  severity?: "low" | "medium" | "high" | "critical"
  medications?: Medication[]
  doctors?: Doctor[]
  treatments?: Treatment[]
}

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  sideEffects: string[]
  precautions: string[]
  cost: string
}

interface Doctor {
  name: string
  specialty: string
  rating: number
  experience: string
  location: string
  phone: string
  availability: string
  consultationFee: string
}

interface Treatment {
  name: string
  description: string
  duration: string
  effectiveness: number
  cost: string
  requirements: string[]
}

interface HealthMetrics {
  totalInteractions: number
  accuracy: number
  responseTime: number
  userSatisfaction: number
  successRate: number
  patientsHelped: number
}

export default function AdvancedFellSyncHealthPlatform() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "🏥 Welcome to FellSync Advanced Health Platform! I'm your AI Medical Assistant powered by cutting-edge healthcare AI. I can provide comprehensive medical analysis, medication recommendations, doctor referrals, and complete treatment plans. How can I help optimize your health today?",
      role: "assistant",
      timestamp: new Date(),
      type: "general",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentAnalysis, setCurrentAnalysis] = useState("")
  const [metrics, setMetrics] = useState<HealthMetrics>({
    totalInteractions: 15847,
    accuracy: 97.8,
    responseTime: 0.6,
    userSatisfaction: 4.9,
    successRate: 94.5,
    patientsHelped: 12456,
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const advancedQuickActions = [
    {
      label: "AI Symptom Analysis",
      icon: <Microscope className="w-5 h-5" />,
      query: "I need comprehensive symptom analysis",
      gradient: "from-purple-500 via-pink-500 to-red-500",
    },
    {
      label: "Medication Finder",
      icon: <Pill className="w-5 h-5" />,
      query: "Find the best medications for my condition",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
    },
    {
      label: "Doctor Referral",
      icon: <UserCheck className="w-5 h-5" />,
      query: "I need to find the best specialist doctors",
      gradient: "from-green-500 via-blue-500 to-purple-500",
    },
    {
      label: "Treatment Plans",
      icon: <FileText className="w-5 h-5" />,
      query: "Create a comprehensive treatment plan",
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
    {
      label: "Emergency Care",
      icon: <Siren className="w-5 h-5" />,
      query: "This is a medical emergency",
      gradient: "from-red-500 via-pink-500 to-purple-500",
    },
    {
      label: "Wellness Optimization",
      icon: <Target className="w-5 h-5" />,
      query: "Optimize my overall health and wellness",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
  ]

  const specialtyAreas = [
    { name: "Cardiology", icon: <HeartPulse className="w-5 h-5" />, patients: 2847, color: "text-red-400" },
    { name: "Neurology", icon: <Brain className="w-5 h-5" />, patients: 1923, color: "text-purple-400" },
    { name: "Orthopedics", icon: <Bone className="w-5 h-5" />, patients: 3156, color: "text-blue-400" },
    { name: "Dermatology", icon: <Eye className="w-5 h-5" />, patients: 1654, color: "text-green-400" },
    { name: "Gastroenterology", icon: <Thermometer className="w-5 h-5" />, patients: 2341, color: "text-yellow-400" },
    { name: "Genetics", icon: <Dna className="w-5 h-5" />, patients: 987, color: "text-pink-400" },
  ]

  const simulateAnalysis = async () => {
    const steps = [
      "🔍 Analyzing symptoms...",
      "🧠 Cross-referencing medical database...",
      "💊 Evaluating treatment options...",
      "👨‍⚕️ Finding specialist doctors...",
      "⚗️ Calculating medication dosages...",
      "📋 Generating treatment plan...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setCurrentAnalysis(steps[i])
      setAnalysisProgress((i + 1) * (100 / steps.length))
      await new Promise((resolve) => setTimeout(resolve, 400))
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setAnalysisProgress(0)

    await simulateAnalysis()

    try {
      const response = await fetch("/api/advanced-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
        type: data.type,
        severity: data.severity,
        medications: data.medications,
        doctors: data.doctors,
        treatments: data.treatments,
      }

      setMessages((prev) => [...prev, assistantMessage])

      setMetrics((prev) => ({
        ...prev,
        totalInteractions: prev.totalInteractions + 1,
        responseTime: Math.random() * 0.8 + 0.3,
        patientsHelped: prev.patientsHelped + (Math.random() > 0.7 ? 1 : 0),
      }))
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "🚨 System temporarily unavailable. For immediate medical emergencies, please call 911 or visit your nearest emergency room.",
        role: "assistant",
        timestamp: new Date(),
        type: "emergency",
        severity: "critical",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setCurrentAnalysis("")
      setAnalysisProgress(0)
    }
  }

  const handleQuickAction = (query: string) => {
    setInput(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getMessageIcon = (type: Message["type"]) => {
    switch (type) {
      case "emergency":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case "symptom-analysis":
        return <Microscope className="w-5 h-5 text-purple-400" />
      case "medication":
        return <Pill className="w-5 h-5 text-blue-400" />
      case "doctor-referral":
        return <UserCheck className="w-5 h-5 text-green-400" />
      case "treatment-plan":
        return <FileText className="w-5 h-5 text-orange-400" />
      case "health-tip":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />
      default:
        return <MessageCircle className="w-5 h-5 text-purple-400" />
    }
  }

  const getSeverityColor = (severity?: Message["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-400/40 backdrop-blur-sm"
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-400/40 backdrop-blur-sm"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/40 backdrop-blur-sm"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-400/40 backdrop-blur-sm"
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-400/40 backdrop-blur-sm"
    }
  }

  const renderMedications = (medications?: Medication[]) => {
    if (!medications || medications.length === 0) return null

    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50 rounded-2xl border border-purple-400/30 backdrop-blur-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl"></div>
        <h4 className="relative font-bold text-purple-200 mb-4 flex items-center break-words text-lg">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mr-3 shadow-lg">
            <Pill className="w-6 h-6 text-white" />
          </div>
          Recommended Medications
        </h4>
        {medications.map((med, index) => (
          <div
            key={index}
            className="relative mb-4 p-5 bg-gradient-to-r from-gray-800/60 via-gray-900/60 to-gray-800/60 rounded-xl border border-purple-400/20 backdrop-blur-sm break-words transform hover:scale-[1.01] transition-all duration-300 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-xl"></div>
            <div className="relative flex items-center justify-between mb-3 flex-wrap gap-2">
              <h5 className="font-semibold text-white break-words text-lg bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                {med.name}
              </h5>
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex-shrink-0 text-sm px-4 py-2 shadow-lg">
                {med.cost}
              </Badge>
            </div>
            <div className="relative text-base text-gray-100 space-y-2 break-words">
              <p>
                <strong className="text-purple-300">Dosage:</strong> <span className="text-white">{med.dosage}</span>
              </p>
              <p>
                <strong className="text-purple-300">Frequency:</strong>{" "}
                <span className="text-white">{med.frequency}</span>
              </p>
              <p>
                <strong className="text-purple-300">Duration:</strong>{" "}
                <span className="text-white">{med.duration}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderDoctors = (doctors?: Doctor[]) => {
    if (!doctors || doctors.length === 0) return null

    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50 rounded-2xl border border-indigo-400/30 backdrop-blur-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 rounded-2xl"></div>
        <h4 className="relative font-bold text-indigo-200 mb-4 flex items-center break-words text-lg">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl mr-3 shadow-lg">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          Recommended Specialists
        </h4>
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="relative mb-4 p-5 bg-gradient-to-r from-gray-800/60 via-gray-900/60 to-gray-800/60 rounded-xl border border-indigo-400/20 backdrop-blur-sm break-words transform hover:scale-[1.01] transition-all duration-300 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-pink-500/5 rounded-xl"></div>
            <div className="relative flex items-center justify-between mb-3 flex-wrap gap-2">
              <h5 className="font-semibold text-white break-words text-lg bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
                Dr. {doctor.name}
              </h5>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="flex items-center bg-yellow-500/20 rounded-lg px-2 py-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-base text-yellow-300 ml-2 font-semibold">{doctor.rating}</span>
                </div>
                <Badge className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-sm px-4 py-2 shadow-lg">
                  {doctor.consultationFee}
                </Badge>
              </div>
            </div>
            <div className="relative text-base text-gray-100 space-y-2 break-words">
              <p>
                <strong className="text-indigo-300">Specialty:</strong>{" "}
                <span className="text-white">{doctor.specialty}</span>
              </p>
              <p>
                <strong className="text-indigo-300">Experience:</strong>{" "}
                <span className="text-white">{doctor.experience}</span>
              </p>
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-indigo-300" />
                <span className="break-words text-white">{doctor.location}</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-indigo-300" />
                <span className="text-white">{doctor.phone}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderTreatments = (treatments?: Treatment[]) => {
    if (!treatments || treatments.length === 0) return null

    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-blue-900/50 via-teal-900/50 to-green-900/50 rounded-2xl border border-blue-400/30 backdrop-blur-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 rounded-2xl"></div>
        <h4 className="relative font-bold text-blue-200 mb-4 flex items-center break-words text-lg">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl mr-3 shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          Treatment Plan
        </h4>
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="relative mb-4 p-5 bg-gradient-to-r from-gray-800/60 via-gray-900/60 to-gray-800/60 rounded-xl border border-blue-400/20 backdrop-blur-sm break-words transform hover:scale-[1.01] transition-all duration-300 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-green-500/5 rounded-xl"></div>
            <div className="relative flex items-center justify-between mb-3 flex-wrap gap-2">
              <h5 className="font-semibold text-white break-words text-lg bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                {treatment.name}
              </h5>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="flex items-center bg-green-500/20 rounded-lg px-2 py-1">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-base text-green-300 ml-2 font-semibold">
                    {treatment.effectiveness}% effective
                  </span>
                </div>
                <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm px-4 py-2 shadow-lg">
                  {treatment.cost}
                </Badge>
              </div>
            </div>
            <p className="relative text-base text-white mb-3 break-words">{treatment.description}</p>
            <div className="relative text-base text-gray-100 break-words">
              <p>
                <strong className="text-blue-300">Duration:</strong>{" "}
                <span className="text-white">{treatment.duration}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-purple-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-blue-400/30 rotate-12 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full animate-float"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Glassmorphism Header */}
      <div className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <Heart className="w-8 h-8 text-white animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white animate-ping"></div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                  FellSync Advanced
                </h1>
                <p className="text-lg text-purple-200 font-medium">Next-Gen AI Medical Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/40 backdrop-blur-sm px-4 py-2 shadow-lg">
                <Activity className="w-4 h-4 mr-2 animate-pulse" />
                Live AI
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-400/40 backdrop-blur-sm px-4 py-2 shadow-lg">
                <Shield className="w-4 h-4 mr-2" />
                HIPAA Secure
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/40 backdrop-blur-sm px-4 py-2 shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                Advanced AI
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-400/40 backdrop-blur-sm px-4 py-2 shadow-lg">
                <Award className="w-4 h-4 mr-2" />
                Premium
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 3D Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Performance Metrics */}
            <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-lg"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mr-3 shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  AI Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="space-y-3">
                  {[
                    { label: "Total Cases", value: metrics.totalInteractions.toLocaleString(), color: "text-blue-400" },
                    { label: "AI Accuracy", value: `${metrics.accuracy}%`, color: "text-green-400" },
                    { label: "Response Time", value: `${metrics.responseTime.toFixed(1)}s`, color: "text-purple-400" },
                    { label: "Success Rate", value: `${metrics.successRate}%`, color: "text-yellow-400" },
                    {
                      label: "Patients Helped",
                      value: metrics.patientsHelped.toLocaleString(),
                      color: "text-pink-400",
                    },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="text-sm text-gray-300">{metric.label}</span>
                      <span className={`font-bold text-sm ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialty Areas */}
            <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-indigo-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 rounded-lg"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mr-3 shadow-lg">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  Medical Specialties
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-3">
                {specialtyAreas.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${specialty.color} transform hover:scale-110 transition-all duration-300`}>
                        {specialty.icon}
                      </div>
                      <span className="text-sm text-gray-200 font-medium">{specialty.name}</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 text-xs px-2 py-1">
                      {specialty.patients}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-pink-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 rounded-lg"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl mr-3 shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-3">
                {advancedQuickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto p-4 bg-gradient-to-r ${action.gradient} bg-opacity-10 border-white/20 hover:bg-opacity-20 text-white transition-all duration-500 hover:scale-105 hover:shadow-lg text-sm font-medium`}
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="transform hover:scale-110 transition-all duration-300">{action.icon}</div>
                      <span>{action.label}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 3D Chat Interface */}
          <div className="lg:col-span-4">
            <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl h-[950px] flex flex-col transform hover:shadow-purple-500/25 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-lg"></div>

              <CardHeader className="relative border-b border-white/10 bg-gradient-to-r from-purple-800/20 via-indigo-800/20 to-blue-800/20 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                        <Bot className="w-8 h-8 text-white" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                        Advanced Medical AI
                      </CardTitle>
                      <p className="text-base text-purple-200 font-medium">
                        Powered by Next-Gen Healthcare Intelligence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/40 backdrop-blur-sm px-3 py-2">
                      <Clock className="w-4 h-4 mr-2" />
                      24/7 Available
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/40 backdrop-blur-sm px-3 py-2">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Powered
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-8" ref={scrollAreaRef}>
                  <div className="space-y-8">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-4 ${
                          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                              : "bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-7 h-7 text-white" />
                          ) : (
                            <Bot className="w-7 h-7 text-white" />
                          )}
                        </div>
                        <div className={`flex-1 max-w-5xl ${message.role === "user" ? "text-right" : "text-left"}`}>
                          <div
                            className={`inline-block p-6 rounded-2xl shadow-2xl max-w-full break-words transform hover:scale-[1.02] transition-all duration-300 ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                : "bg-white/10 backdrop-blur-2xl text-white border border-white/20"
                            }`}
                          >
                            <div className="text-base leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                              {message.content}
                            </div>
                            {renderMedications(message.medications)}
                            {renderDoctors(message.doctors)}
                            {renderTreatments(message.treatments)}
                          </div>
                          <div
                            className={`flex items-center mt-3 space-x-3 text-sm text-purple-300 ${
                              message.role === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            {message.role === "assistant" && message.type && (
                              <>
                                <div className="transform hover:scale-110 transition-all duration-300">
                                  {getMessageIcon(message.type)}
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-white/10 border-white/20 text-purple-200 backdrop-blur-sm"
                                >
                                  {message.type.replace("-", " ")}
                                </Badge>
                                {message.severity && (
                                  <Badge variant="outline" className={`text-xs ${getSeverityColor(message.severity)}`}>
                                    {message.severity}
                                  </Badge>
                                )}
                              </>
                            )}
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 shadow-2xl animate-pulse">
                          <Bot className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="inline-block p-6 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <div className="flex space-x-2">
                                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
                                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-bounce delay-100"></div>
                                  <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce delay-200"></div>
                                </div>
                                <span className="text-base text-purple-200 font-medium">Advanced AI Analysis...</span>
                              </div>
                              {currentAnalysis && (
                                <div className="space-y-3">
                                  <p className="text-sm text-purple-300 font-medium">{currentAnalysis}</p>
                                  <Progress
                                    value={analysisProgress}
                                    className="h-3 bg-white/10 rounded-full overflow-hidden"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <Separator className="bg-white/10" />

                <div className="relative p-8 bg-white/5 backdrop-blur-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
                  <div className="relative flex items-end space-x-4">
                    <div className="flex-1">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe your symptoms, ask for medications, find doctors, or request treatment plans..."
                        className="min-h-[70px] text-lg bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400 backdrop-blur-xl rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-12 py-5 text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-110 rounded-2xl transform"
                    >
                      <Send className="w-6 h-6" />
                    </Button>
                  </div>
                  <div className="relative flex items-center justify-between mt-4">
                    <p className="text-sm text-purple-300 font-medium">
                      🔒 End-to-end encrypted • HIPAA compliant • AI-powered medical assistance
                    </p>
                    <p className="text-sm text-purple-300 font-medium">⚠️ For emergencies, call 911 immediately</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-tilt { animation: tilt 10s infinite linear; }
      `}</style>
    </div>
  )
}
