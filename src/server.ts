import { app } from "./app";
import { SequelizeConnection } from "./connection/sequelizeConnection";
import { populateDummyData } from "./utils/dummyData";

const PORT = 9000;

const startServer = async () => {

  await SequelizeConnection.getInstance().then(() => {
    console.log("Postgres DB connected successfully.");
  }).catch((err) => {
    console.log("Postgres DB connected successfully.", err);
    SequelizeConnection.closeConnection();
  });

  // Uncomment to populate dummy data
  //  await populateDummyData();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} ✅`);
  });
};

startServer();
