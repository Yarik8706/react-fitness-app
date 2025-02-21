import {createContext, useContext, useEffect, useState} from "react";
import {getPlayerData, savePlayerData} from "../api.js";
import UserInfoForm from "../components/windows/UserInfoForm.jsx";
import {getTrainingGoal} from "../utils.js";


const AppContext = createContext({
  playerData: {},
  isMobile: false,
  trainingGoal: {},
  editPlayerData: () => {},
})

export function AppContextProvider({children}) {
  const [playerData, setPlayerData] = useState({
    weight: 0,
    height: 0,
    score: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [trainingGoal, setTrainingGoal] = useState({});
  const [userInfoFormState, setUserInfoFormState] = useState(
    {visible: false, onClose: () => {
      setUserInfoFormState(prevState => {
            return {...prevState, visible: false}
        })
      }});

  useEffect(() => {
    const storedPlayerData = getPlayerData();
    setPlayerData(storedPlayerData)
    setIsMobile(window.innerWidth <= 768);
    if (storedPlayerData.weight === 0 || storedPlayerData.height === 0) {
      setUserInfoFormState(prevState => {
        return {...prevState, visible: true}
      })
    }
    editTrainingGoal(storedPlayerData)
  }, []);
  
  function editPlayerData(data) {
    setPlayerData(data)
    savePlayerData(data)
  }
  
  function editTrainingGoal(data) {
    setTrainingGoal(getTrainingGoal(data.weight, data.height))
  }
  
  function setStartPlayerData(data){
    const currentData = {...data, score: 0};
    setPlayerData(currentData)
    savePlayerData(currentData)
    editTrainingGoal(data)
  }
  
  return <AppContext.Provider value={{playerData, isMobile, trainingGoal, editPlayerData}}>
    {children}
    <UserInfoForm 
      visible={userInfoFormState.visible} 
      onClose={userInfoFormState.onClose}
      onSubmit={setStartPlayerData}
      className="modal-window"
    />
  </AppContext.Provider>;
}

export default AppContext

export function useAppContext() {
  return useContext(AppContext);
} 