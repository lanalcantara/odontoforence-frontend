import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, FileText, FolderOpen, Shield, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">OdontoForense</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Plataforma completa para gerenciamento de casos periciais, evidências e laudos técnicos
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/cases">
              Acessar Casos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
            <Link href="/dental-database">Banco Odonto-Legal</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Gestão de Usuários</CardTitle>
            <CardDescription>Gerencie usuários e permissões do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cadastre, edite e gerencie usuários com diferentes níveis de acesso ao sistema.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/users">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <FolderOpen className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Casos Periciais</CardTitle>
            <CardDescription>Gerencie todos os casos periciais</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Cadastre, acompanhe e gerencie casos periciais com todas as suas evidências.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/cases">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Laudos Periciais</CardTitle>
            <CardDescription>Gere e gerencie laudos técnicos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Crie, edite e exporte laudos periciais completos em formato PDF.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/reports">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Banco Odonto-Legal</CardTitle>
            <CardDescription>Base de dados odontológica</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Acesse e compare registros dentários para identificação forense.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/dental-database">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

