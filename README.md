# Uaitay-Comida Chinesa (Front)
O Uaitay-Front é um aplicativo dinâmico desenvolvido com Next.js, dedicado a atender às necessidades de pedidos originados fora do catálogo convencional do iFood. Com a capacidade de gerar o catálogo completo de produtos da loja, criar ordens de serviço e coletar informações essenciais do cliente para a entrega, o Uaitay-Front oferece uma solução eficiente e integrada. No final do processo, você terá a facilidade de imprimir um demonstrativo detalhado. 

</details>

## Sumário
- [Bem-vindo ao UaiTay Comida Chinesa](#Uaitay-Comida-Chinesa-(Front))
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
  
## Contexto
A aplicação espera atender a dois tipos de stakeholders: Os usuários e um administrador.

#### administrador
- Fazer login;
- Criar ordem de pedido;
- Imprimir pedido;
- Criar novos produtos;
- Criar ordem de pedido;
- Atualizar um produto;
- Deletar um produto;
- Buscar pedido pelo seu ID;
- Buscar por todos os pedidos;
- Imprimir pedido;

#### usuário
- Criar ordem de pedido;
- Buscar pedido pelo seu ID;
- Buscar por todos os pedidos;
- Imprimir pedido;

## Tecnologias e Ferramentas Utilizadas

Este projeto utiliza as seguintes tecnologias e ferramentas:

- [Next.js](https://nextjs.org/docs) | Framework para React. 
- [MaterialUi](https://mui.com/material-ui/) | Biblioteca de componentes de estilo para React.
- [Axios](https://axios-http.com/ptbr/docs/api_intro) | Biblioteca em JavaScript que lida com requisições HTTP.
- [React-toastify](https://fkhadra.github.io/react-toastify/introduction) | Biblioteca React que lida com notificações.

O Next.js é um framework de desenvolvimento web para React.js que simplifica e acelera a criação de aplicativos web modernos. Ele oferece recursos poderosos, como roteamento automático, pré-renderização, carregamento otimizado de páginas, suporte a CSS modular, entre outros.O Material-UI fornece uma variedade de componentes reutilizáveis, como botões, barras de navegação, caixas de diálogo, entre outros, que seguem as diretrizes visuais e de interação do Material Design. O Axios é uma biblioteca popular em JavaScript, geralmente utilizada em ambientes de navegador ou em Node.js, para fazer requisições HTTP. Ele fornece uma interface fácil de usar para realizar solicitações tanto para servidores HTTP como para APIs. O React-toastify é uma biblioteca para React que facilita a criação e exibição de notificações (toasts) de forma simples e personalizável em aplicações web. Essas notificações são frequentemente utilizadas para informar o usuário sobre eventos, mensagens de sucesso, erro ou qualquer outra informação relevante durante a interação com a aplicação. 

## Instalação e Execução
### Download do projeto
```
git@github.com:JonathanProjetos/UaiTay-Front.git
```
### Arquivo env
- Dentro da pasta Uaitay-Front, existe o arquivo .env.example. Nele, será necessário remover o .example caso queira executar na máquina local. O arquivo .env precisa receber a URL da API Uaitay-Back.

### Instalar dependências
```
cd Uaitay-Front
npm install
npm run dev
```

### Git, GitHub e Histórico de Commits
Este projeto utilizou a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli) para ajudar a seguir a convenção de commits. É importante utilizar a convenção de commits em projetos para manter o histórico de commits organizado e facilitar a leitura e o entendimento do que foi desenvolvido.
