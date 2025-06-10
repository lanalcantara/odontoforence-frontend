"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, FolderOpen, Home, LogOut, Settings, Shield, SmileIcon as Tooth, Upload, Users } from "lucide-react"
import { SheetClose } from "@/components/ui/sheet"

interface SidebarProps {
  isMobile?: boolean
}

export function Sidebar({ isMobile }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("border-r bg-muted/40", isMobile ? "h-full" : "hidden lg:block lg:w-64")}>
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          {isMobile ? (
            <SheetClose asChild>
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Shield className="h-6 w-6" />
                <span>OdontoForense</span>
              </Link>
            </SheetClose>
          ) : (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6" />
              <span>OdontoForense</span>
            </Link>
          )}
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {isMobile ? (
              <>
                <SheetClose asChild>
                  <Button variant={pathname === "/" ? "secondary" : "ghost"} className="justify-start" asChild>
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Início
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant={pathname?.startsWith("/cases") ? "secondary" : "ghost"}
                    className="justify-start"
                    asChild
                  >
                    <Link href="/cases">
                      <FolderOpen className="mr-2 h-4 w-4" />
                      Casos Periciais
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant={pathname?.startsWith("/evidence") ? "secondary" : "ghost"}
                    className="justify-start"
                    asChild
                  >
                    <Link href="/evidence/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Evidências
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant={pathname?.startsWith("/reports") ? "secondary" : "ghost"}
                    className="justify-start"
                    asChild
                  >
                    <Link href="/reports">
                      <FileText className="mr-2 h-4 w-4" />
                      Laudos
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant={pathname?.startsWith("/dental-database") ? "secondary" : "ghost"}
                    className="justify-start"
                    asChild
                  >
                    <Link href="/dental-database">
                      <Tooth className="mr-2 h-4 w-4" />
                      Banco Odonto-Legal
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant={pathname?.startsWith("/users") ? "secondary" : "ghost"}
                    className="justify-start"
                    asChild
                  >
                    <Link href="/users">
                      <Users className="mr-2 h-4 w-4" />
                      Usuários
                    </Link>
                  </Button>
                </SheetClose>
              </>
            ) : (
              <>
                <Button variant={pathname === "/" ? "secondary" : "ghost"} className="justify-start" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Início
                  </Link>
                </Button>
                <Button
                  variant={pathname?.startsWith("/cases") ? "secondary" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link href="/cases">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Casos Periciais
                  </Link>
                </Button>
                <Button
                  variant={pathname?.startsWith("/evidence") ? "secondary" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link href="/evidence/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Evidências
                  </Link>
                </Button>
                <Button
                  variant={pathname?.startsWith("/reports") ? "secondary" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link href="/reports">
                    <FileText className="mr-2 h-4 w-4" />
                    Laudos
                  </Link>
                </Button>
                <Button
                  variant={pathname?.startsWith("/dental-database") ? "secondary" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link href="/dental-database">
                    <Tooth className="mr-2 h-4 w-4" />
                    Banco Odonto-Legal
                  </Link>
                </Button>
                <Button
                  variant={pathname?.startsWith("/users") ? "secondary" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link href="/users">
                    <Users className="mr-2 h-4 w-4" />
                    Usuários
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2 rounded-lg border p-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium">CS</span>
            </div>
            <div>
              <p className="text-sm font-medium">Carlos Silva</p>
              <p className="text-xs text-muted-foreground">Perito</p>
            </div>
          </div>
          {isMobile ? (
            <SheetClose asChild>
              <Button variant="outline" className="mt-2 w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </SheetClose>
          ) : (
            <Button variant="outline" className="mt-2 w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

