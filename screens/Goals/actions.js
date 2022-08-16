import axios from "axios";

export async function getGoalListRef() {
  const { data } = await axios.get(
    "https://tasks.googleapis.com/tasks/v1/users/@me/lists"
  );
  // Check if a list with the name "Goals" exists
  const goalListRef = data.items.find((item) => item.title === "Goals");
  if (goalListRef) return goalListRef;
  // Create a new list with the name "Goals"
  const { data: list } = await axios.post(
    "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
    {
      title: "Goals",
    }
  );
  return list;
}

export async function getGoals() {
  let goals = [];
  const goalListRef = await getGoalListRef();
  const { data: goalsData } = await axios.get(
    `https://tasks.googleapis.com/tasks/v1/lists/${goalListRef.id}/tasks`
  );
  goals = goalsData.items;
  return { goals };
}

export async function deleteGoal(taskId) {
  const goalListRef = await getGoalListRef();
  await axios.delete(
    `https://tasks.googleapis.com/tasks/v1/lists/${goalListRef.id}/tasks/${taskId}`
  );
}

export async function addGoal(title, notes, due) {
  const goalListRef = await getGoalListRef();
  return await axios.post(
    `https://tasks.googleapis.com/tasks/v1/lists/${goalListRef.id}/tasks`,
    {
      title,
      notes,
      due,
    }
  );
}
