"use server";
import qb from "@/libs/db/queryGenerator";
import db from "@/libs/db/dbOracle";
import { files, File, NewFile } from "@/types/models/files";
import { and, eq } from "drizzle-orm";

import { getUserByUsername } from "./auth/lib/userStatements";
import { createUser } from "./auth/lib/userStatements";

export { createUser, getUserByUsername };

import { getFileByOwner, createFile } from "./dashboard/lib/fileStatements";

export { getFileByOwner, createFile };