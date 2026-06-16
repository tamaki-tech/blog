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

## Loop Agent Verifier

Loop Agent 関連の workflow は、受付と検証で役割を分けています。

| 契機 | workflow | 動く内容 |
| --- | --- | --- |
| PR 作成・更新 | `Loop Agent Verifier` | コード差分の検証 |
| GitHub Actions から手動実行 | `Loop Agent Verifier` | 現在のブランチの手動検証 |
| Issue に `agent:run` ラベル付与 | `Loop Agent Intake` | Agent タスクの受付コメント投稿 |

`Loop Agent Verifier` は次の完了条件を検証します。

```txt
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run build
```

Issue から Agent にタスクを渡す場合は、`Agent タスク` テンプレートで Issue を作成し、
準備ができたら `agent:run` ラベルを付けてください。このラベルでは `Loop Agent Intake` だけが動き、
lint / test / build は実行しません。
