# Rodando a aplicação
```js
yarn sequelize db:migrate

```

```js
yarn dev

```

# Para rodar os testes de integração

```js
yarn test

```

# Usando a API 

1) Instale o ```Insomnia``` para fazer as requisições, copie os dados de configuração ```JSON``` a seguir e importe no seu Insomnia.
```js
{"_type":"export","__export_format":4,"__export_date":"2020-01-20T00:10:57.865Z","__export_source":"insomnia.desktop.app:v7.0.6","resources":[{"_id":"req_3c2a164e944245d2a8137ece664a8630","authentication":{},"body":{"mimeType":"application/json","text":"{\n\t\"email\": \"admin@sanarflix.com.br\", \n\t\"password\": \"1234567890\"\n}"},"created":1579386172990,"description":"","headers":[{"id":"pair_b5ed6c8b8f8c4cf79a41f6b24a8c6c45","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579386172990,"method":"POST","modified":1579478015944,"name":"CREATE","parameters":[],"parentId":"fld_a6d24b4714ae4cad912a69babe279d57","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/sessions","_type":"request"},{"_id":"fld_a6d24b4714ae4cad912a69babe279d57","created":1579386162272,"description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1579403644473,"modified":1579444211150,"name":"SESSION","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"request_group"},{"_id":"wrk_0a849ac5eba74f58938d98841f722072","created":1579293185627,"description":"","modified":1579293185627,"name":"SANAR_FLIX","parentId":null,"_type":"workspace"},{"_id":"req_07e71f9075304418860338277a0bfbaf","authentication":{"type":"bearer"},"body":{"mimeType":"application/json","text":"{\n\t\"name\": \"Almerindo Rehem\",\n\t\"email\": \"almerindo.rehem@gmail.com\",\n\t\"password\": \"1234567890\"\n}"},"created":1579386298668,"description":"","headers":[{"id":"pair_91f23e890ccf4fe1964ea061d137d9c4","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579386298668,"method":"POST","modified":1579451095919,"name":"CREATE","parameters":[],"parentId":"fld_f3c8a993909b45dcb2cf211132ee1caf","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers","_type":"request"},{"_id":"fld_f3c8a993909b45dcb2cf211132ee1caf","created":1579386332402,"description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1579403644448,"modified":1579444246211,"name":"CUSTOMER","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"request_group"},{"_id":"req_43542ea2a0f546f1a4ce69c66921ead9","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{"mimeType":"application/json","text":"{\n\t\"name\": \"Game TTAir\",\n\t\"oldpassword\":\"1234567890\",\n\t\"password\": \"1234567890\",\n\t\t\"remote_id\":\"XXXXXXX\",\n\t\"cards\": [\n\t\t\t{\"card01\":\"123\"},\n\t\t\t{\"card02\":\"1223\"}\n\t],\n\t\"subscriptions\": [\t{\"card01\":\"123\"},\n\t\t\t{\"card02\":\"1223\"}\n]\n\t\n\t\n}"},"created":1579387338706,"description":"","headers":[{"id":"pair_91f23e890ccf4fe1964ea061d137d9c4","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579386235829,"method":"PUT","modified":1579447500546,"name":"UPDATE","parameters":[],"parentId":"fld_f3c8a993909b45dcb2cf211132ee1caf","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers","_type":"request"},{"_id":"req_7cd4d463e7d44b1995276706d2c11412","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{"mimeType":"application/json","text":"{\n\t\"password\": \"1234567890\"\n}"},"created":1579387383725,"description":"","headers":[{"id":"pair_512ec6ee3bce48f49007fb80060093ad","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579386204409.5,"method":"DELETE","modified":1579462193767,"name":"DELETE","parameters":[],"parentId":"fld_f3c8a993909b45dcb2cf211132ee1caf","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers/2","_type":"request"},{"_id":"req_e6741e8816674469917aa5947951488b","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{},"created":1579476574264,"description":"","headers":[],"isPrivate":false,"metaSortKey":-1579403644435.5,"method":"GET","modified":1579476632992,"name":"GET SUBSCRIPTIONS","parameters":[],"parentId":"wrk_0a849ac5eba74f58938d98841f722072","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers/subscriptions","_type":"request"},{"_id":"req_d72cc952371248a1af5d33ff2c468d46","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{"mimeType":"application/json","text":" {\n\t \"card\": {\n\t\t \"number\": \"4000000000000010\",\n\t\t \"holder_name\": \"Tony Stark\",\n\t\t \"holder_document\":\"93095135270\",\n\t\t \"exp_month\": \"1\",\n\t\t \"exp_year\": \"25\",\n\t\t \"cvv\": \"351\"\n \t }\n }\n"},"created":1579403666653,"description":"","headers":[{"id":"pair_c11e418fdcc648daaa08e306d9f544ad","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579403666654,"method":"POST","modified":1579455777852,"name":"CREATE","parameters":[],"parentId":"fld_1fdda25bfb53481c9e2f60ebf34013e4","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers/wallet","_type":"request"},{"_id":"fld_1fdda25bfb53481c9e2f60ebf34013e4","created":1579403644423,"description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1579403644423,"modified":1579403644423,"name":"WALLET","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"request_group"},{"_id":"req_50fbfe35cab6467692a2abd29f71af50","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{"mimeType":"application/json","text":"\t {\n\t\t \"card\": {\n\t\t\t \"remote_id\": \"card_ywovDwxi1mFEaMp2\"\n \t \t\t}\n\t }"},"created":1579403924990,"description":"","headers":[{"id":"pair_eb445099df584f749cc3c67d0564b8dd","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579393009866.5,"method":"DELETE","modified":1579461905320,"name":"DELETE","parameters":[],"parentId":"fld_1fdda25bfb53481c9e2f60ebf34013e4","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers/wallet","_type":"request"},{"_id":"req_ae2e553c1f754b5ca4ecfb0a4df10f40","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{},"created":1579403950865,"description":"","headers":[],"isPrivate":false,"metaSortKey":-1579391233735.25,"method":"GET","modified":1579403956712,"name":"INDEX","parameters":[],"parentId":"fld_1fdda25bfb53481c9e2f60ebf34013e4","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/customers/wallet","_type":"request"},{"_id":"req_8906d350509d422e84a75b16b756f103","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{"mimeType":"application/json","text":"\n  {\n  \"name\": \"Promocional Sanarflix + Livro Yellowbook,\",\n  \"currency\": \"BRL\",\n  \"interval\": \"month\",\n  \"interval_count\": 1,\n  \"billing_type\": \"prepaid\",\n  \"installments\": [1],\n  \"payment_methods\":[\"credit_card\",\"boleto\"],\n  \"items\": [\n    {\n      \"name\": \"Sanar Flix\",\n      \"quantity\": 1,\n      \"pricing_scheme\": {\n        \"price\": 2450\n      }\n    },\n\t\t {\n      \"name\": \"Yellow Book\",\n      \"cycles\": 1,\n      \"quantity\": 1,\n      \"pricing_scheme\": {\n        \"price\": 16440\n      }\n    }\n   ]\n  }"},"created":1579293713541,"description":"","headers":[{"id":"pair_79973ef313184d40820fd7bbdab70030","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579293716501,"method":"POST","modified":1579476517460,"name":"Create","parameters":[],"parentId":"fld_c5fa104a623e488ab37fd6a638a04be2","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/plans","_type":"request"},{"_id":"fld_c5fa104a623e488ab37fd6a638a04be2","created":1579293719461,"description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1579341520557.5,"modified":1579387467324,"name":"PLAN","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"request_group"},{"_id":"req_d10e339f1be0434ab521dcd1c7c5ab7f","authentication":{},"body":{},"created":1579387518548,"description":"","headers":[],"isPrivate":false,"metaSortKey":-1579115518930,"method":"GET","modified":1579387521505,"name":"GET","parameters":[],"parentId":"fld_c5fa104a623e488ab37fd6a638a04be2","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/plans","_type":"request"},{"_id":"req_ff23b7c286f0407f9d2980771ebe3fe9","authentication":{"token":"{{ token  }}","type":"bearer"},"body":{},"created":1579387546402,"description":"","headers":[],"isPrivate":false,"metaSortKey":-1579026420144.5,"method":"DELETE","modified":1579474485724,"name":"DELETE","parameters":[],"parentId":"fld_c5fa104a623e488ab37fd6a638a04be2","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/plans/plan_ekEmR08FN6C9PZD3","_type":"request"},{"_id":"req_4bb16c7c01dc4ad4a3d6e97a7490ffed","authentication":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc5MzkyMDA3LCJleHAiOjE1Nzk5OTY4MDd9.HatGNc-buPoyeNfaUW7d9vACNBhEuGf8Pz9YPubR-tQ","type":"bearer"},"body":{"mimeType":"application/json","text":"{\n    \"plan_id\": \"plan_yOlmVvgFxcyOn5KG\",\n    \"payment_method\": \"credit_card\",\n     \"boleto_due_days\":5,\n    \"card\": {\n        \"holder_name\": \"Tony Stark\",\n        \"number\": \"4000000000000010\",\n        \"exp_month\": 1,\n        \"exp_year\": 22,\n        \"cvv\": 903\n    },\n   \n    \"metadata\": {\n        \"id\": \"my_subscription_id\"\n    }\n}"},"created":1579296891069,"description":"","headers":[{"id":"pair_fed994c4301e4fbd990bbc46af3dfb6f","name":"Content-Type","value":"application/json"}],"isPrivate":false,"metaSortKey":-1579296891069,"method":"POST","modified":1579400559895,"name":"CREATE","parameters":[],"parentId":"fld_216484082efa43a6a4df4946eef6c7c5","settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingFollowRedirects":"global","settingRebuildPath":true,"settingSendCookies":true,"settingStoreCookies":true,"url":"{{ base_url  }}/subscriptions","_type":"request"},{"_id":"fld_216484082efa43a6a4df4946eef6c7c5","created":1579296878843,"description":"","environment":{},"environmentPropertyOrder":null,"metaSortKey":-1579296878843,"modified":1579296878843,"name":"SUBSCRIBER","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"request_group"},{"_id":"env_f124180c450460f4c25b87bfb78dfaeae89c747e","color":null,"created":1579293185767,"data":{"base_url":"http://localhost:3333","tokenAdmin":"","tokenUser":""},"dataPropertyOrder":{"&":["base_url","tokenAdmin","tokenUser"]},"isPrivate":false,"metaSortKey":1579293185767,"modified":1579478286173,"name":"Base Environment","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"environment"},{"_id":"jar_f124180c450460f4c25b87bfb78dfaeae89c747e","cookies":[],"created":1579293185769,"modified":1579293185769,"name":"Default Jar","parentId":"wrk_0a849ac5eba74f58938d98841f722072","_type":"cookie_jar"}]}
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
```

```js

{
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
  "minimum_price": 6990,
  "installments": [1],
  "trial_period_days": 7,
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
        "price": 16440
      }
    }
   ]
  }
  ```