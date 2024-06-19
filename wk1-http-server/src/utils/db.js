import fs from "node:fs/promises";

const PEOPLE_DB_PATH = new URL("../../data/people.json", import.meta.url).pathname;
const COMPANIES_DB_PATH = new URL("../../data/companies.json", import.meta.url).pathname;

export const getPeopleDB = async () => {
  const db = await fs.readFile(PEOPLE_DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const getCompaniesDB = async () => {
  const db = await fs.readFile(COMPANIES_DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (database, path) => {
  const db = await fs.writeFile(path, JSON.stringify(database, null, 2));
  return db;
};

export const insertDB = async (data, database, path) => {
  const db = await database();
  db.push(data);
  saveDB(database, path);
  return data;
};
