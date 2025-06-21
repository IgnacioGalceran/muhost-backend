import express, { Request, Response } from "express";
import http from "http";
import { router as AuthRouter } from "./auth/auth.routes.js";
import { router as ClientesRouter } from "./entities/clientes/clientes.routes.js";
import { router as EspecificacionesRouter } from "./entities/especificaciones/especificaciones.routes.js";
import { router as AdicionalesRouter } from "./entities/adicionales/adicionales.routes.js";
import { router as PlanesRouter } from "./entities/planes/planes.routes.js";
import { router as MercadoPagoRouter } from "./services/mercadopago/mercadopago.routes.js";
import { errorHandler } from "./shared/errorHandler.js";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/sql.config.js";

const app = express();

const server = http.createServer(app);

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Configura las rutas de la API
app.use("/api/especificaciones", EspecificacionesRouter);
app.use("/api/adicionales", AdicionalesRouter);
app.use("/api/planes", PlanesRouter);
app.use("/api/mercadopago", MercadoPagoRouter);
app.use("/api/clientes", ClientesRouter);
app.use("/api/auth", AuthRouter);
app.use(errorHandler);

app.use("/health", (req: Request, res: Response) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  req.headers["x-forwarded-for"];

  res.status(200).json({ message: "OK", date: new Date() });
});

if (process.env.ENVIRONMENT) {
  const PORT = process.env.ENVIRONMENT.match("DEVELOPMENT") ? 4000 : 4001;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
