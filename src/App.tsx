import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

const ErrorBoundaryView = lazy(() =>
  import("@components/ErrorBoundaryView").then(({ ErrorBoundaryView }) => ({
    default: ErrorBoundaryView,
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
              <ErrorBoundaryView />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <h1>Hello Login Page</h1>
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
