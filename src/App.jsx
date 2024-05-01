import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import { UseRoutes } from "./routes/UseRoutes";
import { useEffect } from "react";
import { PAGE_TITLE_TO_PATH } from "./consts";


function App() {
  const routes = UseRoutes()
  const location = useLocation()

  useEffect(() => {
    const title = PAGE_TITLE_TO_PATH[location.pathname]
    if (!title) return
    document.title = title
  }, [location])
  return (
    <>
    <Header />
    {routes}
    </>
  )
}

export default App;
