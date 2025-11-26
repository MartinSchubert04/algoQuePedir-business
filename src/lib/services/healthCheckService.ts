import axios from "axios";
import { REST_SERVER_URL } from "./configuration";
import { getAxiosData } from "./common";

class HealthService{
  async healthCheck(){
    const getHealthCheck = () => axios.get(REST_SERVER_URL + '/health')
    return await getAxiosData(getHealthCheck)
  }
}

export const healthService = new HealthService()