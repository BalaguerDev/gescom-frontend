import AppRouter from "@/routes/AppRouter";
import RequireAuth from "@/auth/RequireAuth";

const App = () => {
  return (
    <RequireAuth>
      <AppRouter />
    </RequireAuth>
  );
};

export default App;
