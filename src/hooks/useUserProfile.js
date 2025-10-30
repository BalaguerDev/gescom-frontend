// ✅ src/hooks/useUserProfile.js
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useUserProfile = (API_URL) => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoading || !isAuthenticated || !user) return;
      try {
        setLoadingProfile(true);
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();

        const userData = data.user || data;
        setProfile(userData);

      } catch (err) {
        console.error("❌ Error cargando perfil:", err);
        setErrorProfile(err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, isLoading, getAccessTokenSilently, API_URL]);

  return { profile, loadingProfile, errorProfile };
};
