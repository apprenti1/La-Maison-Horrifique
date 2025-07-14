import { Routes } from "@/components/core/Routes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogoutPage() {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  toast.success("Déconnexion réussie !");
  setTimeout(() => {
    navigate(Routes.login.toString(), { replace: true });
  }, 1);

  return <></>;
}
