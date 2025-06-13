"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface EvidenciaRecord {
  _id: string;
  nome_evidencia: string;
  categoria: string;
  data_coleta: string;
  descricao: string;
  local_retirada: string;
  fileUrl?: string;
  coletadoPor?: string;
  caso?: string;
}

export default function EvidenciaDatabasePage() {
  const [records, setRecords] = useState<EvidenciaRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvidenciaRecords = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://odontoforense-backend-2.onrender.com/api/evidencia",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecords(res.data);
    } catch (err: any) {
      toast({
        title: "Erro ao carregar evidências",
        description:
          err.response?.data?.error || "Erro inesperado ao buscar evidências.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidenciaRecords();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Banco de Dados de Evidências
          </h1>
          <p className="text-muted-foreground">
            Base de dados para controle e análise de evidências forenses
          </p>
        </div>
        <Button asChild>
          <Link href="/evidencia/new">
            <Plus className="mr-2 h-4 w-4" /> Nova Evidência
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registros de Evidências</CardTitle>
          <CardDescription>
            {loading
              ? "Carregando evidências..."
              : `${records.length} evidência(s) encontrada(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data de Coleta</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Local</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Nenhuma evidência encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="font-medium">
                      {record._id}
                    </TableCell>
                    <TableCell>{record.nome_evidencia}</TableCell>
                    <TableCell>{record.categoria}</TableCell>
                    <TableCell>
                      {new Date(record.data_coleta).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{record.descricao}</TableCell>
                    <TableCell>{record.local_retirada}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/evidencia/${record._id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
