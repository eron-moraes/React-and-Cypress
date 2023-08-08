const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
let userdb = JSON.parse(fs.readFileSync("./usuarios.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "987456321";

function criaToken(payload, expiresIn = "6h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verificaToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function usuarioExiste({ email, senha }) {
  return (
    userdb.usuarios.findIndex(
      (user) => user.email === email && user.senha === senha
    ) !== -1
  );
}

function emailExiste(email) {
  return userdb.usuarios.findIndex((user) => user.email === email) !== -1;
}

server.post("/public/cadastrar", (req, res) => {
  const { email, senha, nome } = req.body;

  if (emailExiste(email)) {
    const status = 401;
    const message = "E-mail já cadastrado!";
    res.status(status).json({ status, message });
  }

  fs.readFile("./usuarios.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
    }

    const json = JSON.parse(data.toString());

    const ultimo_item_id =
      json.usuarios.length > 0 ? json.usuarios[json.usuarios.length - 1].id : 0;

    json.usuarios.push({ id: ultimo_item_id + 1, email, senha, nome });
    fs.writeFile("./usuarios.json", JSON.stringify(json), (err) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
    });
    userdb = json;
  });

  const access_token = criaToken({ email, senha });
  res.status(200).json({ access_token });
});

server.post("/public/login", (req, res) => {
  const { email, senha } = req.body;
  if (!usuarioExiste({ email, senha })) {
    const status = 401;
    const message = "E-mail ou senha incorretos";
    res.status(status).json({ status, message });
    return;
  }

  const access_token = criaToken({ email, senha });
  let user = {
    ...userdb.usuarios.find(
      (user) => user.email === email && user.senha === senha
    ),
  };
  delete user.senha;
  res.status(200).json({ access_token, user });
});

server.use(/^(?!\/(public|transacoes|saldo)).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Token inválido";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verificaTokenResult;
    verificaTokenResult = verificaToken(
      req.headers.authorization.split(" ")[1]
    );

    if (verificaTokenResult instanceof Error) {
      const status = 401;
      const message = "Token de autenticação não encontrado";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Token revogado";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Servidor escutando em http://localhost:8000");
});
