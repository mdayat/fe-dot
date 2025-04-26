import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@contexts/AuthProvider";
import { AuthGuard } from "@components/AuthGuard";

const Home = lazy(() =>
  import("./pages/home").then(({ Home }) => ({
    default: Home,
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
              path="/"
              element={
                <Suspense fallback={<></>}>
                  <Home />
                </Suspense>
              }
            />

            <Route
              path="/login"
              element={
                <Suspense fallback={<></>}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="/register"
              element={
                <Suspense fallback={<></>}>
                  <Registration />
                </Suspense>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export { App };
