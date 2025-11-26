import { REST_SERVER_URL } from './configuration';
import axios from 'axios';

class AuthService {

  async register(username: string, password: string, passConfirmation: string) {
    const body = 
    {
      user: {
        username,
        password
      },
      passConfirmation
    };

    const res = await axios.post(REST_SERVER_URL + '/register', body)
    
    return res.data
  }
  
  async login(username: string, password: string) {
    const body = { username, password };
    const res = await axios.post(REST_SERVER_URL + '/login', body);
    return res.data;
  }
}

export const authService = new AuthService()

