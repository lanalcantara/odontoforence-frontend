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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DentalRecord {
  _id: string;
  tipoRegistro: "Ante-Mortem" | "Post-Mortem";
  dataRegistro: string;
  caracteristicas: string;
  status: "Identificado" | "Não Identificado";
}

export default function DentalDatabasePage() {
  const [activeTab, setActiveTab] = useState("search");
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="search">Busca</TabsTrigger>
          <TabsTrigger value="compare">Comparação</TabsTrigger>
          <TabsTrigger value="records">Registros</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          {/* ... mantemos a busca e resultados mockados por enquanto ... */}
        </TabsContent>

        <TabsContent value="compare">
          {/* ... mantemos a seção de comparação como estática ... */}
        </TabsContent>

        <TabsContent value="records">
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
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Nenhum registro encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record) => (
                      <TableRow key={record._id}>
                        <TableCell className="font-medium">
                          {record._id}
                        </TableCell>
                        <TableCell>{record.tipoRegistro}</TableCell>
                        <TableCell>
                          {new Date(record.dataRegistro).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>{record.caracteristicas}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
