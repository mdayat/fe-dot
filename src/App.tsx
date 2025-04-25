import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

const Home = lazy(() =>
  import("./pages/home").then(({ Home }) => ({
    default: Home,
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
      <Routes>
        <Route
          // element={
          //   <Suspense fallback={<></>}>
          //     <ProtectedRouteView />
          //   </Suspense>
          // }
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
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
