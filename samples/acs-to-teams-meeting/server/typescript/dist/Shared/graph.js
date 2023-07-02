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
//import { startDateTimeAsync, endDateTimeAsync } from './dateTimeFormat';
const identity_1 = require("@azure/identity");
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
const azureTokenCredentials_1 = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
require("isomorphic-fetch");
let clientSecretCredential;
let appGraphClient;
function ensureGraphForAppOnlyAuth() {
    if (!clientSecretCredential) {
        clientSecretCredential = new identity_1.ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    }
    if (!appGraphClient) {
        const authProvider = new azureTokenCredentials_1.TokenCredentialAuthenticationProvider(clientSecretCredential, {
            scopes: ['https://graph.microsoft.com/.default']
            //scopes: [ 'https://graph.microsoft.com/v1.0' ]
        });
        appGraphClient = microsoft_graph_client_1.Client.initWithMiddleware({
            authProvider: authProvider
        });
    }
}
function createNewMeetingAsync(objectId, displayName) {
    return __awaiter(this, void 0, void 0, function* () {
        ensureGraphForAppOnlyAuth();
        //let startTime = await startDateTimeAsync();
        //let endTime = await endDateTimeAsync();
        var current_ms = new Date().getTime();
        let startTime = new Date(current_ms);
        let endTime = new Date(current_ms + (10 * 60 * 1000)); // Add 10 mins * 60 sec * 1000 msec
        //const newMeeting = `/groups/${objectId}/calendar/events`;
        const newMeeting = `/users/${objectId}/calendar/events`;
        const event = {
            subject: 'Support Meeting: ' + displayName,
            start: {
                dateTime: startTime,
                timeZone: 'UTC'
            },
            end: {
                dateTime: endTime,
                timeZone: 'UTC'
            },
            isOnlineMeeting: true
        };
        const newEvent = yield appGraphClient.api(newMeeting).post(event);
        return newEvent;
    });
}
exports.default = createNewMeetingAsync;
//# sourceMappingURL=graph.js.map