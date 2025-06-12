"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Home, FileText, Search, Award, Database, Users, LogOut, Shield, Microscope } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("https://odontoforense-backend-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login")
      }

      // Salvar o token no localStorage
      localStorage.setItem("token", data.token)

      // Redirecionar para a página principal
      router.push("/cases")
    } catch (error) {
      console.error("Erro de login:", error)
      setError(error instanceof Error ? error.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Microscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">OdontoForense</h1>
              <p className="text-xs text-gray-500 font-medium">Sistema Pericial</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-medium">Início</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Casos Periciais</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
            <span className="font-medium">Evidências</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Award className="w-5 h-5" />
            <span className="font-medium">Laudos</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Database className="w-5 h-5" />
            <span className="font-medium">Banco OdontoForense</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Usuários</span>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold text-sm">
              CS
            </div>
            <div className="flex-1">
              <p className="font-medium text-black text-sm">Carlos Silva</p>
              <p className="text-xs text-gray-500">Perito</p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sair</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-black rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-black rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-16 h-16 border border-black rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-black rounded-full"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Bem-vindo de volta</h1>
            <p className="text-gray-600">Acesse o sistema OdontoForense com suas credenciais</p>
          </div>

          {/* Login Card */}
          <Card className="border-2 border-gray-100 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-black">Login</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{error}</div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-black transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-black">
                      Senha
                    </Label>
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-black transition-colors font-medium"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-black transition-colors pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-base transition-all duration-200 transform hover:scale-[1.02]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar no Sistema"}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">Sistema seguro e certificado para perícia odontológica</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>© 2024 OdontoForense - Sistema de Perícia Odontológica</p>
            <p className="mt-1">Desenvolvido com segurança e precisão</p>
          </div>
        </div>
      </div>
    </div>
  )
}
