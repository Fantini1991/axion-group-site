import { createContext, useContext } from "react";
import type { StatusServidor } from "./api";
import type { Usuario } from "./types";

export interface ContextoEnem {
  usuario: Usuario | null;
  status: StatusServidor;
  definirUsuario: (u: Usuario | null) => void;
}

export const EnemContexto = createContext<ContextoEnem | null>(null);

export function useEnem(): ContextoEnem {
  const ctx = useContext(EnemContexto);
  if (!ctx) throw new Error("useEnem fora do EnemApp");
  return ctx;
}
