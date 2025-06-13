"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  numero: string;
  titulo: string;
  data: string;
  tipo: string;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function ReportTypeBadge({ type }: { type: string }) {
  const variant = {
    Final: "default",
    Parcial: "secondary",
    Rascunho: "outline",
  }[type] || "outline";

  return <Badge variant={variant}>{type}</Badge>;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://odontoforense-backend-2.onrender.com/api/laudo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const mappedReports: Report[] = res.data.map((r: any) => ({
        id: r._id,
        numero: r.numeroLaudo,
        titulo: r.tituloLaudo,
        data: new Date(r.dataEmissao).toLocaleDateString("pt-BR"),
        tipo: capitalize(r.tipoLaudo),
      }));

      setReports(mappedReports);
    } catch (err: any) {
      toast({
        title: "Erro ao carregar laudos",
        description:
          err.response?.data?.error || "Erro inesperado ao buscar os laudos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Laudos Emitidos</CardTitle>
          <CardDescription>
            Visualize os laudos técnicos gerados no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Carregando laudos...
                  </TableCell>
                </TableRow>
              ) : reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Nenhum laudo encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.numero}</TableCell>
                    <TableCell>{report.titulo}</TableCell>
                    <TableCell>{report.data}</TableCell>
                    <TableCell>
                      <ReportTypeBadge type={report.tipo} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/reports/${report.id}`}>
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
