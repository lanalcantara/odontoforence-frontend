import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Pencil } from "lucide-react"
import Link from "next/link"

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  // Em uma aplicação real, você buscaria os dados do laudo com base no ID
  const report = {
    id: "2",
    number: "LP-2023-002",
    title: "Laudo Final de Identificação Odontológica",
    case: "2023-002",
    caseTitle: "Identificação odontológica de vítima de acidente aéreo",
    date: "15/02/2023",
    type: "Final",
    author: "Carlos Silva",
    content: {
      introduction:
        "O presente laudo tem como objetivo apresentar os resultados da análise odontológica realizada para fins de identificação humana, referente ao caso #2023-002.",
      methodology:
        "Foram utilizados métodos de comparação odontológica, incluindo análise de radiografias panorâmicas, periapicais e fotografias intraorais. A metodologia seguiu os protocolos estabelecidos pela INTERPOL para identificação de vítimas de desastres.",
      analysis:
        "A análise comparativa entre os registros odontológicos ante-mortem e post-mortem revelou 12 pontos de concordância, incluindo tratamentos endodônticos nos dentes 21 e 45, coroas nos dentes 11 e 22, e restaurações em amálgama nos dentes 16, 26, 36 e 46. Foi observada uma discrepância no dente 32, que apresentava fratura post-mortem, explicável pelo trauma sofrido no acidente.\n\nA análise radiográfica confirmou a compatibilidade morfológica das estruturas dentárias e tratamentos realizados, com características individualizantes suficientes para estabelecer a identificação positiva.",
      conclusion:
        "Com base na análise comparativa realizada, conclui-se que os registros odontológicos post-mortem são compatíveis com os registros ante-mortem fornecidos, permitindo a identificação positiva da vítima com alto grau de certeza científica (compatibilidade de 95%).",
    },
    attachments: [
      { id: "1", name: "Radiografia panorâmica", type: "image", date: "03/02/2023" },
      { id: "2", name: "Fotografias intraorais", type: "image", date: "03/02/2023" },
      { id: "3", name: "Prontuário odontológico", type: "document", date: "04/02/2023" },
    ],
    history: [
      { date: "05/02/2023", user: "Carlos Silva", action: "Criação do laudo preliminar" },
      { date: "10/02/2023", user: "Marcos Oliveira", action: "Revisão do laudo" },
      { date: "12/02/2023", user: "Ana Pereira", action: "Adição de análise complementar" },
      { date: "15/02/2023", user: "Carlos Silva", action: "Finalização do laudo" },
    ],
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/reports">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{report.title}</h1>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/reports/${report.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" /> Editar
                </Link>
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" /> Exportar PDF
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
            <p className="text-muted-foreground">Laudo #{report.number}</p>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <p className="text-muted-foreground">{report.date}</p>
            <Badge className="w-fit" variant="outline">
              {report.type}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo do Laudo</CardTitle>
              <CardDescription>Laudo pericial completo</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold">LAUDO PERICIAL</h2>
                  <p className="text-muted-foreground">{report.number}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">1. INTRODUÇÃO</h3>
                  <p className="whitespace-pre-line">{report.content.introduction}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">2. METODOLOGIA</h3>
                  <p className="whitespace-pre-line">{report.content.methodology}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">3. ANÁLISE E RESULTADOS</h3>
                  <p className="whitespace-pre-line">{report.content.analysis}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">4. CONCLUSÃO</h3>
                  <p className="whitespace-pre-line">{report.content.conclusion}</p>
                </div>

                <div className="text-right pt-6 border-t">
                  <p>{report.date}</p>
                  <p className="font-medium">{report.author}</p>
                  <p className="text-sm text-muted-foreground">Perito Odonto-Legal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Caso</CardTitle>
              <CardDescription>Caso relacionado a este laudo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Número do Caso</h3>
                  <p>{report.case}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Descrição</h3>
                  <p>{report.caseTitle}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/cases/${report.case}`}>
                    <FileText className="mr-2 h-4 w-4" /> Ver Caso
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anexos</CardTitle>
              <CardDescription>Evidências anexadas ao laudo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
              <CardDescription>Histórico de alterações do laudo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l">
                {report.history.map((item, index) => (
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
        </div>
      </div>
    </div>
  )
}

