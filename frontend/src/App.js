import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <Sidebar />
      <div className="p-5" style={{ flex: "4", paddingRight: "280px" }}>
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;
