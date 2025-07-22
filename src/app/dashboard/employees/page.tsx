import { API_URL, Routes } from "@/lib/utils";
import { columns, type EmployeeData } from "./EmployeeColums";
import { DataTable } from "./EmployeeDataTable";
import { useEffect, useState } from "react";
import BackgroundEffects from "@/components/BackgroundEffects";
import FloatingHorrorElements from "@/components/FloatingHorrorElements";
import Navbar from "@/components/navbar/Navbar";
import { FuckingButton } from "@/components/core/Button";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

async function getData(): Promise<EmployeeData[]> {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    // throw new Error(errorData.message || 'Une erreur est survenue lors de l\'envoi du formulaire')
    toast.error( errorData.message || 'Une erreur est survenue lors de l\'envoi du formulaire')
  }

  return await response.json()
}

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateEmployee = () => {
    navigate(Routes.dashboard.employees.create.toString());
  };

  return (
    <div className="min-h-screen bg-gray-900">
          {/* Background Effects */}
          <BackgroundEffects />
          <FloatingHorrorElements />
          
          {/* Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <div className="relative my-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 text-shadow-horror">
                Gestion des Employés
              </h1>
              <p className="text-gray-300">
                Gérez tous les employés : informations, statut et actions
              </p>
            </div>
    
            {/* Actions et filtres */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <div className="flex gap-4">
                <FuckingButton
                  variant="primary"
                  color="red"
                  size="md"
                  onClick={handleCreateEmployee}
                >
                  + Nouveau Employé
                </FuckingButton>
              </div>
    
              <div className="text-sm text-gray-400">
                {loading ? (
                  <span>Chargement...</span>
                ) : (
                  <span>{employees.length} employé{employees.length > 1 ? 's' : ''}</span>
                )}
              </div>
            </div>

            <DataTable columns={columns} data={employees} />
          </div>
    </div>
  );
}
