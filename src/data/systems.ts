import type { LucideIcon } from "lucide-react";
import { Factory, Pill, UtensilsCrossed, ShoppingCart, Palette } from "lucide-react";

export type SystemStatus = "disponivel" | "em-breve";

export type AxionSystem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: SystemStatus;
  icon: LucideIcon;
  color: string;
  href: string;
  note?: string;
};

export const axionSystems: AxionSystem[] = [
  {
    id: "axion-one",
    name: "Axion One",
    tagline: "ERP industrial para tintas e revestimentos",
    description: "Do laboratório ao faturamento: fórmulas, colorimetria, PCP, produção, qualidade e fiscal com NF-e, tudo integrado.",
    status: "disponivel",
    icon: Factory,
    color: "#38bdf8",
    href: "/axion-one",
  },
  {
    id: "axion-pharma",
    name: "Axion Pharma",
    tagline: "Gestão para farmácias",
    description: "PDV, NFC-e, controle de lote e validade, receita médica e SNGPC — tudo o que a farmácia precisa pra operar em conformidade.",
    status: "em-breve",
    icon: Pill,
    color: "#22c55e",
    href: "/#contato",
  },
  {
    id: "axion-food",
    name: "Axion Food",
    tagline: "Gestão para restaurantes",
    description: "Comandas, mesas, KDS e ficha técnica de prato — do pedido à cozinha sem gargalo.",
    status: "em-breve",
    icon: UtensilsCrossed,
    color: "#f59e0b",
    href: "/#contato",
  },
  {
    id: "axion-market",
    name: "Axion Market",
    tagline: "Gestão para varejo e comércio",
    description: "PDV ágil, estoque por grade/tamanho ou peso, promoções e indicadores — para mercados, lojas de roupas e varejo em geral.",
    status: "em-breve",
    icon: ShoppingCart,
    color: "#6366f1",
    href: "/#contato",
  },
  {
    id: "axion-paint",
    name: "Axion Paint",
    tagline: "Gestão para distribuição e revenda de tintas",
    description: "Logística para quem distribui, PDV e tonalização para quem vende no balcão — com ponte direta pro Axion One pra quem também fabrica.",
    status: "em-breve",
    icon: Palette,
    color: "#ec4899",
    href: "/#contato",
    note: "Integra com o Axion One",
  },
];
