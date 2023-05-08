# TravelScheduler
---
### To run the project:
**clone the repo**
```
git clone git@github.com:roychshao/TravelScheduler.git
```
**create .env file in /backend like**
```properties
PORT=3000
SECRET=***

DB_HOST="localhost"
DB_USER="root"
DB_PWD="root"
DB_PORT=3306
DB_DATABASE"TravelScheduler
```

**run backend**
```
pnpm install
pnpm start
```

**create .env.local in /frontend like**
```properties
VITE_HOST_URL="http://localhost:3000/"
```

**run frontend**
```
pnpm install
pnpm run dev
```
**then open localhost:3000 in the browser**
