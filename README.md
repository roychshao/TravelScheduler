# TravelScheduler
---
### To run the project:
**clone the repo**
```
git clone git@github.com:roychshao/TravelScheduler.git
```
**install dependencies**
```
pnpm install
```
**create .env file of your own**
```properties
PORT=3000
SECRET=***

DB_HOST=***
DB_USER=***
DB_PWD=***
DB_PORT=***
DB_DATABASE=***
```
**build the static resource**
```
cd view
pnpm install
pnpm run build
```
**back to /TravelScheduler and start**
```
cd ../
pnpm start
```
**open localhost:3000 in the browser and see the website**
