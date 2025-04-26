import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthContext } from "@contexts/AuthProvider";
import { useOnboardingContext } from "@contexts/OnboardingProvider";
import { Onboarding } from "./Onboarding";

function AuthGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useAuthContext();
  const { showOnboarding, selectedApp } = useOnboardingContext();

  useEffect(() => {
    if (showOnboarding) {
      return;
    }

    if (selectedApp === "task") {
      navigate("/task");
      return;
    }

    if (
      !loggedInUser &&
      location.pathname !== "/product/login" &&
      location.pathname !== "/product/register"
    ) {
      navigate("/product/login");
    } else if (
      loggedInUser &&
      (location.pathname === "/product/login" ||
        location.pathname !== "/product/register")
    ) {
      navigate("/product");
    }
  }, [location.pathname, loggedInUser, navigate, selectedApp, showOnboarding]);

  if (showOnboarding) {
    return <Onboarding />;
  }

  return <Outlet />;
}

export { AuthGuard };
