import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./pages//login/Login";

import { IsAdmin, IsLogin, adminRoutes, privateRoutes } from "./routes/routes";
import { Suspense } from "react";
import NotFoundPage from "./pages/notFound/NotFound";

function App() {
  return (
    <Suspense fallback="..loading">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<IsLogin />}>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route path="/" element={<IsAdmin />}>
          {adminRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route path="*" element={<NotFoundPage url="/" name="Trang chủ" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
