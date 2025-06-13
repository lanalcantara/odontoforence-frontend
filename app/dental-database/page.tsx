"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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

interface ConteudoLaudo {
  tipoDenticao: string;
  caracteristicasEspecificas: string;
  regiao: string[];
}

interface DentalRecord {
  _id: string;
  tipodoregistro: string;
  dataRegistro: string;
  caracteristica: string;
  status: string;
  fileURL?: string;
  conteudoLaudo: ConteudoLaudo;
}

export default function DentalDatabasePage() {
  const [records, setRecords] = useState<DentalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDentalRecords = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://odontoforense-backend-2.onrender.com/api/bancoodonto",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecords(res.data);
    } catch (err: any) {
      toast({
        title: "Erro ao carregar registros odontológicos",
        description:
          err.response?.data?.error || "Erro inesperado ao buscar registros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDentalRecords();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Banco de Dados Odonto-Legal
          </h1>
          <p className="text-muted-foreground">
            Base de dados para identificação odontológica
          </p>
        </div>
        <Button asChild>
          <Link href="/dental-database/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Registro
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registros Odontológicos</CardTitle>
          <CardDescription>
            {loading
              ? "Carregando registros..."
              : `${records.length} registro(s) encontrados`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data de Registro</TableHead>
                <TableHead>Características</TableHead>
                <TableHead>Dentição</TableHead>
                <TableHead>Região</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="font-medium">
                      {record._id}
                    </TableCell>
                    <TableCell className="capitalize">
                      {record.tipodoregistro.replace("-", " ")}
                    </TableCell>
                    <TableCell>
                      {new Date(record.dataRegistro).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{record.caracteristica}</TableCell>
                    <TableCell>
                      {record.conteudoLaudo?.tipoDenticao || "-"}
                    </TableCell>
                    <TableCell>
                      {record.conteudoLaudo?.regiao?.join(", ") || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          record.status.toLowerCase() === "identificado"
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
                        <Link href={`/dental-database/${record._id}`}>
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
