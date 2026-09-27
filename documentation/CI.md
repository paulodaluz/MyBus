# Integração contínua

O workflow `.github/workflows/ci.yml` roda em pull requests destinados a `main` e em pushes para `main`.
Usa Node 24.20.0 e `npm ci`, com `package-lock.json` versionado e cache do npm.
A instalação falha se o manifesto divergir do lockfile.

São obrigatórios: ESLint sem warnings, TypeScript, Jest com os limites de cobertura de 100% do repositório, Expo Doctor e exportação JavaScript Android/iOS. Nenhum job ignora falhas.
Também foram integradas as verificações do trabalho local anterior: SonarQube, CodeQL, auditoria de dependências, revisão de dependências em PR e Gitleaks.
A permissão padrão é `contents: read`; apenas CodeQL recebe `security-events: write`.

Configure `SONAR_TOKEN` como secret e `SONAR_HOST_URL`, `SONAR_PROJECT_KEY`, `SONAR_ORGANIZATION` como variables do GitHub. Ausência de configuração falha explicitamente. Secrets não são disponibilizados a PRs de forks; esses PRs exigem a avaliação do responsável, sem usar `pull_request_target` para executar código não confiável.
No SonarQube Cloud, em **Administration → Analysis method**, deixe **Automatic analysis** desligada. A análise é executada pelo GitHub Actions, com espera pelo Quality Gate; os dois métodos não podem funcionar simultaneamente.
O job de testes publica `coverage/lcov.info` como artefato da execução atual, substituindo-o quando os testes são reexecutados. O job SonarQube depende dele, baixa o relatório e falha caso ele esteja ausente ou vazio. `sonar.javascript.lcov.reportPaths` indica o arquivo ao scanner; arquivos de estilos seguem as exclusões de cobertura do Jest.
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

## Correções da pipeline em 27/09/2026

O script de commit passou de `commitlint` para `lint:commit`, pois o Expo Doctor rejeita scripts que conflitam com executáveis de `node_modules/.bin`. O hook `.husky/commit-msg` continua usando o executável `commitlint`.

Os `overrides` do npm mantêm o Expo SDK 54 e corrigem dependências transitivas:

- Metro e seus pacotes foram alinhados em `0.83.8`, eliminando as cópias antigas que dependiam de `image-size` vulnerável.
- PostCSS de `@expo/metro-config` passou para `8.5.28`, corrigindo os problemas de leitura de arquivos e serialização de CSS.
- UUID de `xcode` passou para `11.1.1`, que corrige a validação dos limites do buffer e mantém a interface CommonJS usada pelo pacote.

O `package-lock.json` registra essas versões para `npm ci`. Não executar `npm audit fix --force`: a sugestão da execução que falhou envolvia migrar para Expo 57. Os gates de auditoria continuam ativos.

Validação local: `npm ci` e auditoria sem vulnerabilidades; Expo Doctor 18/18; ESLint sem warnings; TypeScript; 26 suítes/119 testes com 100% de cobertura; exports Android/iOS; geração de UUID pelo pacote `xcode`; commitlint; sintaxe YAML e correspondência entre artefato LCOV, caminho do scanner e arquivos de origem.

A reexecução remota do Sonar confirmou a resolução do conflito entre análise automática e CI, mas revelou reprovação por cobertura de 0% (mínimo de 80%). O envio do LCOV corrige essa configuração e ainda precisa ser validado numa execução remota com o workflow atualizado.
