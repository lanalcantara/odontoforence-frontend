"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Edit, Plus, Trash2, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface User {
  _id: string
  nome: string
  email: string
  perfil: string
}

export default function UsersPage() {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    perfil: "",
  })
  const [editData, setEditData] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("https://odontoforense-backend-2.onrender.com/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(res.data)
    } catch (err) {
      toast({
        title: "Erro ao carregar usuários",
        description: "Verifique sua conexão com o servidor.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.email || !formData.perfil) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos antes de salvar.",
        variant: "destructive",
      })
      return
    }

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "https://odontoforense-backend-2.onrender.com/api/usuarios",
        {
          nome: formData.nome,
          email: formData.email,
          perfil: formData.perfil.toLowerCase(),
          password: "123456",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast({
        title: "Sucesso",
        description: "Usuário adicionado com sucesso!",
      })

      setFormData({ nome: "", email: "", perfil: "" })
      setOpen(false)
      fetchUsers()
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.response?.data?.error || "Erro desconhecido",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Deseja realmente excluir este usuário?")) return

    try {
      const token = localStorage.getItem("token")
      await axios.delete(`https://odontoforense-backend-2.onrender.com/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast({
        title: "Usuário excluído",
        description: "O usuário foi removido com sucesso.",
      })

      fetchUsers()
    } catch (error: any) {
      toast({
        title: "Erro ao excluir usuário",
        description: error.response?.data?.error || "Erro desconhecido",
        variant: "destructive",
      })
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editData) return

    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `https://odontoforense-backend-2.onrender.com/api/user/${editData._id}`,
        {
          nome: editData.nome,
          email: editData.email,
          perfil: editData.perfil,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast({
        title: "Usuário atualizado",
        description: "As informações foram salvas com sucesso.",
      })

      setEditOpen(false)
      setEditData(null)
      fetchUsers()
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar usuário",
        description: error.response?.data?.error || "Erro desconhecido",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema e suas permissões
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <Input
                placeholder="Nome completo"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Select
                value={formData.perfil}
                onValueChange={(value) =>
                  setFormData({ ...formData, perfil: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="perito">Perito</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="assistente">Assistente</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end">
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {user._id}
                  </TableCell>
                  <TableCell className="font-medium">{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.perfil}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditData(user)
                          setEditOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/users/${user._id}/permissions`}>
                          <UserCog className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {editData && (
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <Input
                placeholder="Nome completo"
                value={editData.nome}
                onChange={(e) =>
                  setEditData({ ...editData, nome: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
              <Select
                value={editData.perfil}
                onValueChange={(value) =>
                  setEditData({ ...editData, perfil: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="perito">Perito</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="assistente">Assistente</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
