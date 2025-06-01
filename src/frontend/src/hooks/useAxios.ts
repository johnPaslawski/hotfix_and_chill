import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://solarcalc-e6gehvg2fxa7hbem.westeurope-01.azurewebsites.net",
});

const useAxios = () => {
  return axiosClient;
};

export default useAxios;
