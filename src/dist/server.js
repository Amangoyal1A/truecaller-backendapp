"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const sequelizeConnection_1 = require("./connection/sequelizeConnection");
const PORT = 9000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelizeConnection_1.SequelizeConnection.getInstance().then(() => {
        console.log("Postgres DB connected successfully.");
    }).catch((err) => {
        console.log("Postgres DB connected successfully.", err);
        sequelizeConnection_1.SequelizeConnection.closeConnection();
    });
    // Uncomment to populate dummy data
    //  await populateDummyData();
    app_1.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT} ✅`);
    });
});
startServer();
//# sourceMappingURL=server.js.map