# Integração contínua

O workflow `.github/workflows/ci.yml` roda em pull requests destinados a `main` e em pushes para `main`.
Usa Node 24.20.0 e `npm ci`, com `package-lock.json` versionado e cache do npm.
A instalação falha se o manifesto divergir do lockfile.

São obrigatórios: ESLint sem warnings, TypeScript, Jest com os limites de cobertura de 100% do repositório, Expo Doctor e exportação JavaScript Android/iOS. Nenhum job ignora falhas.
Também foram integradas as verificações do trabalho local anterior: SonarQube, CodeQL, auditoria de dependências, revisão de dependências em PR e Gitleaks.
A permissão padrão é `contents: read`; apenas CodeQL recebe `security-events: write`.

Configure `SONAR_TOKEN` como secret e `SONAR_HOST_URL`, `SONAR_PROJECT_KEY`, `SONAR_ORGANIZATION` como variables do GitHub. Ausência de configuração falha explicitamente. Secrets não são disponibilizados a PRs de forks; esses PRs exigem a avaliação do responsável, sem usar `pull_request_target` para executar código não confiável.
Os bundles usam valores fictícios de Firebase e não acessam o backend.

## Reprodução local

```sh
. .husky/node-version.sh
npm ci
npm run lint
npm run typecheck
npm run test:coverage -- --ci --runInBand
npx --yes expo-doctor@1.20.4
npx --no-install expo export --platform android --output-dir dist/android
npx --no-install expo export --platform ios --output-dir dist/ios
npm audit --omit=dev --audit-level=high
```

Exportação JavaScript não substitui compilação nativa nem testes no aparelho.
A configuração anterior estava sem commit em outro worktree; foi integrada aqui preservando os arquivos de origem e adaptando Yarn para o lockfile npm atual.

## Validação remota pendente

Não houve push nem criação de PR nesta tarefa. Após o envio pelo responsável, abrir PR de teste, verificar todos os checks e introduzir temporariamente uma falha de lint/teste para confirmar bloqueio. Configurar branch protection para exigir os checks desejados. Execução remota e SonarQube não são considerados validados apenas pelos testes locais.

## Resultado local em 22/09/2026

`npm ci` passou numa cópia separada, sem reutilizar `node_modules`. ESLint, TypeScript e as 26 suítes/118 testes passaram com 100% nos quatro indicadores de cobertura. A auditoria de produção reportou 17 ocorrências (9 high, 8 moderate), incluindo dependências transitivas de ferramentas Expo/Metro. Portanto, o gate de auditoria ainda falha. Não executar `npm audit fix --force`: a sugestão envolve mudar a família do SDK. Avaliar as correções transitivas e o upgrade em uma etapa explícita, mantendo o bloqueio visível.
