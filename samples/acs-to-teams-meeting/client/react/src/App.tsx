import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {  
  CallComposite, 
  fromFlatCommunicationIdentifier, 
  useAzureCommunicationCallAdapter 
} from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

const App = () => { 
  const displayName = (document.getElementById('acsUserName') as HTMLInputElement).value;
  const acsAttendant = (document.getElementById('acsAttendantEmail') as HTMLInputElement).value;
  //const endpoint = process.env.REACT_APP_AZURE_COMMUNICATIONS_ENDPOINT_URL;
  //const endpoint = 'https://acs-sysopsdevtest-acs-eus-001.communication.azure.com/;accesskey=SKYWORjco+yRWdmDlDnav42pan0B2fBvh9KOxlTZ073OhKVLSpN/fWshGi1jV8JEE8OzqqZkzPGoEIcLu4yxgw==';
  //console.log('Endpoint: ', endpoint);
  //const [userId, setUserId] = useState<string>('8:acs:569ebeb4-670a-4a88-a5b0-ba2037f429f6_00000018-f3a8-6c81-3dfe-9c3a0d000329');
  //const [token, setToken] = useState<string>('eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFODQ4MjE0Qzc3MDczQUU1QzJCREU1Q0NENTQ0ODlEREYyQzRDODQiLCJ4NXQiOiJYb1NDRk1kd2M2NWNLOTVjelZSSW5kOHNUSVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjU2OWViZWI0LTY3MGEtNGE4OC1hNWIwLWJhMjAzN2Y0MjlmNl8wMDAwMDAxOC1mM2E4LTZjODEtM2RmZS05YzNhMGQwMDAzMjkiLCJzY3AiOjE3OTIsImNzaSI6IjE2ODUwMzI3MTYiLCJleHAiOjE2ODUxMTkxMTYsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6InZvaXAiLCJyZXNvdXJjZUlkIjoiNTY5ZWJlYjQtNjcwYS00YTg4LWE1YjAtYmEyMDM3ZjQyOWY2IiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTY4NTAzMjcxNn0.h0UELpUe15AXOr_a3GAWZnjC51SjZh6Ey-zI_hlV2JRhoVBBY1RGWOaHvJj11vvMvawAoscG_cNRymYjQmcZQdnybl7ZLBZqRR67_zAFRLVBKBc7NSo9EYuMY8_QC5IRHW9rm-YjWJhrUJPUdIfvICGQSpIuaeinXbOKmlTn-UdDM-pWJ6ZIthfvEJrY9C3DUMPmjq-hmefnVgiIAIeecf8I9fLwoRnNW1jrhnU_rpoNBxTQqdn0zwWiimceoCIVOguMtS-fE70H72reUFjGLTIc59qtJjGPmsADBlp1_Kngn4W7w23zgCZJyE3WarXFMAKkL8WxuSwozFRuCqoOKg');
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  //const [threadId, setThreadId] = useState('');
  
  const credential = useMemo(() => {
    if (token) {
      return new AzureCommunicationTokenCredential(token)
    }
    return;
  }, [token]);

  const callAdapterArgs = useMemo(() => {
    if (userId && credential && displayName && teamsMeetingLink) {
      return {
        userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
        displayName,
        credential,
        locator: { meetingLink: teamsMeetingLink }
      }
    }
    return {};
  }, [userId, credential, displayName, teamsMeetingLink]);

  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

  useEffect(() => {
    const init = async () => {
      setMessage('Getting ACS user');
      //Call Azure Function to get the ACS user identity and token
      const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
      const user = await res.json();
      setUserId(user.userId);
      //console.log('User ID: ', user.userId);
      setToken(user.token);
      //console.log('Token: ', user.token);

      setMessage('Getting Teams meeting link ...');
      //Call Azure Function to get the meeting link
      const teamsFunctionUrl = process.env.REACT_APP_TEAMS_MEETING_FUNCTION + '?displayName=' + displayName + '&acsAttendant=' + acsAttendant;
      const resTeams = await fetch(teamsFunctionUrl as string);
      const link = await resTeams.text();
      setTeamsMeetingLink(link);
      setMessage('');
    }
    init();
  }, []);

  if (callAdapter) {
    return (
      <div className="wrapper">
        <CallComposite
          adapter={callAdapter}
        />
      </div>
    );
  }
  if (!credential) {
    return <div>Creating a new calling credential ...</div>;
  }
  if (message) {
    return <div>{message}</div>;
  }
  return <div>Initializing a 10 minute meeting ...</div>;
};

export default App;