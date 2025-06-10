import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function UserPermissionsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Permissões</h1>
          <p className="text-muted-foreground">Defina as permissões de acesso para Carlos Silva</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permissões do Usuário</CardTitle>
          <CardDescription>Selecione as permissões que este usuário terá acesso no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cases">
            <TabsList className="mb-4">
              <TabsTrigger value="cases">Casos Periciais</TabsTrigger>
              <TabsTrigger value="reports">Laudos</TabsTrigger>
              <TabsTrigger value="evidence">Evidências</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="dental">Banco Odonto-Legal</TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PermissionItem
                  id="view-cases"
                  label="Visualizar Casos"
                  description="Permite visualizar a lista de casos e seus detalhes"
                  defaultChecked
                />
                <PermissionItem
                  id="create-cases"
                  label="Criar Casos"
                  description="Permite criar novos casos periciais"
                  defaultChecked
                />
                <PermissionItem
                  id="edit-cases"
                  label="Editar Casos"
                  description="Permite editar informações de casos existentes"
                  defaultChecked
                />
                <PermissionItem
                  id="delete-cases"
                  label="Excluir Casos"
                  description="Permite excluir casos do sistema"
                />
                <PermissionItem
                  id="assign-cases"
                  label="Atribuir Casos"
                  description="Permite atribuir casos a outros peritos"
                  defaultChecked
                />
                <PermissionItem
                  id="change-status"
                  label="Alterar Status"
                  description="Permite alterar o status dos casos"
                  defaultChecked
                />
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PermissionItem
                  id="view-reports"
                  label="Visualizar Laudos"
                  description="Permite visualizar laudos periciais"
                  defaultChecked
                />
                <PermissionItem
                  id="create-reports"
                  label="Criar Laudos"
                  description="Permite criar novos laudos periciais"
                  defaultChecked
                />
                <PermissionItem
                  id="edit-reports"
                  label="Editar Laudos"
                  description="Permite editar laudos existentes"
                  defaultChecked
                />
                <PermissionItem
                  id="delete-reports"
                  label="Excluir Laudos"
                  description="Permite excluir laudos do sistema"
                />
                <PermissionItem
                  id="export-reports"
                  label="Exportar Laudos"
                  description="Permite exportar laudos em formato PDF"
                  defaultChecked
                />
                <PermissionItem
                  id="sign-reports"
                  label="Assinar Laudos"
                  description="Permite assinar digitalmente os laudos"
                  defaultChecked
                />
              </div>
            </TabsContent>

            <TabsContent value="evidence" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PermissionItem
                  id="view-evidence"
                  label="Visualizar Evidências"
                  description="Permite visualizar evidências dos casos"
                  defaultChecked
                />
                <PermissionItem
                  id="upload-evidence"
                  label="Enviar Evidências"
                  description="Permite fazer upload de novas evidências"
                  defaultChecked
                />
                <PermissionItem
                  id="categorize-evidence"
                  label="Categorizar Evidências"
                  description="Permite categorizar e organizar evidências"
                  defaultChecked
                />
                <PermissionItem
                  id="delete-evidence"
                  label="Excluir Evidências"
                  description="Permite excluir evidências do sistema"
                />
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PermissionItem
                  id="view-users"
                  label="Visualizar Usuários"
                  description="Permite visualizar a lista de usuários"
                  defaultChecked
                />
                <PermissionItem id="create-users" label="Criar Usuários" description="Permite criar novos usuários" />
                <PermissionItem
                  id="edit-users"
                  label="Editar Usuários"
                  description="Permite editar informações de usuários"
                />
                <PermissionItem
                  id="delete-users"
                  label="Excluir Usuários"
                  description="Permite excluir usuários do sistema"
                />
                <PermissionItem
                  id="manage-permissions"
                  label="Gerenciar Permissões"
                  description="Permite gerenciar permissões de usuários"
                />
              </div>
            </TabsContent>

            <TabsContent value="dental" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PermissionItem
                  id="view-dental"
                  label="Visualizar Registros"
                  description="Permite visualizar registros odontológicos"
                  defaultChecked
                />
                <PermissionItem
                  id="create-dental"
                  label="Criar Registros"
                  description="Permite criar novos registros odontológicos"
                  defaultChecked
                />
                <PermissionItem
                  id="edit-dental"
                  label="Editar Registros"
                  description="Permite editar registros existentes"
                  defaultChecked
                />
                <PermissionItem
                  id="delete-dental"
                  label="Excluir Registros"
                  description="Permite excluir registros do sistema"
                />
                <PermissionItem
                  id="compare-dental"
                  label="Comparar Registros"
                  description="Permite comparar registros para identificação"
                  defaultChecked
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" /> Salvar Permissões
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PermissionItem({
  id,
  label,
  description,
  defaultChecked = false,
}: {
  id: string
  label: string
  description: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-start space-x-3 p-4 border rounded-md">
      <Checkbox id={id} defaultChecked={defaultChecked} />
      <div className="space-y-1">
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

