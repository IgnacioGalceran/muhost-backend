import multer from "multer";
import path from "path";
import fs from "fs";

type TiposString = "transferencias";
type Tipos = ["transferencias"];

const baseUploads = path.resolve(process.cwd(), "uploads");
const tipos: Tipos = ["transferencias"];

for (const t of tipos) {
  const dir = path.join(baseUploads, t);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function uploadByType(tipo: TiposString) {
  if (!tipos.includes(tipo)) {
    throw new Error(`Tipo de upload inválido: ${tipo}`);
  }
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(baseUploads, tipo));
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  return multer({ storage });
}
