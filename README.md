# Mini PSP

![title](https://github.com/jhogoforbroke/minipsp/blob/master/img/title.png?raw=true)

Serviço Provedor de Pagamentos

Execução de cobranças via cartão de crédio e débito, console de transações e agendamento de recebiveis

## Getting Started

Para iniciar o projeto:

``
npm start
``

Para iniciar em modo debug:

``
npm debugger
``

_A porta 7000 deve estar disponivel para o node inspect_


### Menu

![imgmenu](https://raw.githubusercontent.com/jhogoforbroke/minipsp/master/img/1.png)

### Realizar Transação

Criar nova transação de pagamento para Debito e Credito

![imgpayopc](https://raw.githubusercontent.com/jhogoforbroke/minipsp/master/img/2.png)


### Consultar Saldo

Consulta saldo de recebiveis e futuros lançamentos

![imgtopay](https://raw.githubusercontent.com/jhogoforbroke/minipsp/master/img/3.png)


### Prerequisitos

``
nodejs >=v10.14.2
npm >=6.5.0
``

### instalação

Para instalação das dependencias e pacotes:

``
npm install
``

## Executando os testes

Testes unitários:

``
npm test
``

## Construido com

* [PostgreSQL](https://www.postgresql.org/docs/) - PostgreSQL Database
* [Sequelize](https://sequelize.org/master/) - Sequelize ORM

* [inquirer](https://www.npmjs.com/package/inquirer#documentation) - Usado para interação via aplicação console

### Teste unitarios

* [chai](https://www.chaijs.com/) - Asertivas BDD e TDD para nodejs
* [sinon](https://sinonjs.org/releases/v7.4.1/) - Spies, Stubs e Mocks para nodejs

## Autores

* **Jonatas Marinho** - *versão Inicial* - [jhogoforboke](https://github.com/jhogoforboke)

## Licença

Este projeto esta sobre MIT License - [MIT](https://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT)
