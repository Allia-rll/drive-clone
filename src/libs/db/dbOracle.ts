"use strict";

import { File } from "@/types/models/files";
import { User } from "@/types/models/user";
import { Query, max } from "drizzle-orm";
import oracledb from "oracledb";

type DBconfig = {
  user: string;
  password: string;
  connectString: string;
};

class dbOracle {
  private dbConfig: DBconfig;

  constructor(config: DBconfig) {
    this.dbConfig = config;
  }

  private cleanQuery(sql: string) {
    let query = sql;

    if (sql.includes(" where ")) {
      query = this.cleanWhere(query);
    }

    if (query.includes("limit")) {
      query = this.cleanLimit(query);
    }

    if (sql.includes("values")) {
      query = this.asingValues(query);
    }

    return query;
  }

  private cleanLimit(sql: string) {
    return (
      sql.substring(0, sql.indexOf("limit") - 1) +
      " fetch first :limit rows only"
    );
  }

  private cleanWhere(sql: string) {
    let newSql = sql;
    let i = 0;
    while (newSql.includes("?")) {
      newSql = newSql.replace("?", `:${i}`);
    }
    return newSql.replace(/"/g, "");
  }

  private asingValues(sql: string) {
    let newSql = sql;
    const columns = newSql.match(/"\w+",|"\w+"\)/g);
    const values = newSql.match(/(?<=values \()(.*)(?=\))/g);

    let tokens: Array<string> = [];

    if (values) {
      tokens = values[0].split(" ");
    }

    tokens?.forEach((token, i) => {
      const column = columns?.[i] as string;
      if (token.includes("?")) {
        newSql = newSql.replace(
          token,
          `:${column.substring(1, column.length - 2)},`
        );
      } else {
        newSql = newSql.replace(column, "");
        newSql = newSql.replace(token, "");
      }
    });
    return newSql
      .replace(/"/g, "")
      .replace(/,\s*\)/g, ")")
      .replace(/,\s*values/, ") values");
  }

  public async execute(q: Query): Promise<any> {
    let connection;
    try {
      connection = await oracledb.getConnection(this.dbConfig);
      let { sql, params } = q;
      let query: string;
      if (params) {
        query = this.cleanQuery(sql);
      } else {
        query = sql.replace(/"/g, "");
      }

      const result = await connection.execute(query, params, {
        autoCommit: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });

      if (query.includes("select") && result.rows) {
        if (query.includes("files")) {
          return result.rows.map((row: any) => {
            return {
              id: row.ID,
              filename: row.FILENAME,
              url: row.URL,
              owner: row.OWNER,
              type: row.TYPE,
              id_project: row.ID_PROJECT,
            } as File;
          }) as File[];
        }

        if (query.includes("users")) {
          return result.rows.map((row: any) => {
            return {
              id: row.ID,
              username: row.USERNAME,
              email: row.EMAIL,
              password: row.PASSWORD,
              created_at: row.CREATED_AT,
            };
          }) as User[];
        }
      }

      return result.rowsAffected;
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

const dbOracleSingleton = () => {
  const dbConfig = {
    user: "scloud",
    password: "scloud",
    connectString: "localhost:1521/xe",
  };

  return new dbOracle(dbConfig);
};

/* declare global {
  var dbOracle: ReturnType<typeof dbOracleSingleton> | undefined;
}
const db = global.dbOracle ?? dbOracleSingleton(); */

const db = dbOracleSingleton();

export default db;
/* 
if (process.env.NODE_ENV === "development") {
  global.dbOracle = db;
} */
