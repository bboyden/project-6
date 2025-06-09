const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static("public"));

let foods = [
  { name: "Pizza", type: "Fast Food" },
  { name: "Nagiri", type: "Japanese" },
  { name: "Chips and Queso", type: "Appetizer" }
];

app.get('/foods', (req, res) => {
  res.json({ error: "", foods });
});

app.post('/foods', (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    console.error("Missing name or type in POST");
    return res.status(400).json({ error: "Missing food name or type" });
  }
  const newFood = { name, type };
  foods.push(newFood);
  res.status(201).json({ error: "", foods });
});

app.delete('/foods/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= foods.length) {
    console.error(`Invalid index for DELETE: ${index}`);
    return res.status(400).json({ error: "Invalid index" });
  }
  foods.splice(index, 1);
  res.json({ error: "", foods });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
