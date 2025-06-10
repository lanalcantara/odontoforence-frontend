"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch("https://odontoforense-backend-1.onrender.com/api/caso/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Erro na resposta da API")
        }

        const data = await response.json()
        setCases(data)
      } catch (error) {
        console.error("Erro ao buscar casos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos Periciais</h1>
          <p className="text-muted-foreground">
            Gerencie todos os casos periciais do sistema
          </p>
        </div>
        <Button asChild>
          <Link href="/cases/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Caso
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre a lista de casos por número, status ou data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="Número do caso" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="em andamento">Em Andamento</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="concluído">Concluído</SelectItem>
                <SelectItem value="arquivado">Arquivado</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" />
            <div className="flex gap-2">
              <Input type="date" />
              <Button>Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 text-center">Carregando casos...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data de Abertura</TableHead>
                  <TableHead>Perito Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Solicitado por</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases?.map((caseItem) => (
                  <TableRow key={caseItem._id}>
                    <TableCell className="font-medium">{caseItem.numeroDoCaso}</TableCell>
                    <TableCell>{caseItem.descricao}</TableCell>
                    <TableCell>
                      {new Date(caseItem.dataDeAbertura).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{caseItem.peritoResponsavel}</TableCell>
                    <TableCell>
                      <StatusBadge status={caseItem.status} />
                    </TableCell>
                    <TableCell>{caseItem.local}</TableCell>
                    <TableCell>{caseItem.solicitadoPor}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/cases/${caseItem._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/reports/new?case=${caseItem._id}`}>
                            <FileText className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusMap = {
    "em andamento": "Em Andamento",
    "pendente": "Pendente",
    "concluído": "Concluído",
    "arquivado": "Arquivado",
    "finalizado": "Concluído", 
  }

  const label = statusMap[status.toLowerCase()] || status

  const statusStyles = {
    "Em Andamento": "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    "Pendente": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
    "Concluído": "bg-green-100 text-green-800 hover:bg-green-100/80",
    "Arquivado": "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
  }

  return (
    <Badge className={statusStyles[label] || ""} variant="outline">
      {label}
    </Badge>
  )
}
