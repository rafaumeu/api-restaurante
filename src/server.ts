import express from "express";

const PORT = 3333;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}
    http://localhost:${PORT}
    http://192.168.0.55:${PORT}
    `);
});