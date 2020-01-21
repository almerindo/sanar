# Rodando a aplicação

Clonando a API:
```js
❯ git clone https://github.com/almerindo/sanar.git sanarDEMO

```

Entre no diretório que voce clonou do github, rode o yarn para verificar as dependencias 

```js
❯ cd ./sanar_clone/sanarPay/server

❯ yarn
```

Para zerar o banco de dados e iniciar a api:
```js
yarn dev:init
```

Para simplesmente rodar a api:
```js
yarn dev
```


# Testes da API
Agora rode os testes automatizados.
```js
❯ yarn test
```

Para interagir com a suite de testes:
```js
yarn test:watch
```

Para configurar o ambiente de testes, banco de dados, edite o arquivo .env.test conforme sua necessidade. Um exemplo do arquivo .env.test seria:


```properties
APP_URL=http://localhost:3333
NODE_ENV=development

# Auth

APP_SECRET=SANAR2020

# Database
DB_DIALECT=sqlite

# API mundipagg-nodejs
#sk_test_RYwm6wBcMjt387nb

MUNDI_PK=sk_test_JvxAOZeiKsowrGKB

```


# Usando a API com o Insomnias

1) Instale o ```Insomnia``` para fazer as requisições, import o arquivo de configuração ```JSON``` a no seu Insomnia

```js
ls ./sanar_clone/sanarPay/Insomnia_2020-01-20.json
```


# Para se logar:

Dentro da pasta ```SESSION``` Criar uma requisicao do tipo ```POST  ${base_url}/sessions``` com o corpo da mensagem http do tipo ```JSON``` no seguinte formato:
```js
 {
	"email": "admin@sanarflix.com.br", 
	"password": "1234567890"
 }
```
Ao clicar em ```Send```, deverá retornar algo como:
```js
{
  "customer": {
    "id": 0,
    "name": "Administrador",
    "email": "admin@sanarflix.com.br"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTc5NDc3NjcxLCJleHAiOjE1ODAwODI0NzF9.MF-vqtjN1wSuZkWcLzvF2hRE2PtJlP6J6IivBZfLBCY"
}
```
# Pra criar um usuário

Dentro da pasta ```CUSTOMER``` Criar uma requisicao do tipo ```POST  ${base_url}/customers``` com o corpo da mensagem http do tipo ```JSON``` no seguinte formato:
```js
 {
	"name": "Almerindo Rehem",
	"email": "almerindo.rehem@gmail.com",
	"password": "1234567890"
}
```
Ao clicar em ```Send```, deverá retornar algo como:
```js
{
  "id": 1,
  "name": "Almerindo Rehem",
  "email": "almerindo.rehem@gmail.com",
  "password": "1234567890",
  "remote_id": "cus_WM4KXxxc64t5K8GP",
  "updatedAt": "2020-01-20T00:21:21.520Z",
  "createdAt": "2020-01-20T00:21:20.030Z",
  "password_hash": "$2a$08$yZoBV29nKw9UVyVaiW18E.jf85CzxPVwpa5aKI/SmSr7ByCTqk6Mu",
  "canceled_at": null
}
```

# Para configurar as variáveis de ambiente do Insonminia

4) Clique em  ```CRTL + E ```, crie a variável ``` "base_url": "http://localhost:3333", "tokenAdmin": "COPIE O TOKEN GERADO" e "tokenUser": "COPIE TOKEN DE UM USUARIO"```, ficando assim:

```js
{
  "base_url": "http://localhost:3333",
  "tokenAdmin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTc5NDc3NjcxLCJleHAiOjE1ODAwODI0NzF9.MF-vqtjN1wSuZkWcLzvF2hRE2PtJlP6J6IivBZfLBCY",
  "tokenUser": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc5NDgwMTczLCJleHAiOjE1ODAwODQ5NzN9.VomeUe0bLugKPDdJb7mt6ty5Qs1Yx1LZYiEI9CN9zts"
}
```
# 
# Todas as outras requisições devem conter o token de autenticação
```js
 {
	 "card": {
        "number": "4011185771285580",
        "holder_name": "Tony Stark",
        "holder_document": "93095135270",
        "exp_month": 1,
        "exp_year": 20,
        "cvv": "651",
        "brand": "Mastercard",
        "private_label": false,
        "options": {
            "verify_card": true
        }
 	 }
 }
```

```js

{
  "card":{
      "number": "4000000000000010",
      "holder_name": "Tony Stark",
      "holder_document": "93095135270",
      "exp_month": 1,
      "exp_year": 20,
      "cvv": "351",
      "brand": "Mastercard",
      "private_label": false,
      "options": {
          "verify_card": true
      }
  }
}
```





# PARA CRIAÇÃO DE PLANOS QUE CORRESPONDAM AO DESAFIO DA SANAR FLIX.

# Para o caso 1  deverá ser enviado os seguintes dados:

```js
{
  "name": "Plano Standard",
  "currency": "BRL",
  "interval": "month",
  "interval_count": 1,
  "billing_type": "prepaid",
  "minimum_price": 2450,
  "installments": [1],
  "payment_methods":["credit_card","boleto"],
  "items": [
    {
      "name": "Sanar Flix",
      "quantity": 1,
      "pricing_scheme": {
        "price": 2450
      }
    }
   ]
  }
```
  # Para o caso 2
 
```js

{
  "name": "Plano Standard 7Days Trial",
  "currency": "BRL",
  "interval": "month",
  "interval_count": 1,
  "billing_type": "prepaid",
  "minimum_price": 2450,
  "installments": [1],
  "trial_period_days": 7,
  "payment_methods":["credit_card","boleto"],
  "items": [
    {
      "name": "Sanar Flix",
      "quantity": 1,
      "pricing_scheme": {
        "price": 2450
      }
    }
   ]
  }
 
 ```
 

  # Para o caso 3
  ```js

 {
  "name": "Plano Trimestral",
  "currency": "BRL",
  "interval": "month",
  "interval_count": 3,
  "billing_type": "prepaid",
  "minimum_price": 6990,
  "installments": [1],
  "payment_methods":["credit_card","boleto"],
  "items": [
    {
      "name": "Sanar Flix",
      "quantity": 1,
      "pricing_scheme": {
        "price": 6990
      }
    }
   ]
  }

```
# Para o caso 5 
```js

  {
  "name": "Promocional Sanarflix + Livro Yellowbook,",
  "currency": "BRL",
  "interval": "month",
  "interval_count": 1,
  "billing_type": "prepaid",
  "installments": [1],
  "payment_methods":["credit_card","boleto"],
  "items": [
    {
      "name": "Sanar Flix",
      "quantity": 1,
      "pricing_scheme": {
        "price": 2450
      }
    },
		 {
      "name": "Yellow Book",
      "cycles": 1,
      "quantity": 1,
      "pricing_scheme": {
        "price": 13990
      }
    }
   ]
  }
  ```