import { useContext } from "react";
import { LocacionesContext } from "../context/LocacionesProvider";

export const useLocation = () => {
    return useContext(LocacionesContext);
};