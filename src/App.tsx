import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@contexts/AuthProvider";
import { AuthGuard } from "@components/AuthGuard";
import { OnboardingProvider } from "@contexts/OnboardingProvider";

const Task = lazy(() =>
  import("./pages/task").then(({ Task }) => ({
    default: Task,
  }))
);

const Login = lazy(() =>
  import("./pages/login").then(({ Login }) => ({
    default: Login,
  }))
);

const Registration = lazy(() =>
  import("./pages/registration").then(({ Registration }) => ({
    default: Registration,
  }))
);

const ErrorBoundary = lazy(() =>
  import("@components/ErrorBoundary").then(({ ErrorBoundary }) => ({
    default: ErrorBoundary,
  }))
);

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <OnboardingProvider>
        <AuthProvider>
          <Routes>
            <Route
              element={
                <Suspense fallback={<></>}>
                  <AuthGuard />
                </Suspense>
              }
              errorElement={
                <Suspense fallback={<></>}>
                  <ErrorBoundary />
                </Suspense>
              }
            >
              <Route
                path="/task"
                element={
                  <Suspense fallback={<></>}>
                    <Task />
                  </Suspense>
                }
              />

              <Route
                path="/product"
                element={
                  <Suspense fallback={<></>}>
                    <>PROD</>
                  </Suspense>
                }
              />

              <Route
                path="/product/login"
                element={
                  <Suspense fallback={<></>}>
                    <Login />
                  </Suspense>
                }
              />

              <Route
                path="/product/register"
                element={
                  <Suspense fallback={<></>}>
                    <Registration />
                  </Suspense>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/task" replace />} />
          </Routes>
        </AuthProvider>
      </OnboardingProvider>
    </BrowserRouter>
  );
}

export { App };
