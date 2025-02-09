import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createNewMeetingAsync from '../Shared/graph';

let teamsMeetingLink;
let displayName;
let acsAttendant;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
    context.log("Request received");
    //const userId = process.env.USER_ID;
    //context.log('UserId: ', userId);
    //const groupId = process.env.GROUP_ID;
    //context.log('GroupId: ', groupId);
    displayName = req.query["displayName"];
    acsAttendant = req.query["acsAttendant"];

    const objectId = acsAttendant;
    teamsMeetingLink = await createNewMeetingAsync(objectId, displayName);
    const body = JSON.stringify(teamsMeetingLink);
    const meeting = JSON.parse(body);
    context.log("Meeting: ", meeting);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: meeting.onlineMeeting.joinUrl
    }    
};

export default httpTrigger;