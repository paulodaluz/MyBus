# Matriz visual mobile — #49

A matriz reproduz viewport, densidade e fonte no AVD Android API 33. Dimensões físicas são impostas por `wm size`, densidade por `wm density` e fonte por `font_scale`. O viewport útil exclui barras do sistema e insets; os valores abaixo descrevem o display total em dp. O checklist precisa ser repetido em aparelho físico antes de afirmar suporte de produção.

| Perfil     | Resolução física | Densidade    | Display em dp | fontScale | Finalidade                             |
| ---------- | ---------------- | ------------ | ------------- | --------- | -------------------------------------- |
| compact    | 640 × 1136       | 320 dpi (2x) | 320 × 568     | 1.0       | Tela pequena, teclado, rolagem e ações |
| regular    | 864 × 1920       | 320 dpi (2x) | 432 × 960     | 1.0       | Tela grande e espaço disponível        |
| large-font | 864 × 1920       | 320 dpi (2x) | 432 × 960     | 1.3       | Textos grandes e quebra de linha       |

O runner `scripts/e2e-android.sh` executa duas repetições da suíte por perfil, com fixtures reinicializadas antes de cada repetição. O [procedimento E2E](E2E-Android.md) documenta APK/Metro, isolamento e artefatos. Os logs não são versionados; screenshots revisadas e recibos ficam em `fixtures/screenshots/`.

## Checkpoints obrigatórios

| Fluxo                | Checkpoints automatizados                                         | Inspeção visual                                            |
| -------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| Entrada              | MyBus visível; login alcançável                                   | Título/imagem proporcionais; Login/Cadastre-se alcançáveis |
| Recuperação de senha | Campo e botão; e-mail inválido; retorno ao login                  | Mensagem e campo legíveis; teclado sem cobrir ação         |
| Login/logout         | Login → mapa → configurações → logout; Back sem retornar à sessão | Botões de mapa e opções alcançáveis; textos inteiros       |
| Cadastro             | Campos → escolha de transporte → mapa                             | Último campo e Pronto alcançáveis; teclado/rolagem         |
| Vínculo              | Código fictício → confirmação → lista com veículo                 | Código, nome e botão de remoção legíveis                   |
| Criação              | Campos/recursos → confirmação de veículo                          | Todos os switches e Cadastrar alcançáveis                  |

## Checklist estendido antes de encerrar a fase

- [ ] Inspecionar cada screenshot: nenhum texto cortado, sobreposição ou controle fora da área útil; ações mínimas de 44 dp e labels acessíveis.
- [ ] Repetir formulários com teclado aberto no último campo, erro, sucesso e toque duplicado.
- [ ] Listas vazias, preenchidas e com nomes/descrições longos; rolar até a última ação.
- [ ] Mapas: negar/conceder GPS, falha de rede/retry, marcador, detalhe/modal e Back; conferir tiles e centralizar sem perder gesto.
- [ ] Motorista: login em sessão limpa, compartilhar/parar, falha de write e logout.
- [ ] Perfil, feedback, edição de veículo e pontos de parada; conteúdo extenso e Back nos modais.
- [ ] Notificações: negar/conceder, agendar/receber/cancelar, fora do aplicativo.
- [ ] Repetir no APK release atualizado e em dispositivo físico.

Os cenários estendidos estão detalhados em [Smoke-Android.md](Smoke-Android.md). Um teste Maestro verde não equivale a aprovação visual automática nem certifica serviços reais.

## Critério para novos cards de interface

Todo card que altera uma tela deve incluir: “Validar nos perfis compact, regular e large-font de `documentation/mobile-visual-matrix.md`; registrar screenshot com dados sintéticos; conferir teclado, rolagem, Back, estados vazio/erro/loading e ação principal”. Falha relevante exige corrigir o layout e renovar a evidência daquele checkpoint.

## Resultado desta execução

Em 12/10/2026, `public-smoke` passou duas vezes em cada perfil (6/6 execuções), sem interação manual. O fluxo validou entrada, navegação, erro de e-mail, envio real ao Auth Emulator e acesso aos formulários de passageiro/empresa com suas ações alcançáveis. Isso executa a fatia TypeScript de recuperação de senha no Android.

| Perfil     | Repetição 1 | Repetição 2 | Capturas                                                  |
| ---------- | ----------- | ----------- | --------------------------------------------------------- |
| compact    | Passou      | Passou      | [Capturas](../fixtures/screenshots/2026-10-12/compact)    |
| regular    | Passou      | Passou      | [Capturas](../fixtures/screenshots/2026-10-12/regular)    |
| large-font | Passou      | Passou      | [Capturas](../fixtures/screenshots/2026-10-12/large-font) |

As 21 capturas usam campos vazios ou o endereço fictício `passenger@mybus.test`. O [recibo de resultados](../fixtures/screenshots/2026-10-12/results.json) registra versão das ferramentas, hash do APK e das capturas, digest das fontes e resultados. Revisão visual: textos/campos/botões dos checkpoints públicos legíveis e alcançáveis; fonte ampliada quebra linhas sem sobrepor os controles. Rolagem é necessária no compacto.

**Pendências explícitas:** os fluxos autenticados que abrem mapa chegaram ao SDK nativo e falharam com `RuntimeException: API key not found`. Não há `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` no ambiente local; o usuário pediu para deixar essa validação pendente. Login/logout completo, finalização de cadastro, vínculo e criação de veículo não são considerados aprovados por essa execução. Após configurar a chave e regenerar o APK, executar a suíte completa.

A ilustração de boas-vindas não renderizou no APK debug via Metro, apesar de o arquivo PNG responder HTTP 200. As capturas registram essa ausência; a homologação visual integral requer conferir o APK release atualizado e a resolução de assets. O checklist estendido e o aparelho físico também permanecem pendentes. A fase visual não deve ser fechada apenas pelos seis smokes públicos.

Validação de código: lint, formatação, typecheck, 26 suítes/124 testes com 100% de cobertura e export Android passaram. O smoke com SDK Firebase real passou em Auth, CRUD Firestore e RTDB. O baseline `b085a83` permanece disponível para comparação de código; capturas anteriores à migração não são usadas como prova do novo bundle.
