import { Loading, Error } from "@/components/ui";

const DataStateHandler = ({ loading, error, onRetry, children, loadingMessage }) => {
  if (loading) return <Loading fullscreen message={loadingMessage || "Cargando..."} />;
  if (error) return <Error fullscreen message={error} onRetry={onRetry} />;
  return <>{children}</>;
};

export default DataStateHandler;
