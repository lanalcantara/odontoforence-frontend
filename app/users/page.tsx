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
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Report {
  id: string;
  numero: string;
  titulo: string;
  caso: string;
  data: string;
  tipo: string;
  autor: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterNumero, setFilterNumero] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateEnd, setFilterDateEnd] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://odontoforense-backend-2.onrender.com/api/laudo",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            numero: filterNumero || undefined,
            tipo: filterTipo || undefined,
            dataInicio: filterDateStart || undefined,
            dataFim: filterDateEnd || undefined,
          },
        }
      );
      setReports(res.data);
    } catch (err: any) {
      toast({
        title: "Erro ao carregar laudos",
        description:
          err.response?.data?.error || "Verifique sua conexão com o servidor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilter = () => {
    fetchReports();
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laudos Periciais</h1>
          <p className="text-muted-foreground">
            Gerencie todos os laudos periciais do sistema
          </p>
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
          <CardDescription>
            Filtre a lista de laudos por número, tipo ou data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Número do laudo"
                value={filterNumero}
                onChange={(e) => setFilterNumero(e.target.value)}
              />
            </div>
            <div>
              <Select
                value={filterTipo}
                onValueChange={setFilterTipo}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Laudo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preliminar">Preliminar</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                  <SelectItem value="Complementar">Complementar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                type="date"
                value={filterDateStart}
                onChange={(e) => setFilterDateStart(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filterDateEnd}
                onChange={(e) => setFilterDateEnd(e.target.value)}
              />
              <Button onClick={handleFilter}>Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">Carregando laudos...</div>
          ) : reports.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              Nenhum laudo encontrado.
            </div>
          ) : (
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
                    <TableCell className="font-medium">
                      {report.numero}
                    </TableCell>
                    <TableCell>{report.titulo}</TableCell>
                    <TableCell>{report.caso}</TableCell>
                    <TableCell>{report.data}</TableCell>
                    <TableCell>
                      <ReportTypeBadge type={report.tipo} />
                    </TableCell>
                    <TableCell>{report.autor}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ReportTypeBadge({ type }: { type: string }) {
  const typeStyles: Record<string, string> = {
    Preliminar: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    Final: "bg-green-100 text-green-800 hover:bg-green-100/80",
    Complementar: "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
  };

  return (
    <Badge className={typeStyles[type] || ""} variant="outline">
      {type}
    </Badge>
  );
}
