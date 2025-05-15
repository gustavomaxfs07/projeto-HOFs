#Documentação do Projeto: Sistema de Gestão de Funcionários

Visão Geral: Este projeto é uma aplicação web front-end desenvolvida com JavaScript puro, voltada para a gestão de funcionários.
A ideia da aplicação surgiu na curiosidade de entender melhor as "Higher Order Functions" do JS, sem objetivo de layouts responsivos, apenas uma aplicação funcional. Entretando, aprendi bem mais sobre modularização de código semantica e lógica.

A plicação conta com:
  Função de adicionar funcionários
  Visualização de uma lista
  Gerar gráficos com dados salariais e setoriais
  Criar relatórios gerais.
  Exportar os dados de todos os funcionários em JSON

Arquitetura e Tecnologias
  Tecnologias Utilizadas:
    HTML5, CSS3 & Javascript
    JavaScript ES Modules
    Bootstrap 5.3 (para loading e paginação)
    Chart.js (para gráficos)
    Modularização via ES6 import/export

Organização Geral:

	  projeto-hofs_01/
	  ├── index.html
	  ├── main.js
	  ├── router.js
	  └── src/
	      ├── assets/
	      │   └── styles/
	      │       └── style.css
	      ├── data/
	      │   └── employee.js (Lista de funcionários mokado)
	      ├── modules/
	      │   ├── addemployee.js
	      │   ├── exportjson.js
	      │   └── loadingInterface.js
	      └── pages/
	          ├── graphic/
	          │   └── pageGraphics.js
	          │   └── chart.js
	          │   └── routerGraphics.js
	          ├── table/
	          │   └── pageTable.js
	          |   └── pagination.js
	          |   └── sortfor.js
	          └── pageReport.js

Observações:
  O projeto é bem simples com diversos pontos a melhorar ou acrescentar, mas está bem funcional para o que foi criado.
