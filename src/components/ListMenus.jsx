import ListTemplate, { ListTemplateItem } from "./ListTemplate";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Reutilizo los íconos como ejemplo
import FavoriteIcon from '@mui/icons-material/Favorite'; // Cambia a los íconos que prefieras

// Definir ítems para Cesar y Vinegare
const cesarItem = new ListTemplateItem({
    tag: "Cesar",
    icon: <DashboardIcon />, // Reemplaza con el ícono adecuado
    redirection: "/cesar",    // Ruta a la página de Cesar
});

const vinegareItem = new ListTemplateItem({
    tag: "Vinegare",
    icon: <FavoriteIcon />,   // Reemplaza con el ícono adecuado
    redirection: "/vinegare", // Ruta a la página de Vinegare
});

// Crear el menú con solo Cesar y Vinegare
export default function CesarVinegareList() {
    return (
        <ListTemplate items={[cesarItem, vinegareItem]} />
    );
}
