"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Image, Save } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NewReportPage() {
  const [reportContent, setReportContent] = useState("")

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/cases/2">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Novo Laudo Pericial</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" /> Salvar Rascunho
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Gerar PDF
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Caso #2023-002 - Identificação odontológica de vítima de acidente aéreo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Laudo</CardTitle>
            <CardDescription>Preencha as informações básicas do laudo pericial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Laudo</Label>
                <Input id="title" placeholder="Ex: Laudo de Identificação Odontológica" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-number">Número do Laudo</Label>
                <Input id="report-number" placeholder="Ex: LP-2023-002-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data de Emissão</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Laudo</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preliminary">Preliminar</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="complementary">Complementar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo do Laudo</CardTitle>
            <CardDescription>Elabore o conteúdo completo do laudo pericial</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
                <TabsTrigger value="attachments">Anexos</TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="introduction">Introdução</Label>
                  <Textarea id="introduction" placeholder="Descreva o objetivo e escopo do laudo pericial" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="methodology">Metodologia</Label>
                  <Textarea
                    id="methodology"
                    placeholder="Descreva os métodos e técnicas utilizados na análise"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analysis">Análise e Resultados</Label>
                  <Textarea
                    id="analysis"
                    placeholder="Apresente a análise detalhada e os resultados obtidos"
                    rows={6}
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conclusion">Conclusão</Label>
                  <Textarea
                    id="conclusion"
                    placeholder="Apresente as conclusões baseadas na análise realizada"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="text-center border-b pb-4">
                        <h2 className="text-2xl font-bold">LAUDO PERICIAL</h2>
                        <p className="text-muted-foreground">LP-2023-002-01</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">1. INTRODUÇÃO</h3>
                        <p className="whitespace-pre-line">
                          {/* Conteúdo da introdução */}O presente laudo tem como objetivo apresentar os resultados da
                          análise odontológica realizada para fins de identificação humana, referente ao caso #2023-002.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">2. METODOLOGIA</h3>
                        <p className="whitespace-pre-line">
                          {/* Conteúdo da metodologia */}
                          Foram utilizados métodos de comparação odontológica, incluindo análise de radiografias
                          panorâmicas, periapicais e fotografias intraorais. A metodologia seguiu os protocolos
                          estabelecidos pela INTERPOL para identificação de vítimas de desastres.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">3. ANÁLISE E RESULTADOS</h3>
                        <p className="whitespace-pre-line">
                          {reportContent || "Nenhum conteúdo de análise foi adicionado ainda."}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">4. CONCLUSÃO</h3>
                        <p className="whitespace-pre-line">
                          {/* Conteúdo da conclusão */}
                          Pendente de preenchimento.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attachments">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Image className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Radiografia panorâmica</p>
                        <p className="text-sm text-muted-foreground">03/02/2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Image className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Fotografias intraorais</p>
                        <p className="text-sm text-muted-foreground">03/02/2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                  </div>

                  <Button className="w-full">
                    <Image className="mr-2 h-4 w-4" /> Adicionar Anexo
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Salvar Rascunho</Button>
            <Button>Finalizar Laudo</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

