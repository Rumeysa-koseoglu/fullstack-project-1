//file that manages db connection settings

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); //imports information from .dotenv file (e.g PGUSER PGPASSWORD... and those are classified information to connect PostgreSQL)

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

//creating a connection object named sql with the neon function
// creates a SQL connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely

// psql 'postgresql://neondb_owner:npg_Rpr31mtbLMBE@ep-nameless-thunder-adrsglcc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
