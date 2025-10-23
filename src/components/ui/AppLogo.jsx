import { Link } from "react-router-dom";

const AppLogo = () => (
  <Link
    to="/dashboard"
    className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
  >
    GESCOM
  </Link>
);

export default AppLogo;
