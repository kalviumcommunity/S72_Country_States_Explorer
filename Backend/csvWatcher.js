require("dotenv").config();
const fs = require("fs");
const csvParser = require("csv-parser");
const { MongoClient } = require("mongodb");
const chokidar = require("chokidar");

// Load environment variables
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = "test";
const COLLECTION_NAME = "cities";
const CSV_FILE = "C:/Users/sripr/OneDrive/Desktop/Cities.csv"; // Corrected path

const client = new MongoClient(MONGO_URI);
let lastRowCount = 0; // Track the number of rows

async function importNewRecords() {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const data = await new Promise((resolve, reject) => {
            const rows = [];
            fs.createReadStream(CSV_FILE)
                .pipe(csvParser())
                .on("data", (row) => rows.push(row))
                .on("end", () => resolve(rows))
                .on("error", (error) => reject(error));
        });

        const currentRowCount = data.length;

        if (currentRowCount > lastRowCount) {
            const newRecords = data.slice(lastRowCount);
            await collection.insertMany(newRecords, { ordered: false });
            console.log(`Inserted ${newRecords.length} new records into MongoDB`);
            lastRowCount = currentRowCount;
        }
    } catch (error) {
        console.error("Error importing data:", error);
    }
}

// Watch for changes in the CSV file (use polling to fix OneDrive issues)
chokidar.watch(CSV_FILE, { usePolling: true }).on("change", (path) => {
    console.log(`✅ CSV file updated: ${path}`);
    importNewRecords();
});


console.log("Watching for changes in", CSV_FILE);
