import { DataStateHandler } from "@/components/ui";
import { useBillingData } from "@/hooks/useBillingData";
import BillingHeader from "@/components/billing/BillingHeader";
import FacturacionMensual from "@/components/billing/FacturacionMensual";
import FacturacionTrimestral from "@/components/billing/FacturacionTrimestral";
import FacturacionAnual from "@/components/billing/FacturacionAnual";
import BillingInsights from "@/components/billing/BillingInsights";

export default function BillingPage() {
  const data = useBillingData();

  return (
    <DataStateHandler loading={data.loading} error={data.error} onRetry={data.reload}>
      <div className="space-y-10">
        <BillingHeader {...data} />
        <FacturacionMensual
          mensualFacturacion={data.mensualFacturacion}
          objetivosCategorias={data.objetivosCategorias}
          diasRestantes={data.diasRestantes}
        />
        <FacturacionTrimestral {...data} />
        <FacturacionAnual {...data} />
        <BillingInsights />
      </div>
    </DataStateHandler>
  );
}
