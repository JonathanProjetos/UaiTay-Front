# Contrato atual da API

Este documento registra o contrato usado pelo front-end UaiTay com o back-end Uaitay-Back.

## Configuração

- Front-end: `NEXT_PUBLIC_API_URL` aponta para a base da API.
- Back-end local esperado: `http://localhost:3001`.
- O front envia cookies nas requisições com `withCredentials: true`.

## Autenticação

- `POST /login`
  - Payload: `{ "email": string }`
  - Resposta de sucesso usada pelo front: `{ "menssage": "Ok", "token": string }`
  - Observação: `menssage` está com essa grafia no contrato atual e não deve ser alterado sem migração.

- `GET /login/validate`
  - Usa cookie `token`.
  - Resposta de sucesso usada pelo front: `{ "message": "ok" }`

## Produtos

- `GET /menu`
  - Retorna a lista de produtos.
  - Campos usados pelo front: `_id`, `name`, `price`, `category`.

- `POST /create-product`
  - Payload: `{ "name": string, "price": number, "category": string }`
  - Requer autenticação.

- `DELETE /delete-product`
  - Payload no body: `{ "name": string }`
  - Requer autenticação.

- `PATCH /update-product`
  - Payload: `{ "name": string, "price": number }`
  - Requer autenticação.

## Pedidos

- `GET /orders`
  - Retorna a lista de pedidos.

- `GET /order/:id`
  - Retorna um pedido pelo `_id`.

- `POST /create-order`
  - Payload enviado pelo front:
    - `customer`: string
    - `address`: string
    - `number`: number
    - `district`: string
    - `city`: string
    - `complement`: string
    - `phone`: string
    - `payment`: string
    - `discount`: string
    - `checkedDiscount`: boolean
    - `discountPercent`: number
    - `totalDiscounts`: number
    - `priceWithDiscount`: number
    - `order`: array de produtos
    - `total`: number
    - `date`: string no formato `dd-mm-aaaa`
    - `hours`: string no formato `hh:mm:ss`

## Regras de preservação

- Não alterar rotas sem migração coordenada.
- Não alterar nomes de campos do payload sem migração coordenada.
- Não alterar a grafia de campos já consumidos pelo front, como `menssage`, sem compatibilidade temporária.
- Não alterar o formato de `date` e `hours` sem atualizar validação, persistência e exibição.
