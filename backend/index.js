import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// TODO: session
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

// import Routers
import userRouter from "./routes/user.js";
import spotRouter from "./routes/spot.js";
const app = express();

const port = process.env.PORT || 8080;

// log to access.log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

// helmet
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "*"],
        "connect-src": ["'self'", "*"],
        "frame-src": ["'self'", "*"],
      },
    },
  })
);

// helmet with all opened
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'", "*"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
//         styleSrc: ["'self'", "'unsafe-inline'", "*"],
//         imgSrc: ["'self'", "data:", "*"],
//         fontSrc: ["'self'", "*"],
//         connectSrc: ["'self'", "*"],
//         frameSrc: ["'self'", "*"],
//         objectSrc: ["'none'"],
//         mediaSrc: ["'self'", "*"],
//       },
//     },
//   })
// );

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

// express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(express.static('./view/dist'));

// Routes
app.use("/api/user/", userRouter);
app.use("/api/spot/", spotRouter);

// root router
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
