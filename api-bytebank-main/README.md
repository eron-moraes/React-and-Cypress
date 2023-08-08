![React: Testes end to end com Cypress](thumb.png)

# Bytebank

O Bytebank é um MVP de banco digital que está no início de suas atividades mas ainda falta muito que ser desenvolvido. 

# JSONServer + JWT Auth

Essa é ma API Rest mockada, utilizando json-server e JWT.

## 🛠️ Instalação

```bash
$ npm install
$ npm run start-api
```

## 🛠️ Como se registrar?

Você pode fazer isso efetuando uma requisição post para:

```
POST http://localhost:8000/public/cadastrar
```

Com os seguintes dados:

```
{
    "nome": "neilton seguins",
    "email": "neilton@alura.com.br",
    "senha": "123456",
}
```

Repare que o e-mail é um campo único e usuários com e-mails duplicados não serão persistidos.

## 🛠️ Como fazer login?

Você pode fazer isso efetuando uma requisição post para:

```
POST http://localhost:8000/public/login
```

Com os seguintes dados:

```
{
  "email": "neilton@alura.com.br",
  "senha":"123456"
}
```

Você vai receber um token no seguinte formato:

```
{
   "access_token": "<ACCESS_TOKEN>",
   "user": { ... dados do usuário ... }
}
```

## Autenticar próximas requests?

E então, adicionar este mesmo token ao header das próximas requisições:

```
Authorization: Bearer <ACCESS_TOKEN>
```

## 📚 Mais informações do curso

O Bytebank é um projeto utilizado durante toda a formação de React: Testando seu Front-end, e essa API será utilizada em alguns cursos :)
