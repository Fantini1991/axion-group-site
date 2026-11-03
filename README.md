# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

---

## Simulado ENEM (`/enem`)

Área separada do site, acessada em `https://<seu-domínio>/enem`.

- **Cadastro simples** (nome, usuário e senha) e login.
- **3 provas oficiais** (`src/enem/data/provas.ts`), iguais para todos, cada uma com 20 questões (5 por área) e um tema de redação próprio:
  1. Tecnologia e sociedade — redação sobre o uso ético da inteligência artificial;
  2. Meio ambiente e clima — redação sobre eventos climáticos extremos;
  3. Cidadania, saúde e economia — redação sobre apostas online e os jovens.
- **Banco de 60 questões inéditas**, baseadas nos conteúdos que mais caíram no ENEM de 2016 a 2025 e atualizadas com contextos de 2024–2026
  (IA, deepfakes, COP30, enchentes no RS, trabalho por aplicativo, apostas online, vacinas de mRNA, energia solar).
- **Correção** com nota estimada (inspirada na TRI) por área, o comentário de cada alternativa (por que errou) e o passo a passo da resolução.
- **Redação** corrigida nas 5 competências do ENEM. Há também treino livre com 7 temas inéditos e os 10 temas oficiais de 2016 a 2025.
- **Ranking**: nota de cada prova = (objetiva × 4 + redação) ÷ 5; nota geral = média das 3 provas. Vale só a 1ª tentativa.
- **Treino livre** com questões sorteadas do banco inteiro (não conta para o ranking).

### Configuração na Vercel

| Variável | Para quê | Obrigatória? |
| --- | --- | --- |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Banco de dados (contas, notas e ranking compartilhado). Crie em **Vercel → Storage → Upstash for Redis** e conecte ao projeto — as variáveis são criadas automaticamente. | Sim, para o ranking entre aparelhos |
| `ANTHROPIC_API_KEY` | Correção da redação por IA (Claude), com comentários detalhados e reescrita do parágrafo mais fraco. | Não — sem ela, usa o corretor automático por regras |
| `ENEM_CODIGO_CONVITE` | Código exigido no cadastro, para que só quem você convidar consiga criar conta. | Não |

Sem o banco configurado (ou em `npm run dev`), o simulado funciona em **modo local**: os dados ficam no navegador de cada aparelho.
