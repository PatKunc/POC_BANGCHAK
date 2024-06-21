import axios from "axios";


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://localhost:7094", // Set your base URL here
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log("Interceptor config:", config); // Debug: log the config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

class ApiService {
  // /api/Products, /api/WeatherForecast
  async get(path,params,params2,params3,params4,params5,payload) {
    try {
      const response = await axiosInstance.get(`/api${path}?pageNumber=${params}&pageSize=${params2}&Name=${params3}&Category=${params4}`,payload)
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error;
    }
  }

  async goTo(path,name,category) {
    try {
      const response = await axiosInstance.get(`${path}&Name=${name}&Category=${category}`)
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error;
    }
  }

  async getWithParams(path,pageNumber,params,payload) {
    try {
      const response = await axiosInstance.get(`/api${path}?pageNumber=${pageNumber}${params}`,payload)
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error;
    }
  }

  async goToWithParams(path,pageNumber,params) {
    try {
      const response = await axiosInstance.get(`${path}?pageNumer=${pageNumber}${params}`)
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await axios.post(
        "https://localhost:7094/Auth/login",
        data
      );
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
      throw await error;
    }
  }

  async register(data) {
    try {
      const response = await axios.post(
        "https://localhost:7094/Auth/register",
        data
      );
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
      throw await error;
    }
  }
}

// Create an instance of the ApiService class
const apiService = new ApiService();

// Export the instance
export default apiService;
