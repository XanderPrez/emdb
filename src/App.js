import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Loading } from "./components/Loading";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Alert } from "./components/Alert";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"));
const Add = lazy(() => import(/* webpackChunkName: "add" */ "./pages/Add"));
const Edit = lazy(() => import(/* webpackChunkName: "edit" */ "./pages/Edit"));

function App() {
  const state = {
    title: "EMDB",
    nav: [
      { url: "/", label: "Home" },
      { url: "/add", label: "Add movie" },
    ],
  };

  const [alert, setAlert] = useState({
    visible: false,
    content: "",
  });

// alert modifiers

  const editSuccess = () => {
    setAlert({
      visible: true,
      content: "scheda aggiornata correttamente",
    });
  };

  const deleteSuccess = () => {
    setAlert({
      visible: true,
      content: "scheda eliminata",
    });
  };

  const addSuccess = () => {
    setAlert({
      visible: true,
      content: "scheda inserita correttamente",
    });
  };

// ALERT TIMEOUT

useEffect(() => {
  const removeAlert = setTimeout(() => setAlert({visible: false, content: " "}), 3000);
  return () => clearTimeout(removeAlert);
}, [alert]);

  return (
    <>
      <Nav title={state.title} data={state.nav} />
      <main>
        <Alert visible={alert.visible} content={alert.content} />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/add"
            element={
              <Suspense fallback={<Loading />}>
                <Add addCallback={addSuccess}/>
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Edit editCallback={editSuccess} deleteCallback={deleteSuccess} />
              </Suspense>
            }
          />
        </Routes>

        <Footer />
      </main>
    </>
  );
}

export default App;
