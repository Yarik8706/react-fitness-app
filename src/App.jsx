import './App.css'
import PagesNav from "./components/PagesNav.jsx";
import ExercisesCatalogPage from "./pages/ExercisesCatalogPage.jsx";

function App() {

  return (
    <div style={{width: "100%"}}>
      <PagesNav />
      <ExercisesCatalogPage/>
    </div>
  )
}

export default App
