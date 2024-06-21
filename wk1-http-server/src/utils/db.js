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

export const savePeopleDB = async (database) => {
  const db = await fs.writeFile(PEOPLE_DB_PATH, JSON.stringify(database, null, 2));
  return db;
};

export const saveCompanyDB = async (database) => {
  const db = await fs.writeFile(COMPANIES_DB_PATH, JSON.stringify(database, null, 2));
  return db;
};

export const insertPeopleDB = async (data, database) => {
  const db = await database();
  db.push(data);
  await savePeopleDB(db);
  return data;
};

export const insertCompanyDB = async (data, database) => {
  const db = await database();
  db.push(data);
  await saveCompanyDB(db);
  return data;
};
