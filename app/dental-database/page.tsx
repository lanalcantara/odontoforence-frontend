"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function DentalDatabasePage() {
  // Usando useState para garantir consistência entre servidor e cliente
  const [activeTab, setActiveTab] = useState("search")

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banco de Dados Odonto-Legal</h1>
          <p className="text-muted-foreground">Base de dados para identificação odontológica</p>
        </div>
        <Button asChild>
          <Link href="/dental-database/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Registro
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="search">Busca</TabsTrigger>
          <TabsTrigger value="compare">Comparação</TabsTrigger>
          <TabsTrigger value="records">Registros</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Busca Odontológica</CardTitle>
              <CardDescription>Busque registros odontológicos por características específicas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Dentição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanente</SelectItem>
                      <SelectItem value="deciduous">Decídua</SelectItem>
                      <SelectItem value="mixed">Mista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Características Específicas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="missing">Dentes Ausentes</SelectItem>
                      <SelectItem value="implants">Implantes</SelectItem>
                      <SelectItem value="bridges">Pontes</SelectItem>
                      <SelectItem value="crowns">Coroas</SelectItem>
                      <SelectItem value="fillings">Restaurações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Região" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anterior">Anterior</SelectItem>
                      <SelectItem value="posterior">Posterior</SelectItem>
                      <SelectItem value="maxilla">Maxila</SelectItem>
                      <SelectItem value="mandible">Mandíbula</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button>
                  <Search className="mr-2 h-4 w-4" /> Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultados da Busca</CardTitle>
              <CardDescription>3 registros encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((id) => (
                  <Card key={id} className="overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      <div className="w-full h-full">
                        <Image
                          src="/placeholder.svg"
                          alt="Registro odontológico"
                          width={400}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">Registro #{id}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline">Permanente</Badge>
                        <span className="text-xs text-muted-foreground">12/01/2023</span>
                      </div>
                      <p className="text-sm mt-2">
                        Ausência de terceiros molares, restauração em amálgama no dente 36.
                      </p>
                      <div className="mt-4">
                        <Button size="sm" className="w-full" asChild>
                          <Link href={`/dental-database/${id}`}>
                            <Eye className="mr-2 h-4 w-4" /> Visualizar
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compare">
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Registros</CardTitle>
              <CardDescription>Compare dois registros odontológicos para identificação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Registro Ante-Mortem</h3>
                  <div className="flex gap-2">
                    <Input placeholder="ID do registro" />
                    <Button variant="outline">Buscar</Button>
                  </div>
                  <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
                    <div className="w-full h-full">
                      <Image
                        src="/placeholder.svg"
                        alt="Registro ante-mortem"
                        width={600}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Características</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Dentição permanente completa</li>
                      <li>• Restaurações em amálgama nos dentes 16, 26, 36 e 46</li>
                      <li>• Tratamento endodôntico no dente 21</li>
                      <li>• Coroa no dente 11</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Registro Post-Mortem</h3>
                  <div className="flex gap-2">
                    <Input placeholder="ID do registro" />
                    <Button variant="outline">Buscar</Button>
                  </div>
                  <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
                    <div className="w-full h-full">
                      <Image
                        src="/placeholder.svg"
                        alt="Registro post-mortem"
                        width={600}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Características</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Dentição permanente completa</li>
                      <li>• Restaurações em amálgama nos dentes 16, 26, 36 e 46</li>
                      <li>• Tratamento endodôntico no dente 21</li>
                      <li>• Coroa no dente 11</li>
                      <li>• Fratura post-mortem no dente 32</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-md">
                <h3 className="font-medium mb-2">Resultado da Comparação</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80" variant="outline">
                    Compatibilidade Alta (95%)
                  </Badge>
                  <p className="text-sm">12 pontos de concordância, 1 discrepância explicável</p>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button>Gerar Relatório de Comparação</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Registros Odontológicos</CardTitle>
              <CardDescription>Todos os registros disponíveis no banco de dados</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data de Registro</TableHead>
                    <TableHead>Características</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dentalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.features}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.status === "Identificado"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                          variant="outline"
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dental-database/${record.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const dentalRecords = [
  {
    id: "DB-2023-001",
    type: "Ante-Mortem",
    date: "10/01/2023",
    features: "Dentição permanente, restaurações em amálgama",
    status: "Identificado",
  },
  {
    id: "DB-2023-002",
    type: "Post-Mortem",
    date: "15/01/2023",
    features: "Dentição permanente, tratamento endodôntico",
    status: "Identificado",
  },
  {
    id: "DB-2023-003",
    type: "Ante-Mortem",
    date: "22/01/2023",
    features: "Dentição mista, ausência de terceiros molares",
    status: "Não Identificado",
  },
  {
    id: "DB-2023-004",
    type: "Post-Mortem",
    date: "05/02/2023",
    features: "Dentição permanente, implante no dente 46",
    status: "Não Identificado",
  },
  {
    id: "DB-2023-005",
    type: "Ante-Mortem",
    date: "18/02/2023",
    features: "Dentição permanente, prótese parcial removível",
    status: "Não Identificado",
  },
]

