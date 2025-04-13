# Pawzzle 寵物美容預約平臺

線上網址：[https://pawzzle.zeabur.app/](https://pawzzle.zeabur.app/)

## 作品說明
![image](./public/demo/home.png)
![image](./public/demo/booking.png)

Pawzzle是一個提供線上預約寵物美容服務的平台，使用者可在首頁瀏覽並選擇合適的方案，接著於預約頁填寫基本資訊與日期，即可完成預約流程。<br>
會員登入後，可查看歷次預約紀錄及取消功能，並可編輯個人資料與管理寵物清單。

## 系統說明
Node: 建議 20 以上。
### Setup
Make sure to install dependencies:
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server
Start the development server on `http://localhost:3000`:
```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production
Build the application for production:
```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```
Locally preview production build:
```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 檔案結構
```txt
Pawzzle
├─ assets            // CSS檔案、icons
├─ components        // Vue元件
├─ composables       // 自定義的 Composition API 函式(如：useFetchApi)
├─ layouts           // 頁面佈局
├─ middleware        // 中介層邏輯(頁面存取權限控管)
├─ pages             // 路由頁面
├─ plugins           // 自定義插件(如api)
├─ public            // 靜態資源，圖片等
├─ stores            // Pinia 狀態管理
├─ utils             // 通用工具函式
├─ .env.example      
├─ .gitignore         
├─ app.vue           // 頁面主入口
├─ error.vue         // 自定義錯誤頁面元件
├─ nuxt.config.ts    
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```
## 使用技術
- [Nuxt 3](https://nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Quasar Framework](https://quasar.dev/)
- [nuxt-icons](https://nuxt.com/modules/icons)
- [nuxt-aos](https://nuxt.com/modules/aos)
- [vee-validate + yup](https://vee-validate.logaretm.com/v4/)
- [dayjs](https://day.js.org/)
- [eslint](https://eslint.org/)

## 參考資料
- [Custom useFetch in Nuxt](https://nuxt.com/docs/guide/recipes/custom-usefetch)
- [You are using useFetch WRONG! (I hope you don't)](https://www.youtube.com/watch?v=njsGVmcWviY)
- [The BEST way to proxy your API in Nuxt](https://www.youtube.com/watch?v=J4E5uYz5AY8)
- [Custom $fetch and Repository Pattern in Nuxt 3](https://www.youtube.com/watch?v=jXH8Tr-exhI)