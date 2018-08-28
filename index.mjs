import express from "express";

import movies from "./routes/movies"

const PORT = process.env.NODE_ENV === "development" ? 3000 : process.env.PORT;



//const PORT = process.env.PORT;
const serverPrefix = "";

const app = express();

app.use(`${serverPrefix}/movies`, movies);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

export default app;

