# E2E Android local — #43

Maestro foi escolhido por executar o APK Android com seletores de texto/acessibilidade, sem instalar um runner dentro do aplicativo e sem manter uma integração nativa Detox. As [instruções oficiais](https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli) exigem JDK 17 ou superior. A validação usa Maestro 2.11.0 e JDK 21.

## Isolamento

Usar somente AVD descartável. A suíte limpa os dados **do aplicativo nesse emulador**. Auth, Firestore e RTDB rodam em localhost, projeto `demo-mybus`; o script de fixtures tem host e projeto fixos, apaga apenas esses emuladores e cria contas sintéticas `@mybus.test`. Não precisa de login na CLI Firebase, credencial administrativa ou deploy.

`scripts/e2e-env.sh` desabilita a leitura do `.env` na CLI e define a configuração demo para o bundle. O código recusa conectar emuladores a um projeto diferente de `demo-mybus`. O `metro.config.js` exclui arquivos `.env` do bundle de desenvolvimento quando o host de emuladores está definido, pois o módulo virtual do Expo pode lê-los mesmo com `EXPO_NO_DOTENV`. Os arquivos em `e2e/` são exclusivos dos emuladores; não substituem nem publicam as regras da aplicação.

## Reprodução

Terminal 1:

```sh
. .husky/node-version.sh
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home
npm run e2e:emulators
```

Terminal 2, com o APK debug instalado em AVD:

```sh
. .husky/node-version.sh
. scripts/e2e-env.sh
CI=1 npx --no-install expo start --localhost --clear
```

O APK debug existente pode ser usado quando suas dependências nativas correspondem ao `package-lock.json`; caso contrário, regenere-o por `scripts/build-android.sh`. APK release antigo não carrega o bundle novo do Metro.

Terminal 3, com `adb` e `maestro` no PATH:

```sh
export ANDROID_SERIAL=emulator-5554
npm run e2e:android
```

O script salva os overrides anteriores de tamanho/densidade/fontScale e os restaura ao terminar, inclusive em falha. Executa cada perfil duas vezes sem interação manual, reinicializa fixtures e captura JUnit, screenshots, hierarquia e logcat. Artefatos ficam em `e2e/artifacts/`, ignorados pelo Git; apenas capturas revisadas com dados fictícios devem ir para `fixtures/screenshots/`.

## Fluxos

- `public-smoke`: boas-vindas, login, recuperação de senha validação de endereço inválido e envio do reset ao Auth Emulator.
- `login-logout`: login de passageiro → mapa → configurações → logout → Back sem voltar à sessão.
- `register`: cadastro de passageiro → escolha de transporte → mapa.
- `create-vehicle`: login da empresa → criação de veículo → confirmação.
- `link-vehicle`: vínculo de veículo privado → retorno ao mapa e lista.

Cada fluxo tem início com `clearState` e as permissões inicialmente negadas. O helper `flows/login.yaml` recebe somente o e-mail fictício. Os checkpoints visuais referenciam [a matriz](mobile-visual-matrix.md).

Mapas com tiles, permissão concedida, motorista, push/reminders e dispositivo físico permanecem no checklist estendido; um marcador de mapa acessível não comprova carregamento dos tiles Google.

O SDK real também pode ser verificado por `npm run e2e:seed && npm run e2e:firebase`, com os emuladores ativos. Esse smoke testa Auth, códigos de erro, CRUD Firestore e listener/write/read RTDB.

Para executar apenas fluxos públicos enquanto o APK está sem chave Maps: `E2E_FLOW=.maestro/public-smoke.yaml npm run e2e:android`. Isso registra somente essa parte como validada; não substitui a suíte completa. O APK deve conter `com.google.android.geo.API_KEY` gerada de `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` para renderizar `MapView`. A ausência causa `RuntimeException: API key not found`, não apenas falta de tiles.
