# Baseline de qualidade — #67 e #69

Referência preservada: commit `b085a83` (início desta alteração). Compare com `git diff b085a83 -- src package.json tsconfig.json`. Não é necessário manter uma segunda cópia do código. Expo 54, React 19.1, RN 0.81.5, Firebase 12 e o lockfile npm continuam como base.

## TypeScript progressivo

`npm run typecheck` verifica **todos** os arquivos `.ts` e `.tsx` de `src`, incluindo os adicionados futuramente. `strict`, `noUnusedLocals`, `noUnusedParameters` e `noEmit` estão ativos. `allowJs: true` permite consumir módulos legados; `checkJs: false` deixa explícito que os arquivos JS ainda não receberam verificação estrita.

O fluxo vertical portado é recuperação de senha: tela `ForgotMyPassword/index.tsx` → `AuthService.ts` → `sendPasswordResetEmail` modular. A tela usa `ScreenProps<'ForgotMyPassword'>`, campos tipados e captura `unknown` com guarda de código de erro. `Input` e `Screen` também possuem contratos TypeScript; navegação e parâmetros continuam tipados. Os testes exercitam validação, bloqueio de envio duplicado, cooldown, conta desconhecida e falha de rede. O smoke Android verifica a navegação e a validação de e-mail desse fluxo.

Próximas fatias: perfis e modelos de veículo → serviços Firestore → hooks/mapas → telas de cadastro. Cada fatia deve entrar no typecheck existente e manter os testes comportamentais. Não usar `any`, `@ts-ignore` ou excluir novos TS do `include` para passar a etapa.

## Dívida restante

- A maior parte das telas/backend é JS: os tipos inferidos não substituem contratos de domínio e validação das respostas Firebase.
- Serviços antigos mantêm contratos mistos de erro (alguns retornam `Error`, outros rejeitam); esta migração preserva esses contratos para não alterar os chamadores. Padronizar por fatia, com testes.
- Consultas Firestore ainda leem coleções completas e filtram no cliente. Migrar para queries somente com evidência de equivalência e índices necessários.
- Regras de autorização, autenticação do motorista, Maps SDK e entrega real de notificações têm verificações próprias em `Smoke-Android.md`; testes com mocks e emuladores não certificam produção.
- A suíte E2E usa APK debug e bundle atual via Metro; build release atualizado e smoke físico são etapas distintas.

## Evidência da migração Firebase — #33

A inicialização central exporta uma instância de Auth, Firestore e RTDB. No Android/iOS, Auth usa `initializeAuth` com persistência AsyncStorage; no web e ao reutilizar uma app usa `getAuth`. Isso evita perder a sessão Auth entre reinicializações e elimina o aviso de persistência apenas em memória. Não há imports `firebase/compat` nem chamadas namespaced no código de aplicação. As coleções, IDs dos documentos e payloads foram preservados. Os códigos dos erros permanecem nos objetos originais.

Leituras únicas RTDB agora usam `get`; listeners dos mapas usam `onValue` com disposer retornado no cleanup. Writes retornam a Promise de `set`, permitindo aguardar persistência e propagar falha. A suíte cobre Auth, criação/leitura/atualização/exclusão de documentos, localização e descarte de assinaturas.

Nenhuma dependência foi removida. As quatro remoções de caminhos JS/JSX são renomeações para TS/TSX (`AuthService`, `ForgotMyPassword`, `Input`, `Screen`), com resolução de import preservada. `firebase/compat` foi substituído pelo SDK modular da mesma dependência instalada, conforme o [guia oficial](https://firebase.google.com/docs/web/modular-upgrade).

## Gates

```sh
. .husky/node-version.sh
npm run lint
npm run format:check
npm run typecheck
npm run test:coverage -- --ci --runInBand
npx --no-install expo export --platform android --output-dir dist/quality-android
```

A CI executa formatação, lint, typecheck, cobertura e exports Android/iOS. Os limites de cobertura de 100% foram preservados. Resultados atuais da validação nativa/visual ficam em `mobile-visual-matrix.md`.

## Resultado em 12/10/2026

Lint, formatação, typecheck, export Android e 26 suítes/124 testes com 100% de cobertura passaram. O fluxo TypeScript de recuperação de senha executou no Android contra Auth Emulator nos três perfis, duas vezes por perfil. O smoke SDK real também validou CRUD Firestore e listener/write/read RTDB. A CI foi atualizada localmente; não houve execução remota destas alterações. As pendências nativas de #43 e #49 constam da matriz visual.
