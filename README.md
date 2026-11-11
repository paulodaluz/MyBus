# MyBus

Aplicativo mobile B2B2C desenvolvido como TCC na Faculdade IMED Passo Fundo. Reúne passageiros, empresas e motoristas para consultar veículos e paradas, compartilhar localização e registrar feedbacks, usando Firebase e React Native.

[![Node.js](https://img.shields.io/badge/Node.js-24.20.0-blue)](https://nodejs.org/) [![Expo](https://img.shields.io/badge/Expo-54-blue)](https://docs.expo.dev/) [![License](https://img.shields.io/badge/License-AGPL--3.0-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Passageiro: consulta veículos públicos ou privados e seus pontos, localização e características; envia feedbacks.
- Empresa: cadastra e edita veículos, organiza pontos e acompanha feedbacks.
- Motorista: entra com dados do veículo e compartilha sua localização.
- Autenticação com Firebase Authentication, dados no Firestore e localização no Realtime Database.
- Persistência local com AsyncStorage e lembretes/notificações. A verificação visual dos fluxos em dispositivo permanece separada dos testes unitários.

<a id="technologies"></a>

## 🧪 Technologies

Versões declaradas em `package.json`; os intervalos são preservados, e `package-lock.json` fixa a resolução usada por `npm ci`.

| Tecnologia                                                              | Versão declarada     | Finalidade                          |
| ----------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| [Node.js](https://nodejs.org/)                                          | `24.20.0`            | Runtime em `engines`, `.nvmrc` e CI |
| [Expo](https://docs.expo.dev/)                                          | `~54.0.0`            | CLI local e integração nativa       |
| [React Native](https://reactnative.dev/) / [React](https://react.dev/)  | `0.81.5` / `19.1.0`  | Interface mobile                    |
| [Firebase](https://firebase.google.com/docs)                            | `^12.18.0`           | Autenticação e persistência         |
| [TypeScript](https://www.typescriptlang.org/docs/)                      | `5.9.3`              | Verificação de tipos                |
| [Jest](https://jestjs.io/) / [Husky](https://typicode.github.io/husky/) | `^29.7.0` / `^9.1.7` | Testes e hooks                      |

<a id="environment-setup"></a>

## 🛠️ Environment setup

Use Git, npm e Node na versão do projeto. Para instalação pelo [nvm](https://github.com/nvm-sh/nvm):

```bash
git clone https://github.com/paulodaluz/MyBus.git
cd MyBus
nvm install
nvm use
npm ci
cp .env.example .env
```

`npm ci` executa `prepare: husky`, que ativa `.husky/`. O pre-commit executa lint-staged e testes com cobertura; o commit-msg executa Commitlint. `.husky/node-version.sh` seleciona `.nvmrc`. As ferramentas são dependências locais.

Crie um projeto Firebase de testes próprio e habilite Email/Password, Firestore e Realtime Database. Em `.env`, use as configurações públicas do seu aplicativo Web:

| Variável                                   | Uso                                                    |
| ------------------------------------------ | ------------------------------------------------------ |
| `EXPO_PUBLIC_FIREBASE_API_KEY`             | Chave pública do aplicativo; obrigatória               |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Domínio de autenticação; obrigatório                   |
| `EXPO_PUBLIC_FIREBASE_DATABASE_URL`        | URL do Realtime Database; obrigatória                  |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID`          | Identificador do projeto; obrigatório                  |
| `EXPO_PUBLIC_FIREBASE_APP_ID`              | Identificador do aplicativo; obrigatório               |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Bucket opcional na configuração                        |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Remetente opcional na configuração                     |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`          | Chave de Maps SDK for Android usada em `app.config.js` |

As cinco primeiras variáveis são verificadas em `src/database/FirebaseConfiguration.js`. Exemplo fictício de projeto: `meu-mybus-teste`; use os valores reais somente no seu `.env` local. `EXPO_PUBLIC_*` entra no bundle e não deve conter credenciais administrativas. Reinicie o Metro após mudar o ambiente.

Restrinja a chave Maps ao aplicativo e certificado e revise as regras Firebase versionadas antes de usar um projeto próprio. O modo E2E opcional lê `EXPO_PUBLIC_FIREBASE_EMULATOR_HOST`, mas exige o identificador `demo-mybus`; sua infraestrutura não foi iniciada nesta tarefa.

<a id="getting-started"></a>

## 🚀 Getting started

```bash
npm start
```

O Expo inicia o Metro e informa no terminal a URL/QR code. O projeto não fixa porta no script `start`; a documentação Android utiliza Metro em `8081`. Use um dispositivo/build compatível com Expo SDK 54 e os módulos nativos do projeto. `npm run android` e `npm run ios` abrem os respectivos destinos quando o ambiente nativo já está disponível; não equivalem a gerar um APK/IPA.

Não há script `build` genérico. O procedimento Android é [Android-Build.md](documentation/Android-Build.md), que exige JDK 21, Android SDK e dependências nativas. A exportação JavaScript usada na CI é:

```bash
npx --no-install expo export --platform android --output-dir dist/android
```

Exportar o bundle não valida instalação, mapas ou notificações no aparelho. Nesta tarefa, o aplicativo mobile fica sem imagens para revisão posterior.

<a id="project-structure"></a>

## 🗂️ Project structure

| Caminho                                       | Responsabilidade                          |
| --------------------------------------------- | ----------------------------------------- |
| `App.js`, `src/routes.tsx`, `src/navigation/` | Entrada e navegação                       |
| `src/pages/`                                  | Telas dos perfis                          |
| `src/service/`, `src/backend/`                | Operações dos usuários e veículos         |
| `src/database/`                               | Inicialização e validação do Firebase     |
| `src/hooks/`, `src/styles/`, `src/assets/`    | Estado compartilhado e apresentação       |
| `__tests__/`, `test-support/`                 | Suítes e suportes isolados                |
| `firebase/`, `e2e/`, `.maestro/`, `scripts/`  | Regras e procedimentos de validação       |
| `documentation/`                              | Diagramas, build e histórico de validação |

Consulte [CI](documentation/CI.md), [baseline de qualidade](documentation/quality-baseline.md), [E2E Android](documentation/E2E-Android.md), [matriz visual](documentation/mobile-visual-matrix.md), [fluxograma](documentation/Fluxo/Fluxo.drawio) e [modelo de dados](documentation/Database/Database%20MyBus.drawio).

<a id="testing-and-quality"></a>

## ✅ Testing and quality

| Comando                                     | Verificação                                |
| ------------------------------------------- | ------------------------------------------ |
| `npm run typecheck`                         | TypeScript sem emissão                     |
| `npm test -- --runInBand`                   | Testes Jest                                |
| `npm run test:coverage -- --ci --runInBand` | Cobertura, com meta global de 100% no Jest |
| `npm run lint`                              | ESLint sem correções                       |
| `npm run format:check`                      | Prettier sem modificar arquivos            |
| `npm run lint:fix`, `npm run format`        | Correções automáticas; revisar o diff      |

Os scripts `e2e:emulators`, `e2e:firebase`, `e2e:seed` e `e2e:android` precisam da infraestrutura descrita na documentação específica. A meta de cobertura não é uma afirmação de cobertura atingida. Na validação em nuvem com **Node 24.20.0 e npm 11.19.0**, `npm ci` concluiu, `npm run typecheck` passou e Jest executou **26 suítes/124 testes aprovados**. `expo export --platform android` gerou o bundle Android com valores fictícios de Firebase. O Metro iniciou em porta temporária **4501** e `/status` respondeu `packager-status:running`. Não houve build nativo, uso de conta Firebase ou verificação funcional no dispositivo; esses itens e a captura mobile permanecem para revisão. O processo Metro foi encerrado.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

- **Configuração Firebase ausente:** preencha os campos exigidos no `.env` e reinicie o Metro; o código evita inicializar os serviços com esses campos vazios.
- **Falha no hook:** confirme `node --version`, execute `npm ci` e inspecione lint-staged/testes; não instale Commitlint globalmente.
- **Mapa Android sem tiles:** confira a chave Maps, restrições de pacote/certificado e o build utilizado.
- **Expo Go incompatível:** confirme SDK 54 e módulos nativos; siga o procedimento de build do projeto. Fluxos com credenciais, localização e notificações precisam de revisão no dispositivo.

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `main`, descreva a mudança e suas verificações em um pull request. Não inclua dependências instaladas, arquivos de ambiente, credenciais ou artefatos de build. Revise o diff antes do commit. Execute os checks existentes e siga os [padrões de commit](documentation/Padrões%20de%20Commit/Padrões%20de%20Commit.md).

<a id="license"></a>

## 📜 License

Licença [GNU Affero General Public License v3.0](LICENSE).

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
