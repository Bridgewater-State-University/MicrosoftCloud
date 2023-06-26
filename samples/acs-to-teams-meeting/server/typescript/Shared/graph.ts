//import { startDateTimeAsync, endDateTimeAsync } from './dateTimeFormat';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import 'isomorphic-fetch';

let clientSecretCredential;
let appGraphClient;

function ensureGraphForAppOnlyAuth() {

  if (!clientSecretCredential) {
    clientSecretCredential = new ClientSecretCredential(
      process.env.TENANT_ID,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
  }

  if (!appGraphClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
        //scopes: [ 'https://graph.microsoft.com/v1.0' ]
      });

    appGraphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}

async function createNewMeetingAsync(objectId, displayName) {
    ensureGraphForAppOnlyAuth();
    //let startTime = await startDateTimeAsync();
    //let endTime = await endDateTimeAsync();
    var current_ms = new Date().getTime();
    let startTime = new Date(current_ms);
    let endTime = new Date(current_ms + (10*60*1000)); // Add 10 mins * 60 sec * 1000 msec
    //const newMeeting = `/groups/${objectId}/calendar/events`;
    const newMeeting = `/users/${objectId}/calendar/events`;

    const event = {
      subject: 'Support Meeting: '+displayName,
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
    
    const newEvent = await appGraphClient.api(newMeeting).post(event);
    return newEvent;     
}
      
export default createNewMeetingAsync;