# 💻 Projeto
Esse projeto foi desenvolvido como Trabalho de Conclusão de Curso(TCC) para a Faculdade IMED Passo Fundo. Com este projeto me foi proporcionado não apenas aprender mas também botar em prática conceitos sobre o React Native, como iniciar um projeto utilizando Expo, Firebase, gerenciamento das rotas no aplicativo, AsyncStorange para manipulação dos dados na memória, boas práticas, componentização, comportamentos diferentes para diferentes SOs e trabalhar com diferentes tamanhos de telas e imagens/icons.

## 🚧 Objetivo do Projeto
O MyBus é um aplicativo B2B2C, onde os clientes(passageiros) podem monitorar as informações e a localização dos seus ônibus em RealTime. O aplicativo possui 2 principais clientes, o passageiro e a empresa.

### Passageiro
O passageiro pode monitorar a localização do veículo desejado em tempo real junto com as informações(se possui wi-fi, preço, banheiro, adaptação necessária para deficientes, ...). Pode-se visualizar tanto veículos públicos(fornecidos pela prefeitura) quanto veículos privados(a partir do código do veículo) juntamente com suas paradas(estações pelas quais o veículo irá passar). O usuário também pode deixar sua opinião sobre o veículo(que será listada para a empresa) e o aplicativo.

### Empresa
A empresa pode monitorar o status de seus veículos, criar novos veículos, selecionar os pontos por onde esses veículos irão passar, editar informações sobre seus veículos e visualizar feedbacks a respeito de seus veículos. 

### Motorista
Há um login para motoristas, onde essa sessão direcionada para motoristas dos veículos tem o objetivo de apenas logar (com placa do veículo e senha gerada automaticamente quando criado o veículo) e compartilhar a sua localização em tempo real, podendo editar as informações do veículo assim como a empresa.


## 🧪 Tecnologias
As principais tecnologias utilizadas foram:
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/docs)
- [Expo](https://expo.io/)
- [NodeJS](https://nodejs.org/en/)


## 🛠️ Configurando o ambiente
 - Use a versão 14.16.0 do nodeJS
 - Clone o repositório
 - Execute o comando `npm install --global expo-cli`
 - Instale as dependências com `npm install` ou `yarn install`
 - Adicione a configuração do seu database(firebase) no arquivo `FirebaseConfiguration.js` dentro da pasta `src/database`
 - Baixe o Expo Go em seu dispositivo mobile


## 🚀 Getting started
Para startar o projeto você pode digitar o comando `npm start` ou `yarn start` no diretório do projeto.

Após isso ele irá abrir uma aba no seu navegador padrão com um QRCode, basta apenas escanear com seu smartphone que você poderá acessar o App.


## 📜 Licença
Esse projeto está sob a licença GNU Affero General Public License v3.0. Veja o arquivo [LICENSE](https://github.com/paulodaluz/MyBus/blob/main/LICENSE) para mais detalhes.

---

<p align="center">Made with 💜 by Paulo da Luz</p>

