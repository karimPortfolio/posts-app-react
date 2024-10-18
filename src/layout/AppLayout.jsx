import { useContext, useEffect } from "react";
import ButtonsGroup from "../components/ButtonsGroup";
import Navigation from "../components/navigation";
import { AuthStore } from "../context/AuthContext";
import { postsStore } from "../context/PostsContext";
import ProfileDropdown from "../components/ProfileDropdown";
import PulseLoader from "react-spinners/PulseLoader";
export default function AppLayout({ children, route }) {
  const {
    auth,
    user,
    logout,
    fetchUser,
    loading: userLoading,
  } = useContext(AuthStore);

  useEffect(() => {
    const getUser = async () => {
      await fetchUser();
    };

    getUser();
  }, []);

  return (
    <div>
      {route.toSkip && (
        <div className="flex justify-between px-10 py-2">
          <Navigation auth={auth} />
          {userLoading && (
            <PulseLoader color="#36d7b7" size={10} loading={userLoading} />
          )}
          {!auth ? (
            <ButtonsGroup />
          ) : (
            <ProfileDropdown user={user} logout={logout} />
          )}
        </div>
      )}

      {children}
    </div>
  );
}
