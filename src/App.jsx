import './App.css'
import PagesNav from "./components/PagesNav.jsx";
import ExercisesCatalogPage from "./pages/ExercisesCatalogPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AvatarPage from "./pages/AvatarPage.jsx"; 
import StartTrainingPage from "./pages/StartTrainingPage.jsx";
import TrainingConstructorPage from "./pages/TrainingConstructorPage.jsx";
import CenterContainer from "./components/CenterContainer.jsx";

function App() {
  return (
    <div style={{width: "100%"}}>
      <BrowserRouter>
        <PagesNav />
        <CenterContainer>
        <Routes>
          
            <Route path="/" element={<ExercisesCatalogPage />} />
            <Route path="/exercises-catalog" element={<ExercisesCatalogPage />} />
            <Route path="/avatar" element={<AvatarPage />} />
            <Route path="/start-training" element={<StartTrainingPage />} />
            <Route path="/training-constructor" element={<TrainingConstructorPage />} />
         
        </Routes>
    </CenterContainer>
      </BrowserRouter>
    </div>
  )
}

export default App
