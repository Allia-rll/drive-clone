import { edgeStoreRouter } from "@/app/api/edgestore/[...edgestore]/route";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { initEdgeStore } from "@edgestore/server";
import {
  createEdgeStoreNextHandler,
  type CreateContextOptions,
} from "@edgestore/server/adapters/next/app";

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});
