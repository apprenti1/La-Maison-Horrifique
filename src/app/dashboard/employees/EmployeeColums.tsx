"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { API_URL } from "@/lib/utils"
import type { Employee } from "@/mocks/handlers"
import type { ColumnDef } from "@tanstack/react-table"
import { toast } from "react-toastify"

export type EmployeeData = Omit<Employee, "createdAt" | "updatedAt" | "password">

async function handleDeleteEmployee(employeeId: number) {
  try {
    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      // throw new Error(errorData.message || 'Une erreur est survenue lors de la suppression de l\'employé')
      toast.error( errorData.message || "Une erreur est survenue lors de la suppression de l'employé");
    }
    toast.success("Employé supprimé avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé:", error);
    toast.error("Une erreur est survenue lors de la suppression de l'employé");
  }
}

async function handleEditEmployee(employeeId: number) {
  try {
    toast.success(`Employé ${employeeId} modifié avec succès`);
  } catch (error) {
    console.error("Erreur lors de la modification de l'employé:", error);
    toast.error("Une erreur est survenue lors de la modification de l'employé");
  }
}

export const columns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "surname",
    header: "Nom",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Prénom",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "poste",
    header: "Poste",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "dateEmbauche",
    header: "Date d'embauche",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString("fr-FR"),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
    const employeeId = Number(row.original.id);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>...</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-black">
          <DropdownMenuLabel className="text-black">
            <Button onClick={() => handleDeleteEmployee(employeeId)} className="w-full text-left">
              Supprimer
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuItem className="text-black">
            <Button onClick={() => handleEditEmployee(employeeId)} className="w-full text-left">
              Modifier
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  }
]
