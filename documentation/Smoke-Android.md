# Matriz de navegação e rolagem (#28)

Atualização: 22/09/2026. Inventário extraído das telas e rotas atuais. Origem no código não equivale a fluxo manual aprovado.

Os testes Jest incluem NavigationContainer real, mas substituem transições e APIs nativas. O smoke Android abaixo permanece pendente até execução visual.

| Rota                        | Origens declaradas no código                                                   | Retorno a verificar                                  | Android normal | Android compacto |
| --------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------- | ---------------- |
| InitialPage                 | Bootstrap ou navegação dinâmica; validar                                       | Entrada do aplicativo                                | Pendente       | Pendente         |
| Login                       | InitialPage, ForgotMyPassword, RegisterCompany, RegisterPassenger              | Back Android retorna à origem                        | Pendente       | Pendente         |
| ForgotMyPassword            | Login                                                                          | Back Android retorna à origem                        | Pendente       | Pendente         |
| MapPassenger                | InitialPage, Login, ChooseTypeOfVehicle                                        | Reset público após logout; Back não retorna ao login | Pendente       | Pendente         |
| RegisterPassenger           | InitialPage                                                                    | Back Android retorna à origem                        | Pendente       | Pendente         |
| ChooseTypeOfVehicle         | RegisterPassenger                                                              | Back Android retorna à origem                        | Pendente       | Pendente         |
| SettingsPassenger           | MapPassenger, EditProfilePassenger                                             | Back Android retorna à origem                        | Pendente       | Pendente         |
| EditProfilePassenger        | SettingsPassenger                                                              | Back Android retorna à origem                        | Pendente       | Pendente         |
| AddNewPrivateVehicle        | MapPassenger, SettingsPassenger                                                | Back Android retorna à origem                        | Pendente       | Pendente         |
| LeaveYourOpinionPassenger   | ListVehicleInfosPassenger, SettingsPassenger                                   | Back Android retorna à origem                        | Pendente       | Pendente         |
| ListMyLinkedVehicles        | SettingsCompany, SettingsPassenger                                             | Back Android retorna à origem                        | Pendente       | Pendente         |
| ListVehicleInfosPassenger   | MapPassenger                                                                   | Back Android retorna à origem                        | Pendente       | Pendente         |
| MapCompany                  | InitialPage, Login, RegisterCompany, ListVehicleInfosCompany                   | Reset público após logout; Back não retorna ao login | Pendente       | Pendente         |
| RegisterCompany             | InitialPage                                                                    | Back Android retorna à origem                        | Pendente       | Pendente         |
| SettingsCompany             | EditProfileCompany, MapCompany                                                 | Back Android retorna à origem                        | Pendente       | Pendente         |
| EditProfileCompany          | SettingsCompany                                                                | Back Android retorna à origem                        | Pendente       | Pendente         |
| LeaveYourOpinionCompany     | SettingsDriver, SettingsCompany                                                | Back Android retorna à origem                        | Pendente       | Pendente         |
| ReceivedFeedbacks           | SettingsDriver, SettingsCompany                                                | Back Android retorna à origem                        | Pendente       | Pendente         |
| CreateNewVehicle            | SettingsCompany, MapCompany                                                    | Back Android retorna à origem                        | Pendente       | Pendente         |
| AskShowVehicleCode          | CreateNewVehicle                                                               | Back Android retorna à origem                        | Pendente       | Pendente         |
| ShowVehicleCode             | AskShowVehicleCode                                                             | Back Android retorna à origem                        | Pendente       | Pendente         |
| AskPointsVehicleWillPass    | ShowVehicleCode, AskShowVehicleCode                                            | Back Android retorna à origem                        | Pendente       | Pendente         |
| ChoicePointsVehicleWillPass | AskPointsVehicleWillPass                                                       | Back Android retorna à origem                        | Pendente       | Pendente         |
| ListVehicleInfosCompany     | AskPointsVehicleWillPass, EditVehicle, MapCompany, ChoicePointsVehicleWillPass | Back Android retorna à origem                        | Pendente       | Pendente         |
| EditVehicle                 | SettingsDriver, MapDriver, ListVehicleInfosCompany                             | Back Android retorna à origem                        | Pendente       | Pendente         |
| MapDriver                   | LoginDriver                                                                    | Reset público após logout; Back não retorna ao login | Pendente       | Pendente         |
| LoginDriver                 | InitialPage                                                                    | Back Android retorna à origem                        | Pendente       | Pendente         |
| SettingsDriver              | MapDriver                                                                      | Back Android retorna à origem                        | Pendente       | Pendente         |

## Procedimento por perfil

Usar apenas contas de teste autorizadas. Registrar versão do APK, API do Android, resolução, densidade e escala da fonte. Repetir em tamanho normal e compacto. Em cada formulário, abrir teclado no último campo, alcançar a ação por rolagem, validar erro, sucesso, envio duplicado e retorno. Em listas, testar vazio e conteúdo extenso; em modais, testar conteúdo extenso e Back.

Passageiro: entrada, cadastro, escolha de transporte, mapa, vínculo por código, lista, detalhes, edição de perfil, opinião e logout. Empresa: entrada, cadastro, mapa, criação/edição de veículo, código, pontos, detalhes, feedback, perfil e logout. Motorista: login por placa, mapa, iniciar/parar compartilhamento, editar veículo, configurações, opinião e logout.

Mapas: permissão negada/concedida, sem veículos, sem posição, falha de rede e retry, gesto preservado e centralizar explícito. Notificação: conceder/negar permissão, agendar, receber e cancelar. Reiniciar o aplicativo para conferir persistência de sessão.

## Funções e limitações identificadas

- O aviso de veículo é um lembrete local de um minuto, identificado assim na interface; não calcula horário real de chegada.
- Login de motorista consulta veículos antes de autenticar no Firebase. Com regras que exigem `auth != null`, o fluxo precisa ser validado em sessão limpa; os mocks não certificam esse acesso.
- Mapas Android dependem de chave Maps SDK e restrições de pacote/assinatura corretas. Sem chave, essa parte do smoke está bloqueada.

## Cards de verificação remanescentes

| Identificador local | Defeito ou bloqueio                                                                                            | Evidência / próximo passo                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ANDROID-MAPS        | Chave Maps SDK Android ausente no ambiente                                                                     | Configurar `.env`, recompilar e verificar mapa                            |
| DRIVER-AUTH         | Possível bloqueio do login de motorista por regras Firebase                                                    | Reproduzir em sessão limpa com fixture autorizada                         |
| CI-AUDIT            | Auditoria npm atual aponta 9 ocorrências high e 8 moderate em dependências de produção/ferramentas transitivas | Gate do CI permanece bloqueante; revisar upgrade compatível separadamente |

Estes registros são locais; nenhuma issue foi aberta ou encerrada remotamente. Não considerar #28 concluído enquanto as colunas Android estiverem pendentes.
