import {useAppContext} from "../contexts/AppContext.jsx";


export default function AvatarPage() {
  const {playerData, trainingGoal} = useAppContext();
  
  return (
    <div>
      <h1>Аватар</h1>
      <p>Вес: {playerData.weight}</p>
      <p>Рост: {playerData.height}</p>
      <p>Очки: {playerData.score}</p>
      <p>Цель тренировки: {trainingGoal.goal}</p>
      <p>{trainingGoal.description}</p>
    </div>
  )
}