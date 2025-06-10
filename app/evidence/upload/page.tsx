"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function EvidenceUploadPage() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/cases/2">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Adicionar Evidência</h1>
          <p className="text-muted-foreground">
            Caso #2023-002 - Identificação odontológica de vítima de acidente aéreo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload de Arquivos</CardTitle>
            <CardDescription>
              Faça upload de imagens, documentos ou outros arquivos relacionados ao caso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste e solte arquivos aqui ou clique para selecionar
              </p>
              <Input type="file" multiple className="hidden" id="file-upload" onChange={handleFileChange} />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" type="button">
                  Selecionar Arquivos
                </Button>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Arquivos Selecionados:</h3>
                <ul className="space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm p-2 bg-muted rounded flex items-center justify-between">
                      <span>{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações da Evidência</CardTitle>
            <CardDescription>Preencha os detalhes sobre a evidência que está sendo adicionada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Evidência</Label>
              <Input id="name" placeholder="Ex: Radiografia panorâmica" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="odontologica">Odontológica</SelectItem>
                  <SelectItem value="documentos">Documentos</SelectItem>
                  <SelectItem value="fotografias">Fotografias</SelectItem>
                  <SelectItem value="laboratorial">Laboratorial</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data da Coleta/Recebimento</Label>
              <Input id="date" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva detalhes sobre a evidência, como foi coletada, condições, etc."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Local de retirada</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione um local de retirada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agencia">Agência</SelectItem>
                  <SelectItem value="laboratorio">Laboratório</SelectItem>
                  <SelectItem value="delegacia">Delegacia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Salvar Evidência</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

