import axios from "axios";
import config from "../utils/config";

const BASE_URL = config.baseURLWorker.toString();

class WorkerService {
    addNewWorker = async (token, formData) => {
      console.log(formData);
        const data = {
            username: formData.username,
            password: formData.password
        };
        try{
            const res = await axios.post(`${BASE_URL}/add`, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            return res;
        }catch(error){
            return error.response;
        }
    }


  workerLogin = async (formData) => {
    const data = {
      username: formData.username,
      password: formData.password,
    };
    console.log(formData);
    try {
      const res = await axios.post(`${BASE_URL}/login`, data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  saveMsgs = async (token, formData) => {
    const data = {
      username: formData.username,
      message: formData.message,
    };
    try {
      const res = await axios.post(`${BASE_URL}/savemsg`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res; 
    } catch (error) {
      return error.response;
    }
  };
}

export default new WorkerService();
