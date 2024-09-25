import express from "express";
import booksRouter from "./routes/books.js";

const app = express();

app.use("/public", express.static("./public"));
app.use("/scripts", express.static("/public/scripts"));

app.use("/books", booksRouter);

app.get("/", (req, res) => {
    res.status(200).send(
        '<h1 style="text-align: center; margin-top: 50px;">Library API</h1>'
    );
});

app.get("/*", (req, res) => {
    res.status(404).sendFile("./public/404.html", { root: __dirname });
});

const PORT = process.env.PORT || 2706;

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
