import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Plus } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laudos Periciais</h1>
          <p className="text-muted-foreground">Gerencie todos os laudos periciais do sistema</p>
        </div>
        <Button asChild>
          <Link href="/reports/new">
            <Plus className="mr-2 h-4 w-4" /> Relatório de evidências
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre a lista de laudos por número, tipo ou data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input placeholder="Número do laudo" />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Laudo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preliminary">Preliminar</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                  <SelectItem value="complementary">Complementar</SelectItem>
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
                <TableHead>Título</TableHead>
                <TableHead>Caso Relacionado</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.number}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.case}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <ReportTypeBadge type={report.type} />
                  </TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/reports/${report.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
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

function ReportTypeBadge({ type }: { type: string }) {
  const typeStyles = {
    Preliminar: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    Final: "bg-green-100 text-green-800 hover:bg-green-100/80",
    Complementar: "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
  }

  return (
    <Badge className={typeStyles[type] || ""} variant="outline">
      {type}
    </Badge>
  )
}

const reports = [
  {
    id: "1",
    number: "LP-2023-001",
    title: "Laudo Preliminar de Identificação Odontológica",
    case: "2023-002",
    date: "05/02/2023",
    type: "Preliminar",
    author: "Carlos Silva",
  },
  {
    id: "2",
    number: "LP-2023-002",
    title: "Laudo Final de Identificação Odontológica",
    case: "2023-002",
    date: "15/02/2023",
    type: "Final",
    author: "Carlos Silva",
  },
  {
    id: "3",
    number: "LP-2023-003",
    title: "Laudo de Análise de Marcas de Mordida",
    case: "2023-003",
    date: "20/03/2023",
    type: "Preliminar",
    author: "Marcos Oliveira",
  },
  {
    id: "4",
    number: "LP-2023-004",
    title: "Laudo Complementar de Análise de Marcas de Mordida",
    case: "2023-003",
    date: "05/04/2023",
    type: "Complementar",
    author: "Marcos Oliveira",
  },
  {
    id: "5",
    number: "LP-2023-005",
    title: "Laudo de Análise de DNA para Identificação",
    case: "2023-004",
    date: "12/04/2023",
    type: "Final",
    author: "Ana Pereira",
  },
]

