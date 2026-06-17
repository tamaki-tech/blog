```txt
pnpm install
pnpm run dev
```

```txt
pnpm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
pnpm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## Loop Agent Workflows

Loop Agent 関連の workflow は、受付と検証で役割を分けています。

| 契機 | workflow | 動く内容 |
| --- | --- | --- |
| PR 作成・更新 | `Loop Agent Verifier` | コード差分の検証 |
| GitHub Actions から手動実行 | `Loop Agent Verifier` | 現在のブランチの手動検証 |
| Issue に `agent:run` ラベル付与 | `Loop Agent Intake` | Codex による実装、検証、draft PR 作成 |

`Loop Agent Verifier` は次の完了条件を検証します。
このセクションは workflow の動作確認にも利用できます。

```txt
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run build
```

Issue から Agent にタスクを渡す場合は、`Agent タスク` テンプレートで Issue を作成し、
準備ができたら `agent:run` ラベルを付けてください。`Loop Agent Intake` は Codex の生成した patch を検証し、
4つの完了条件が通った場合だけ draft PR を作成します。利用前に GitHub secret `OPENAI_API_KEY` を設定してください。
