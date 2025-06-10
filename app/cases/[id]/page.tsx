import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Upload, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CaseDetailsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the case data based on the ID
  const caseData = {
    id: "2",
    number: "2023-002",
    description: "Identificação odontológica de vítima de acidente aéreo",
    date: "03/02/2023",
    expert: "Carlos Silva",
    status: "Em Andamento",
    location: "Aeroporto Internacional, Terminal 2",
    requestedBy: "Delegacia de Polícia Civil - 3ª DP",
    details:
      "Caso de identificação odontológica de vítima fatal em acidente aéreo ocorrido em 01/02/2023. Necessária comparação com registros ante-mortem fornecidos pelo dentista da vítima.",
    evidences: [
      {
        id: "1",
        type: "image",
        name: "Radiografia panorâmica",
        category: "Odontológica",
        date: "03/02/2023",
        description: "Radiografia panorâmica post-mortem",
      },
      {
        id: "2",
        type: "image",
        name: "Fotografias intraorais",
        category: "Odontológica",
        date: "03/02/2023",
        description: "Conjunto de fotografias intraorais post-mortem",
      },
      {
        id: "3",
        type: "document",
        name: "Prontuário odontológico",
        category: "Documentos",
        date: "04/02/2023",
        description: "Prontuário odontológico ante-mortem fornecido pelo dentista",
      },
      {
        id: "4",
        type: "image",
        name: "Radiografias periapicais",
        category: "Odontológica",
        date: "04/02/2023",
        description: "Radiografias periapicais ante-mortem",
      },
    ],
    history: [
      { date: "03/02/2023 08:30", user: "Carlos Silva", action: "Caso criado" },
      { date: "03/02/2023 10:15", user: "Carlos Silva", action: "Adicionadas evidências post-mortem" },
      { date: "04/02/2023 14:22", user: "Ana Pereira", action: "Adicionadas evidências ante-mortem" },
      { date: "05/02/2023 09:45", user: "Carlos Silva", action: "Iniciada análise comparativa" },
      { date: "06/02/2023 16:30", user: "Marcos Oliveira", action: "Revisão de evidências" },
    ],
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/cases">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Caso #{caseData.number}</h1>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/evidence/upload?case=${caseData.id}`}>
                  <Upload className="mr-2 h-4 w-4" /> Adicionar Evidência
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/reports/new?case=${caseData.id}`}>
                  <FileText className="mr-2 h-4 w-4" /> Gerar Laudo
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">{caseData.date}</p>
            <Badge className="ml-2" variant="outline">
              {caseData.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="evidence">Evidências</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Caso</CardTitle>
                  <CardDescription>Detalhes completos do caso pericial</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Número do Caso</h3>
                      <p>{caseData.number}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Data de Abertura</h3>
                      <p>{caseData.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Perito Responsável</h3>
                      <p>{caseData.expert}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                      <p>{caseData.status}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Local</h3>
                      <p>{caseData.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Solicitado por</h3>
                      <p>{caseData.requestedBy}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h3>
                    <p>{caseData.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Detalhes</h3>
                    <p className="whitespace-pre-line">{caseData.details}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evidence">
              <Card>
                <CardHeader>
                  <CardTitle>Evidências</CardTitle>
                  <CardDescription>Todas as evidências relacionadas ao caso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseData.evidences.map((evidence) => (
                      <Card key={evidence.id} className="overflow-hidden">
                        <div className="aspect-video relative bg-muted">
                          {evidence.type === "image" ? (
                            <Image
                              src={`/placeholder.svg?height=200&width=400`}
                              alt={evidence.name}
                              width={400}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <FileText className="h-16 w-16 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{evidence.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline">{evidence.category}</Badge>
                            <span className="text-xs text-muted-foreground">{evidence.date}</span>
                          </div>
                          <p className="text-sm mt-2">{evidence.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Atividades</CardTitle>
                  <CardDescription>Registro de todas as atividades relacionadas ao caso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l">
                    {caseData.history.map((item, index) => (
                      <div key={index} className="mb-6 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                        <div className="font-medium">{item.action}</div>
                        <div className="text-sm">por {item.user}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Laudos Relacionados</CardTitle>
              <CardDescription>Laudos periciais deste caso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Laudo Preliminar</h3>
                      <p className="text-sm text-muted-foreground">05/02/2023</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/reports/1">
                        <Eye className="h-4 w-4 mr-1" /> Ver
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link href={`/reports/new?case=${caseData.id}`}>
                      <FileText className="mr-2 h-4 w-4" /> Gerar Relatório de evidências
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Equipe do Caso</CardTitle>
              <CardDescription>Profissionais envolvidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">CS</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Carlos Silva</h3>
                    <p className="text-sm text-muted-foreground">Perito Responsável</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">AP</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Ana Pereira</h3>
                    <p className="text-sm text-muted-foreground">Perito Auxiliar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">MO</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Marcos Oliveira</h3>
                    <p className="text-sm text-muted-foreground">Revisor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

