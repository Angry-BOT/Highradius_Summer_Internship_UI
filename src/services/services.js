import axios from 'axios';
import { SERVER_URL,ROLL_NUMBER } from '../utils/constants';


export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(select,openAmt,docType) {
  return axios.post(
    `http://localhost:8080/1705819/dataservlet`,
    {},
    {
      headers: {'Content-Type': 'application/json'},
      params: {
        pkId: select,
        openAmt: openAmt,
        docType: docType
      },
    }
  );
}