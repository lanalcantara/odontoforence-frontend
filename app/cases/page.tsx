import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function CasesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos Periciais</h1>
          <p className="text-muted-foreground">Gerencie todos os casos periciais do sistema</p>
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
          <CardDescription>Filtre a lista de casos por número, status ou data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input placeholder="Número do caso" />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Em Andamento</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="archived">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input type="date" placeholder="Data inicial" />
            </div>
            <div className="flex gap-2">
              <Input type="date" placeholder="Data final" />
              <Button>Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Perito Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.number}</TableCell>
                  <TableCell>{caseItem.description}</TableCell>
                  <TableCell>{caseItem.date}</TableCell>
                  <TableCell>{caseItem.expert}</TableCell>
                  <TableCell>
                    <StatusBadge status={caseItem.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/cases/${caseItem.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/reports/new?case=${caseItem.id}`}>
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    "Em Andamento": "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    Pendente: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
    Concluído: "bg-green-100 text-green-800 hover:bg-green-100/80",
    Arquivado: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
  }

  return (
    <Badge className={statusStyles[status] || ""} variant="outline">
      {status}
    </Badge>
  )
}

const cases = [
  {
    id: "1",
    number: "2023-001",
    description: "Análise de restos mortais encontrados em área rural",
    date: "15/01/2023",
    expert: "Ana Pereira",
    status: "Concluído",
  },
  {
    id: "2",
    number: "2023-002",
    description: "Identificação odontológica de vítima de acidente aéreo",
    date: "03/02/2023",
    expert: "Carlos Silva",
    status: "Em Andamento",
  },
  {
    id: "3",
    number: "2023-003",
    description: "Análise de marcas de mordida em caso de agressão",
    date: "17/03/2023",
    expert: "Marcos Oliveira",
    status: "Pendente",
  },
  {
    id: "4",
    number: "2023-004",
    description: "Exame de DNA para identificação de parentesco",
    date: "05/04/2023",
    expert: "Ana Pereira",
    status: "Em Andamento",
  },
  {
    id: "5",
    number: "2023-005",
    description: "Análise de restos ósseos encontrados em escavação arqueológica",
    date: "22/05/2023",
    expert: "Marcos Oliveira",
    status: "Arquivado",
  },
]

