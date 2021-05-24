# Padrões de Commit

- **TODOS** os commits e nomes de branch, devem ser em inglês (caso não possua conhecimento use o google tradutor).
- **TODOS** os commits devem seguir o padrão assim como as branchs.
- **TODOS** os commits devem passar por Code Review.

## **Padrão de Commit**

```bash
<type>[scope]: <description>

[body]
```

O modelo acima é o esqueleto de um commit semântico completo com todas as partes opcionais, mas ele não precisa ser utilizado em todos os commits. Devido ao seu tamanho, pode acabar gerando um gasto de tempo desnecessário em algumas ocasiões. Na maioria dos casos, usar o modelo simplificado sem as partes opcionais já vai ajudar bastante.

- A primeira linha é **obrigatória** deve ter no máximo 60 **chars.**
- A propriedade **type** e **description** são obrigatórias.

### Tipos (type)

- **feat:** utilizado quando se adiciona alguma nova funcionalidade do zero ao código/serviço/projeto.

  Exemple: adição de um novo endpoint para uma API REST ou um novo consumer para um serviço de mensageria.

- **fix:** usado quando existem erros de código que estão causando bugs.

  Exemplo: proteção de uma variável que está gerando um NullPointerException em produção.

- **refactor:** utilizado na realização de uma refatoração que não causará impacto direto no código ou em qualquer lógica/regra de negócio.

  Exemplo: melhorias de performance revisadas em um code review.

- **style:** utilizado quando são realizadas mudanças no estilo e formatação do código que não irão impactar em nenhuma lógica do código.

  Exemplo: realizar a indentação de um código.

- **test:** usado quando se realizam alterações de qualquer tipo nos testes, seja a adição de novos testes ou a refatoração de testes já existentes.

  Exemplo: adição de testes de contrato e modificação de testes unitários.

- **doc:** ideal para quando se adiciona ou modifica alguma documentação no código ou do repositório em questão.

  Exemplo: adição de documentação sobre o response de uma API ou adição de um [README.md](http://readme.md/).

- **env:** utilizado quando se modifica ou adiciona algum arquivo de CI/CD.

  Exemplo: modificar um comando do Dockerfile ou adicionar um step a um Jenkinsfile.

- **build:** usado quando se realiza alguma modificação em arquivos de build e dependências.

  Exemplo: adição de dependências do Apache Kafka.

### Descrição (description)

É aqui que deve ser descrito, de maneira clara, sucinta e simplificada, o que foi realizado no commit.

Exemplo:

```bash
feat: adicionando API para cadastro de investidores
```

### Escopo (scopes)

O escopo do commit é uma parte opcional, curta e de fácil compreensão. É nela que iremos dizer qual parte do código foi modificada, como indicar que fizemos alterações apenas na camada de Client de um microsserviço.

Exemplo:

```bash
refactor(InvestidorService): modificando regra para cálculo de juros
```

### Corpo (body)

O corpo do commit é também opcional. Nele, pode-se realizar uma descrição mais detalhada do commit, indicar razões para a realização dele e consequências que ele pode vir a causar, além de alguma outra observação que seja pertinente.

Exemplo:

```bash
fix(ProdutoApi): retirando variável do path da API e ajustando loggers

- O path anterior tinha variáveis desnecessárias e não utilizadas por nenhum consumidor

- Os loggers foram adaptados ao novo padrão utilizado
```

## **Recomendações de commits**

- Separar os commits em partes lógicas da implementação, ou seja, não commitar tudo de uma vez só.
- Commits de refatoração não devem adicionar lógica ao código.

## Nomenclaturas de Branch

- **feature-nome-funcionalidade**: Novas implementações ou evoluções.
- **fix-nome-funcionalidade**: Correção de das implementações.
- **hotfix-nome-funcionalidade**: Correções de produção.

## **Exemplo de Commit**

```bash
Branch: feature-registration

feat(RegistrationCompany): created logic to create new company user
```

## Template do commit

```bash
type(scope): description

[body]
```
