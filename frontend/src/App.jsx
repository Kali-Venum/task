import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import AuthRoute from "./RouteGuard/auth.route";
import ProtectedRoute from "./RouteGuard/protected.route";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {routes.map((item) => {
          return item?.protected ? (
            <Route
              path={item.path}
              element={<ProtectedRoute children={item.component} />}
            />
          ) : item?.protected === false ? (
            <Route
              path={item.path}
              element={<AuthRoute children={item.component} />}
            />
          ) : (
            <Route path={item.path} element={item.component} />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
