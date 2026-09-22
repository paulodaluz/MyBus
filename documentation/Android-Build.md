# Build Android local (#14)

O projeto já estava em Expo SDK 54 no início desta recuperação; não é possível chamar o resultado de APK SDK 40. O build preserva a família do SDK existente.

## Reprodução

Instale JDK 21 e Android SDK com plataforma 36, build tools e NDK solicitados pelo Gradle. Configure `.env` pelo exemplo, incluindo a chave de Maps SDK for Android para testar mapas. A chave deve ter restrições de pacote e certificado; não versionar `.env`.

```sh
. .husky/node-version.sh
npm ci
export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home"
bash scripts/build-android.sh
```

O script cria uma cópia temporária, instala com `npm ci`, gera Android e compila debug/release para arm64. Use `ANDROID_ARCHITECTURES=x86_64` em emulador Intel ou uma lista de arquiteturas para outros aparelhos. Os diretórios nativos não são versionados. A cópia retém o `.env` local necessário ao build; não compartilhar essa pasta indiscriminadamente.

O APK debug precisa de Metro (`npm start` e `adb reverse tcp:8081 tcp:8081`). O APK release contém o bundle; usa a assinatura de desenvolvimento gerada pelo prebuild, exclusivamente para validação local, não publicação em loja.

## Evidências de 22/09/2026

- Node 24.20.0, JDK 21, emulador Pixel_3a_XL_API_33 arm64, conectado como emulator-5554.
- `assembleDebug`: sucesso, 413 tarefas, 6m59s; instalado no emulador e servindo Metro. Este APK precede a última alteração do parâmetro de mapa e deve ser regenerado pelo script para smoke final.
- `assembleRelease`: sucesso, 528 tarefas, bundle JavaScript incluído. `dist/android/mybus-release.apk` foi regenerado após o commit 6d78c9e e corresponde ao código atual; é para instalação local e não foi testado abrindo na interface.
- Instalação isolada com `npm ci`: sucesso. Exportação iOS e exportações SDK 57 Android também passaram; exportação não equivale a build nativo.
- Reanimated 4.1 procura `libworklets.so` num caminho legado CMake que a variante Worklets não cria. O build falhava mesmo após compilar Worklets primeiro. Confirmei que a biblioteca válida é gerada em `prefab_package`; o script a copia desse diretório para o caminho esperado, preservando variante e ABI. Não há alteração de binário nem supressão de falha.

A matriz de testes e os bloqueios estão em [Smoke-Android.md](Smoke-Android.md). A ferramenta gráfica não reconheceu a janela do emulador. A autorização para usar ADB em toques, digitação e capturas está pendente; nenhum fluxo visual é considerado aprovado por instalação ou logs de build. Os logins de passageiro/empresa/motorista, os dois tamanhos Android e a entrega de notificações permanecem pendentes.
