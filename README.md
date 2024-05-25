# Drive clone with Nextjs - EdgeStore - Next-Auth

## To use

First, install the neccessary dependencies for the project

```bash
npm i
```

Then, run add the `.env` file, whit:

```s
NEXTAUTH_URL = "http://localhost:3000"
NEXTAUTH_SECRET = "http://10.240.8.16"

EDGE_STORE_ACCESS_KEY=****************
EDGE_STORE_SECRET_KEY=****************
```

Then, run the development server:

```bash
npm run dev
```