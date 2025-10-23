import { Loading, ErrorState } from "@/components/ui";

const DataStateHandler = ({ loading, error, onRetry, children, loadingMessage }) => {
  if (loading) return <Loading fullscreen message={loadingMessage || "Cargando..."} />;
  if (error) return <ErrorState fullscreen message={error} onRetry={onRetry} />;
  return <>{children}</>;
};

export default DataStateHandler;
