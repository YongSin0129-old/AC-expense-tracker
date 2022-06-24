![image](./public/pictures/login%20page.png)
![image](./public/pictures/index%20page.png)
![image](./public/pictures/new%20page.png)

# 網路個人記帳本

一個使用 Node.js 打造的個人記帳本

## Features - 產品功能

使用者可以：

-註冊帳號
  1. 註冊之後，可以登入/登出
  2. 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁

-在首頁一次瀏覽所有支出的清單
  1. 使用者只能看到自己建立的資料

-在首頁看到所有支出清單的總金額

-新增一筆支出 (資料屬性參見下方規格說明)

-編輯支出的屬性 (一次只能編輯一筆)

-刪除任何一筆支出 (一次只能刪除一筆)

-根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和


### Environment  - 開發環境

- Nodejs v16.14.2
- nodemon @2.0.16

### package  - 使用套件

By NPM
- "bcryptjs": "^2.4.3",
- "connect-flash": "^0.1.1",
- "dotenv": "^16.0.1",
- "express": "^4.18.1",
- "express-handlebars": "^6.0.6",
- "express-session": "^1.17.3",
- "method-override": "^3.0.0",
- "mongoose": "^6.4.0",
- "passport": "^0.6.0",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"

By CDN
- bootstrap 5
- font-awesome 6.1.1

### Installing - 專案安裝流程

1. 打開 terminal, Clone 此專案至本機電腦

```
git clone https://github.com/yongsin0129/expense-tracker.git
```

2. 使用終端機 Terminal, 進入存放此專案的資料夾

```
cd expense-tracker
```

3. 使用終端機 Terminal, 安裝 npm 套件

```
npm install
```

4. 在此專案的資料夾新增一個.env，env需放入的變數請參考 .env.example

5. 使用終端機 Terminal, 建立種子資料

```
npm run seed
```

6. 使用終端機 Terminal, 開啟 server

```
npm run start
```
看到訊息以下訊息表示成功執行此專案
```
expense-tracker listening on port 3000
mongoose ok !
```
7. 測試用帳號

```
為方便測試，登入頁 input value 已經設有 user1 資料，免手動輸入
{ name: 'user1', email: 'user1@example.com', password: '12345678' }
{ name: 'user2', email: 'user2@example.com', password: '12345678' }
```
## Acknowledgments

* alpha camp
