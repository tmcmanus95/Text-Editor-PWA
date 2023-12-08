import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDatabase = await openDB("jate", 1);
  const tx = jateDatabase.transaction("jate", "readwrite");
  const storedInfo = tx.objectStore("jate");
  const request = storedInfo.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to the database", result.value);
};

export const getDb = async () => {
  console.log("GET from the database");
  const jateDatabase = await openDB("jate", 1);
  const tx = jateDatabase.transaction("jate", "readonly");
  const storedInfo = tx.objectStore("jate");
  const request = storedInfo.get(1);
  const result = await request;
  result
    ? console.log("Data retrieved from the database", result.value)
    : console.log("Data not found in the database");
  return result?.value;
};

initdb();
