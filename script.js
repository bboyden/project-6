document.addEventListener("DOMContentLoaded", () => {
  const foodList = document.getElementById("foodList");
  const foodNameInput = document.getElementById("foodName");
  const foodTypeInput = document.getElementById("foodType");
  const addButton = document.querySelector("button");

  fetch("/foods")
    .then((res) => res.json())
    .then((data) => updateList(data.foods))
    .catch((err) => console.error("Error fetching foods:", err));

  addButton.addEventListener("click", () => {
    const name = foodNameInput.value.trim();
    const type = foodTypeInput.value.trim();
    if (!name || !type) return;

    fetch("/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type })
    })
      .then((res) => res.json())
      .then((data) => {
        updateList(data.foods);
        foodNameInput.value = "";
        foodTypeInput.value = "";
      })
      .catch((err) => console.error("Error adding food:", err));
  });

  function updateList(foods) {
    foodList.innerHTML = "";
    foods.forEach((food, index) => {
      const li = document.createElement("li");
      li.textContent = `${food.name} (${food.type})`;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteFood(index);
      li.append(" ", delBtn);

      foodList.appendChild(li);
    });
  }

  function deleteFood(index) {
    fetch(`/foods/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => updateList(data.foods))
      .catch((err) => console.error("Error deleting food:", err));
  }
});
