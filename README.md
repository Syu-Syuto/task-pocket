# Task Pocket

自由なカテゴリーで課題を整理する、スマホ・PC向けの課題帳です。自動通知はありません。ビルド・npm installは不要です。

## 起動（PowerShell）

Node.js 22以上を用意し、このフォルダーを開いて実行します。

```powershell
node server.mjs
```

ブラウザーで http://localhost:4173 を開きます。HTMLの直接ダブルクリックではなくHTTPサーバーを使ってください。確認用サーバーはPC内だけに公開します。

## できること

- 課題の追加、編集、削除、未着手・進行中・完了の切り替え
- カテゴリーの自由な追加、名前・色の変更、上への並び替え、削除
- カテゴリー削除後も課題は残り、未分類に表示
- 締切順・追加順、検索、カテゴリー・状態の絞り込み
- 未完了・今日締切・期限切れの集計（選択中カテゴリーの件数）
- JSONでデータを書き出し

## 保存と同期

初期状態の `config.js` は `null` です。この場合はこのブラウザーのlocalStorageだけに保存します。ブラウザーのデータ消去で失われ、端末間の同期はしません。

Firebaseを設定するとGoogleログインが必要になり、Firestoreの `users/{ログインUID}/tasks` と `users/{ログインUID}/categories` に保存します。同じGoogleアカウントでログインした端末にリアルタイム反映します。課題単位の保存なので別の課題への変更を上書きしません。同じ課題の同時編集は最後の書き込みが優先されます。

ローカルモードのデータとクラウドデータは独立しています。自動移行・JSONの読み込み機能はありません。本格利用の前にFirebaseを設定してください。クラウドモードの編集はインターネット接続を前提とします。

## Firebase設定（公開前に必要）

1. https://console.firebase.google.com/ で自分のプロジェクトを作成し、Webアプリを登録します。
2. Authentication → Sign-in methodでGoogleを有効にします。
3. Firestore Databaseを作成します。ルールに同梱の `firestore.rules` 全文を貼り付け、公開します。テストモードの全員読み書き許可では公開しないでください。
4. プロジェクト設定のWebアプリ設定からfirebaseConfigをコピーし、`config.js` の `null` を設定オブジェクトに置き換えます。
5. Authenticationの承認済みドメインに、開発用の `localhost` と、実際の公開先ドメインを登録します。
6. 2つのブラウザーで同じGoogleアカウントにログインし、追加・編集・完了・カテゴリー変更が相互反映されることを確認します。

クライアント設定値はブラウザーから見える仕様です。データ保護は認証とFirestoreルールで行います。管理者用のサービスアカウント秘密鍵は絶対に配置・Pushしないでください。

同梱ルールは各ユーザーが自分のデータだけにアクセスできる設計です。ログイン可能な他の人も自分専用データを作れます。自分以外の利用自体を禁止したい場合は、ルールのowner関数に自分のUID限定条件を追加してください。

公式手順: https://firebase.google.com/docs/web/setup / https://firebase.google.com/docs/auth/web/google-signin

## GitHubへのPushと公開

Git操作は行っていません。ご自身でこのフォルダーをリポジトリとしてPushしてください。個人の課題データを書き出したJSONはリポジトリへ入れないでください。

GitHub Pagesの場合はリポジトリのルートにこのフォルダーの中身を置き、Settings → Pagesで対象ブランチと `/ (root)` を指定します。公開URLをFirebase Authenticationの承認済みドメインへ追加してください。静的ファイルは公開されますが、課題データはFirestoreルールで保護します。

スマホとPCで同じHTTPSの公開URLを開き、同じGoogleアカウントでログインします。AndroidのChromeメニューからホーム画面への追加もできます。インストール表示はブラウザーによります。オフライン起動、バックグラウンド処理、プッシュ通知は実装していません。

## 検証

```powershell
node --test tests/model.test.mjs
node --check app.js
```

Firebaseの実接続・認証とFirestoreルールの実環境テストは、プロジェクト設定後に必要です。SDKはGoogleのCDNからバージョン固定で読み込みます。
