# Drive clone with Nextjs - EdgeStore - Next-Auth

## To use

First, install the neccessary dependencies for the project

```bash
npm i
```

Then, add the `.env` file, whit:

```s
NEXTAUTH_URL = *****************
NEXTAUTH_SECRET = ****************

EDGE_STORE_ACCESS_KEY=****************
EDGE_STORE_SECRET_KEY=****************
```
Then, generate the migrations from drizzle code to sql statements:
```bash
cd db
```
```bash
npx drizzle-kit generate --name init_db
```
```bash
npx drizzle-kit push
```

Then, run the development server:

```bash
npm run dev
```