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
const graph_1 = require("../Shared/graph");
let teamsMeetingLink;
let displayName;
let acsAttendant;
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log("Request received");
        //const userId = process.env.USER_ID;
        //context.log('UserId: ', userId);
        //const groupId = process.env.GROUP_ID;
        //context.log('GroupId: ', groupId);
        displayName = req.query["displayName"];
        acsAttendant = req.query["acsAttendant"];
        const objectId = acsAttendant;
        teamsMeetingLink = yield (0, graph_1.default)(objectId, displayName);
        const body = JSON.stringify(teamsMeetingLink);
        const meeting = JSON.parse(body);
        context.log("Meeting: ", meeting);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: meeting.onlineMeeting.joinUrl
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map