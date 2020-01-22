# Introdução
Essa API foi desenvolvida puramente com o intúito de resolver um desafio passado pela SanarFlix.

## Sobre o Desafio:
A Sanar está repaginando um de seus principais produtos, o Sanarflix. Uma plataforma de cursos online voltados aos estudantes e profissionais de medicina, que entrega mais de 1.000 conteúdos em diversos formatos e por apena R$ 24,50/mês. ​

Atualmente o Sanarflix usa como solução de pagamentos a MundiPagg, porém em uma versão antiga da API, disponível em https://docs-legacy.mundipagg.com/ ​

A MundiPagg apresentou uma nova API com diversas funcionalidades interessantes para serem aplicadas no Sanarflix, como a gestão de Planos, Assinaturas e o controle e manipulação das assinaturas vigentes de uma forma simplificada. ​

Disponível em https://docs.mundipagg.com/v1/reference ​

Com base nas informações apresentadas acima, desenvolva um serviço web RESTful para a integração entre o produto Sanarflix e a MundiPagg. ​

A API deve ser desenvolvida em alguma das seguintes linguagens: Javascript/Node.js, Python, Ruby, PHP, Clojure ou Go, e deve lidar com os seguintes casos: ​

1. Mario é um novo cliente que acabou de assinar o Sanarflix ​

2. Juliana assinou para testar o Sanarflix por 7 dias grátis, antes da primeira cobrança ​

3. Pedro assinou o Sanarflix Trimestral, por R$69,90 ​

4. Marcos teve um problema com o cartão de crédito e gostaria de alterar o cartão para a próxima cobrança ​

5. Luiz fez a assinatura na promoção do Sanarflix + Livro Yellowbook, por um valor de R$164,40 no primeiro mês e depois a assinatura normal de R$24,50 ​

6. Ricardo quer cancelar a assinatura do Sanarflix 

## Solução implementada nesta API
Após estudar a API da MundiPagG, chegamos à conclusão que para resolver o desafio, basta criar planos de assinaturas diferentes para cada caso.​

Ou seja, inicialmente um administrador ( usuário master da Sanarflix) criará 4 planos. __Somente o administrador__ poderá criar planos e precificá-lo.​ São eles:

 * Plano Standard – R$ 24, 50​

* Plano Standard 7Days Trial​

* Plano Trimestral​

* Promocional Sanarflix + Livro Yellowbook​

A API permite que um usuário crie sua conta, apenas informando seu e-mail e senha.​

A API permite que o usuário logado ( com token JWT) adicione um ou mais cartões em sua carteira virtual (Wallet)​


### Com usuário criado e com cartão cadastrado​

### Planos​

* ####  O usuário poderá assinar qualquer um dos planos existentes.​

* #### O usuário poderá cancelar sua assinatura de algum plano.​

* #### O usuário poderá alterar seu cartão de crédito, associado a uma assinatura de plano, para ser cobrado na próxima fatura.​

### Wallet​

* #### O usuário poderá adicionar cartões.​

* #### O usuário poderá listar seus cartões.​

* #### O usuário poderá apagar um cartão de sua assinatura.​


# Vídeos demonstrativos de como instalar, configurar e usar todo o ambiente e a API implementada: 
## Playlist no youtube só sobre o desafio SanarFlix, pode ser acessada em: https://www.youtube.com/playlist?list=PLWgTXjuvJE-bnv5mMhWWu3b5lWALBBTcn ou individualmente em cada um dos links a seguir conforme seu tema:
- [X] V1 - Introdução ao desafio da SANAR -> https://youtu.be/14SkrVDg-hc
- [X] V2 - Introdução ao Docker para rodar Postgresql -> https://youtu.be/g1_16AFXQfs
- [X] V3 - Introdução às estruturas do VSCode e os testes de integração -> https://youtu.be/b9rphiBXVuY
- [X] V4 - Introdução à estrutura da API, arquivos e pastas -> https://youtu.be/YvbiX4nG2lA
- [X] V5 - Explicando as rotas da API desenvolvida -> https://youtu.be/zo5C8RtIjfA
- [X] V6 - Introdução às chaves de acesso da MultipagG -> https://youtu.be/YZZ-EjpbwXI
- [X] V7 - Pegando a chave de teste da MultipagG -> https://youtu.be/FDjo3_-iNjs
- [X] V8 - Criando um Cliente e se logando com ele -> https://youtu.be/1XFwVXdJO0Y
- [X] V9 - Criando Planos de assinaturas com itens e preços -> https://youtu.be/u46uNc4mG5s
- [X] V10 - Criando os exemplos de uso passado no __Desafio__ -> https://youtu.be/jU7m2XPJ1iU
- [X] V11 - Mostra como agilizar os testes, cadastrando no Insomnia, os tokens em variáveis de ambiente -> https://youtu.be/z7wbh2MmT10
- [X] V12 - Mostra resolvendo o __Caso 1__: Mario assina o plano Standard -> https://youtu.be/NUODsKoPw6g
- [X] V13 - Mostra resolvendo o __Caso 2__: Juliana assina o plano Trial 7D -> https://youtu.be/cnBnnfbsw6o
- [X] V14 - Mostra resolvendo o __Caso 3__ e __Caso 5__: Pedro Assina o plano trimestral e Luiz assina o plano promocional -> https://youtu.be/I8aTL7p8Bmw
- [X] V15 - Mostra resolvendo o __Caso 6__: Ricardo cancela a assinatura -> https://youtu.be/VCPEdtT0CEQ
- [X] V16 - Mostra resolvendo o __Caso 4__: Marcos alterando a forma de pagamento de um plano -> https://youtu.be/24k5BvHm7Rg
- [X] V17 - Considerações sobre o desafio e agradecimentos -> https://youtu.be/G4S8gRoNFes

# Rodando a aplicação

## Clonando a API:
```js
❯ mkdir desafiosanar
❯ cd ./desafiosanar
❯ git clone https://github.com/almerindo/sanar.git sanarDEMO
```

Entre no diretório que voce clonou do github, rode o yarn para verificar as dependencias 

```js
❯ cd ./sanarDEMO/sanarPay/server/

❯ yarn
```

## Configurando a API
Você precisa configurar a chave de acesso da api MundiPagG, e as configuraçoes básicas de URL, porta, e de conexão com o banco de dados.

Altere o arquivo .env em __./sanarDEMO/sanarPay/server/__
```properties
APP_URL=http://localhost:3333
NODE_ENV=development

# Auth

APP_SECRET=SANAR2020

# Database

DB_HOST=localhost
DB_USER=postgres
DB_PASS=sanar
DB_NAME=sanar

# API mundipagg-nodejs
# sk_test_RYwm6wBcMjt387nb

MUNDI_PK=sk_test_vE9MplLfgfbp2NYr
```

### __Feito isso está pronto para rodar a API!__

__Use um desses dois comandos para executar__


Se quiser zerar o banco de dados e iniciar a api, digite:
```js
yarn dev:init
```
Ou

Para simplesmente rodar a api, digite:
```js
yarn dev
```


## Testes de integração da API

Para configurar o ambiente de testes, banco de dados, edite o arquivo .env.test conforme sua necessidade. 

Importante ressaltar que é aconselhável rodar os testes em um outro ambiente isolado. Então, você pode criar uma outra conta de testes na MundiPaG para todar os testes sem interferir na sua base de desenvolvimento.

Ao rodar os testes, a nossa API irá ler do arquivo de configuração .env.test. Ou seja, altere o arquivo .env.test em ./sanarDEMO/sanarPay/server/ conforme sua necessidade.

### Note que o banco de dados para os testes é o sqllite, e ele é apagado e reconstruíto todas as vezes que você roda a suite de teste.

__Um exemplo do arquivo .env.test seria:__

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



Agora rode os testes automatizados com o seguinte comando:
```js
❯ yarn test
```
Ou 

Para interagir com a suite de testes:
```js
yarn test:watch
```



# Usando a API com o Insomnia

1) Instale o ```Insomnia``` para fazer as requisições, import o arquivo de configuração ```JSON``` a no seu Insomnia

Arquivo está ao lado da pasta __server__, para listá-lo digite: 
```js
❯ ls ../Insomnia*  

```
Vai aparecer algo assim:
```
❯ ls ../Insomnia*
../Insomnia_2020-01-20.json
```

## Para se logar com o Insomnia:

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
## Pra criar um usuário usando o Insomnia:

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

## Para configurar as variáveis de ambiente do Insonminia

4) Clique em  ```CRTL + E ```, crie a variável ``` "base_url": "http://localhost:3333", "tokenAdmin": "COPIE O TOKEN GERADO" e "tokenUser": "COPIE TOKEN DE UM USUARIO"```, ficando assim:

```js
{
  "base_url": "http://localhost:3333",
  "tokenAdmin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTc5NDc3NjcxLCJleHAiOjE1ODAwODI0NzF9.MF-vqtjN1wSuZkWcLzvF2hRE2PtJlP6J6IivBZfLBCY",
  "tokenUser": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc5NDgwMTczLCJleHAiOjE1ODAwODQ5NzN9.VomeUe0bLugKPDdJb7mt6ty5Qs1Yx1LZYiEI9CN9zts"
}
```
### Todas as demais rotas da API exigem um token de autenticção válido.

# Exemplos de rotas e requisições com dados JSON para serem eviados para a API:

## POST /customers/wallet  - Rota para criar cartão de crédito na Wallet do usuário 

### Exemplo de dados a ser enviado no corpo da requisição:
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

### Caso deseje criar novos cartões de créditos para testar, user o link:

[Gerador de Cartões de Créditos 4 DEV] (https://www.4devs.com.br/gerador_de_numero_cartao_credito)


[Gerador de CPFs 4 DEV] (https://www.4devs.com.br/gerador_de_cpf)



## POST /plans  - Rota para criar plano de assinaturas 
__Obs! Somente o administrador pode cadastrar planos!__ 


### Para o caso 1  deverá ser enviado os seguintes dados:

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
  ### Para o caso 2
 
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
 

  ### Para o caso 3
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
### Para o caso 5 
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

 ## POST /customers/subscriptions - Para assinar um plano

 ### Exemplo de dados a ser enviado no corpo da requisição:

 ```js
{
	"plan_id":"plan_qReWwBOfGsO0zkr1",
	"payment_method":"credit_card",
	"card_id": "card_Ol1zG91UaTBnGBRa"
}
 ```
___O retorno seria algo do tipo:___

```js
{
  "id": "sub_36N2JAAc5ziOpBgD",
  "code": "RQ30TD4INZ",
  "start_at": "2020-01-21T00:00:00Z",
  "interval": "month",
  "interval_count": 1,
  "billing_type": "prepaid",
  "current_cycle": {
    "start_at": "2020-01-21T00:00:00Z",
    "end_at": "2020-02-20T23:59:59Z",
    "id": "cycle_AdovM6vu5pfxMbnE",
    "billing_at": "2020-01-21T00:00:00Z",
    "subscription": null,
    "status": "billed",
    "duration": null,
    "created_at": null,
    "updated_at": null,
    "cycle": 1
  },
  "payment_method": "credit_card",
  "currency": "BRL",
  "installments": 1,
  "status": "failed",
  "created_at": "2020-01-21T15:55:51Z",
  "updated_at": "2020-01-21T15:55:51Z",
  "customer": {
    "id": "cus_0k4gdV0hJCDmMDvE",
    "name": "Marcos Santana",
    "email": "marcossantana@gmail.com",
    "delinquent": false,
    "created_at": "2020-01-21T14:59:09Z",
    "updated_at": "2020-01-21T14:59:09Z",
    "document": null,
    "type": null,
    "fb_access_token": null,
    "address": null,
    "metadata": null,
    "phones": {
      "home_phone": null,
      "mobile_phone": null
    },
    "fb_id": null,
    "code": "4"
  },
  "card": {
    "id": "card_Ol1zG91UaTBnGBRa",
    "last_four_digits": "0347",
    "brand": "Mastercard",
    "holder_name": "Marcos Santana",
    "exp_month": 3,
    "exp_year": 2021,
    "status": "active",
    "created_at": "2020-01-21T15:47:31Z",
    "updated_at": "2020-01-21T15:49:13Z",
    "billing_address": null,
    "customer": null,
    "metadata": null,
    "type": "credit",
    "holder_document": null,
    "deleted_at": null,
    "first_six_digits": "559590"
  },
  "items": [
    {
      "id": "si_O6QJkEzYFrt1Mxjb",
      "description": "Sanar Flix",
      "status": "active",
      "created_at": "2020-01-21T15:55:51Z",
      "updated_at": "2020-01-21T15:55:51Z",
      "pricing_scheme": {
        "price": 2450,
        "scheme_type": "unit",
        "minimum_price": null
      },
      "subscription": null,
      "name": "Sanar Flix",
      "quantity": 1,
      "cycles": null,
      "deleted_at": null
    }
  ],
  "statement_descriptor": null,
  "metadata": null,
  "setup": null,
  "gateway_affiliation_id": null,
  "next_billing_at": "2020-02-21T00:00:00Z",
  "billing_day": null,
  "minimum_price": 2450,
  "canceled_at": null,
  "boleto_due_days": null
}
```

## DELETE /customers/subscriptions - Cancelar uma assinatura

 ### Exemplo de dados a ser enviado no corpo da requisição:

 ```js
{
	"subscriptionId":"sub_81aO5lrkUdURAWG7"
}
 ```
___O retorno seria algo do tipo:___

```js
{
  "id": 7,
  "remote_id": "sub_81aO5lrkUdURAWG7",
  "customer_id": 4,
  "plan_id": 2,
  "canceled_at": "2020-01-21T15:54:46.638Z",
  "createdAt": "2020-01-21T15:49:14.239Z",
  "updatedAt": "2020-01-21T15:54:46.638Z"
}
```

## PUT /customers/subscriptions - Alterar meio de pagamento de uma assinatura

 ### Exemplo de dados a ser enviado no corpo da requisição:

 ```js
{
	"subscription_id":"sub_36N2JAAc5ziOpBgD",
	"payment_method":"credit_card",
	"card_id": "card_vpN6WVksdzub3ea8"
}
 ```
___O retorno seria algo do tipo:___

```js
{
  "subscription_id": "sub_36N2JAAc5ziOpBgD",
  "new_card_id": "card_vpN6WVksdzub3ea8",
  "cardFirstSixDigits": "444350",
  "cardLastFourDigits": "9563"
}
```

## GET /customers/subscriptions - retornar uma determinada assinatura

 ### Exemplo de dados a ser enviado no corpo da requisição:

```js
{
	"subscriptionId":"sub_36N2JAAc5ziOpBgD"
}
```
___O retorno seria algo do tipo:___

```js
{
  "id": "sub_mODa64wU1QU2AB2W",
  "code": "DZOSPPA914",
  "start_at": "2020-01-21T00:00:00Z",
  "interval": "month",
  "interval_count": 1,
  "billing_type": "prepaid",
  "current_cycle": {
    "start_at": "2020-01-21T00:00:00Z",
    "end_at": "2020-02-20T23:59:59Z",
    "id": "cycle_NxgOAxslmTA97Lom",
    "billing_at": "2020-01-21T00:00:00Z",
    "subscription": null,
    "status": "billed",
    "duration": null,
    "created_at": null,
    "updated_at": null,
    "cycle": 1
  },
  "payment_method": "credit_card",
  "currency": "BRL",
  "installments": 1,
  "status": "failed",
  "created_at": "2020-01-21T17:39:11Z",
  "updated_at": "2020-01-21T17:39:11Z",
  "customer": {
    "id": "cus_3kWDwZkF4iQg0oaM",
    "name": "Ricardo Azevedo",
    "email": "ricardoazevedo@gmail.com",
    "delinquent": false,
    "created_at": "2020-01-21T14:59:48Z",
    "updated_at": "2020-01-21T14:59:48Z",
    "document": null,
    "type": null,
    "fb_access_token": null,
    "address": null,
    "metadata": null,
    "phones": {
      "home_phone": null,
      "mobile_phone": null
    },
    "fb_id": null,
    "code": "6"
  },
  "card": {
    "id": "card_eQz0vQJtnFY4LxqA",
    "last_four_digits": "2645",
    "brand": "Mastercard",
    "holder_name": "Ricardo Azevedo",
    "exp_month": 9,
    "exp_year": 2020,
    "status": "active",
    "created_at": "2020-01-21T15:37:02Z",
    "updated_at": "2020-01-21T15:38:58Z",
    "billing_address": null,
    "customer": null,
    "metadata": null,
    "type": "credit",
    "holder_document": null,
    "deleted_at": null,
    "first_six_digits": "540583"
  },
  "items": [
    {
      "id": "si_VnBaxRAIwpUGN6v0",
      "description": "Sanar Flix",
      "status": "active",
      "created_at": "2020-01-21T17:39:11Z",
      "updated_at": "2020-01-21T17:39:11Z",
      "pricing_scheme": {
        "price": 2450,
        "scheme_type": "unit",
        "minimum_price": null
      },
      "subscription": null,
      "name": "Sanar Flix",
      "quantity": 1,
      "cycles": null,
      "deleted_at": null
    }
  ],
  "statement_descriptor": null,
  "metadata": null,
  "setup": null,
  "gateway_affiliation_id": null,
  "next_billing_at": "2020-02-21T00:00:00Z",
  "billing_day": null,
  "minimum_price": 2450,
  "canceled_at": null,
  "boleto_due_days": null
}
```
