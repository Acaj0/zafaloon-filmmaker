'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    console.error("Authentication error occurred:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">Erro de Autenticação</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            {error === 'CredentialsSignin'
              ? 'Credenciais inválidas. Por favor, verifique seu nome de usuário e senha.'
              : 'Ocorreu um erro durante a autenticação. Por favor, tente novamente.'}
          </p>
          <Button onClick={() => router.push('/login')}>Voltar para o Login</Button>
        </CardContent>
      </Card>
    </div>
  )
}

