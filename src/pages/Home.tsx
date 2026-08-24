import HomeHero from "../sections/home/HomeHero";
import { Historia, Proposito, PorQueAxion } from "../sections/home/HistoriaProposito";
import EcossistemaAxion from "../sections/home/EcossistemaAxion";
import { PorTrasDosSistemas, ComoPensaAGestao, NaoApenasSoftware } from "../sections/home/FilosofiaAxion";
import { ParaQuem, DiferencaAxion } from "../sections/home/ParaQuemDiferenca";
import { CtaFinal, FraseFinal } from "../sections/home/CtaFinalAxion";
import Contato from "../sections/Contato";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Historia />
      <Proposito />
      <PorQueAxion />
      <EcossistemaAxion />
      <PorTrasDosSistemas />
      <ComoPensaAGestao />
      <NaoApenasSoftware />
      <ParaQuem />
      <DiferencaAxion />
      <CtaFinal />
      <FraseFinal />
      <Contato />
    </>
  );
}
