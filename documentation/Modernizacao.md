# Baseline e sequência de modernização

Decisão de 22/09/2026 para #29: estabilizar o checkout existente em Expo SDK 54, sem recriar o projeto e sem atualizar React Native isoladamente. O baseline anterior já usava Expo 54; a navegação 5 era uma incompatibilidade remanescente. A migração para native-stack 7 removeu essa dependência legada e acrescentou limites de rota tipados.

| Componente                  | Baseline adotado                        | Motivo                                         |
| --------------------------- | --------------------------------------- | ---------------------------------------------- |
| Node                        | 24.20.0                                 | Igual nos hooks e CI                           |
| Expo                        | 54, patch registrado no lockfile        | Manter a família já instalada                  |
| React Native / React        | 0.81.5 / 19.1.0                         | Matriz oficial do SDK 54                       |
| Navigation / native-stack   | 7.4.1 / 7.19.2                          | Compatível com screens 4; rotas tipadas        |
| screens / safe-area-context | 4.16 / 5.6                              | Conjunto nativo do SDK                         |
| Android                     | API 36 para compilação; emulador API 33 | Compilar e executar são verificações distintas |
| Firebase                    | 12, versão exata no lockfile            | Preservar serviços compat durante as correções |

Fontes consultadas na data: [matriz Expo 54](https://docs.expo.dev/versions/v54.0.0/) e [migração Navigation 7](https://reactnavigation.org/docs/upgrading-from-6.x/). Esta decisão não afirma que SDK 54 seja a versão mais recente nem certifica requisitos atuais das lojas.

## Ordem e critérios de saída

1. Baseline: instalação congelada, lint sem warnings, cobertura 100%, exportação e compilação Android. #14 registra a execução nativa e limitações.
2. APIs nativas: localização, notificações e permissões (#68), seguidas da navegação e parâmetros (#32).
3. Componentes e telas: safe area, teclado, botões, mapas, região e autenticação. Testes de integração exercitam NavigationContainer real (#71).
4. Regressão: executar inventário de rotas (#28), incluindo três perfis, ausência de dados, offline, retorno Android e dois tamanhos. Falhas nativas bloqueiam a conclusão, mesmo com Jest verde.
5. Upgrade posterior do SDK: branch própria, seguir a sequência oficial de SDKs, executar `npx expo install --fix`, revisar o diff do lockfile, repetir Doctor, testes, exportação e build. Não misturar esse experimento aos bugs desta entrega.

## Alternativas e reversão

Manter Navigation 5 exigiria sustentar dependências antigas incompatíveis com React 19. Recriar um aplicativo vazio perderia configuração e não resolveria falhas dos fluxos existentes; não foi necessário para a compilação iniciada no projeto atual.

Cada bug tem commit próprio. Para reverter, criar commits `git revert` dos commits afetados, em ordem inversa de dependências, preservando o trabalho de terceiros. Reinstalar com `npm ci` e gerar novamente os diretórios nativos descartáveis. Não reutilizar APK anterior como evidência do código revertido. Antes de publicar, repetir os gates; não executar reset destrutivo ou force push.

O TypeScript cobre o contrato de navegação; a conversão integral do código JavaScript é trabalho separado. Compilação e exportação não certificam autenticação real, renderização de mapas ou entrega de notificações.
