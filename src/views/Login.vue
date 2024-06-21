<script setup>
import { useRouter } from 'vue-router'
import { ref,onMounted } from 'vue'
import apiService from '../composable/fetch'
import { useTokenStore } from "../stores/tokenStore.js"
import { jwtDecode } from 'jwt-decode'
import permissionLink from '../router/accessPermission.js'

// console.log(apiService.getProducts())

const router = useRouter()
// const data = ref()
const username = ref("")
const password = ref("")
const loginData = ref({})
const errorMsg = ref('')
const tokenStore = useTokenStore()
const successMsg = ref('')
const loading = ref(false)
// const {accessToken} = useTokenStore()
// const decodedToken = jwtDecode(accessToken)

const login = async () => {
  loginData.value = {
    email: username.value,
    password: password.value,
  }
  loading.value = true
  try {
    const res = await apiService.login(loginData.value);
    if (res.status === 200) {
      tokenStore.setAccessToken(res.data.accessToken);
      tokenStore.setRefreshToken(res.data.refreshToken);
      const decodedToken = jwtDecode(res.data.accessToken)
      tokenStore.setRole(decodedToken.role)
      // tokenStore.setPermission(JSON.stringify(permissionLink))

      // Calculate the time remaining until the access token expires
      const expireDate = new Date(res.data.accessToken_ExpireDate);
      const currentTime = new Date();
      const timeRemaining = expireDate - currentTime;
      successMsg.value = 'Login complete !'

      // Set timeout to clear tokens and redirect to login when token expires

      setTimeout(() => {
        router.push('/home');

        setTimeout(() => {
        tokenStore.setAccessToken('');
        tokenStore.setRefreshToken('');
        tokenStore.setRole('');
        alert('Session expired. Please log in again.');
        router.push('/login');
      }, (1000*60)*30);
      }, 1500);
    }
  } catch (error) {
    console.error('Login failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      if (error.response.status === 400 || error.response.status === 401) {
        errorMsg.value = "Invalid username or password";
        loading.value = true
      } else {
        errorMsg.value = "Something went wrong. Please try again later.";
        loading.value = true
      }
    } else if (error.request) {
      console.error('Request data:', error.request);
      errorMsg.value = "No response from server. Please check your network connection.";
      loading.value = true
    } else {
      console.error('Error message:', error.message);
      errorMsg.value = "An error occurred. Please try again.";
      loading.value = true
    }
    setTimeout(() => {
      errorMsg.value = ""
      loading.value = false
    }, 3000);
  }
}

onMounted(async() =>{
  loginData.value = {
    email: username.value,
    password: password.value,
  }
})
</script>

<template>
  <div class="all flex flex-col items-center justify-center min-h-screen">
    <h1 v-if="errorMsg != ''" class="p-2 font-bold rounded-md bg-red-500 text-white">{{ errorMsg }}</h1>
    <h1 v-if="successMsg != ''" class="p-2 font-bold rounded-md bg-green-600 text-white">{{ successMsg }}</h1>
    <div class="login-dialog w-full 2xl:w-1/4 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 p-2">
      <div
        class="header-login p-5 m-2 font-sans font-bold text-xl md:text-3xl text-white rounded-lg"
      >
        <h1>Login</h1>
      </div>
      <div class="flex flex-col pr-4">
        <input 
          class="input border-2 border-gray-400 border-solid rounded m-2 mt-4 p-2 w-full focus:border-orange-500"
          placeholder="USERNAME"
          v-model="username"
          @keydown.enter="login"
        />
        <input
          class="input border-2 border-gray-400 border-solid rounded m-2 mt-6 mb-6 p-2 w-full"
          placeholder="PASSWORD"
          type="password"
          v-model="password"
          @keydown.enter="login"
        />
        <button class="login bg-orange-500 w-full m-2 p-2 text-white rounded-lg" 
        @click="login">
          LOG IN
        </button>
        <div v-if="loading === true" class="items-center flex flex-col"><span class="loading loading-spinner loading-md"></span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-login {
  background: linear-gradient(90deg, #34d135 20%, #8adf34 80%);
}
.input:focus {
  border-color: orange; /* Change this color to your desired focus border color */
  outline: none; /* Remove default outline */
  caret-color: orange; /* Set the color of the caret */
}
.input:focus::placeholder {
  color: orange;
}
.input::placeholder {
  font-size: 12px; /* Adjust this value to change the font size */
  font-weight: bold;
  color: lightgray /* Optional: Change placeholder color */
}
.all {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("../assets/bangchak.jpg");
  background-size: cover; /* Ensures the background image covers the entire screen */
  background-position: center; /* Centers the background image horizontally and vertically */
}
.login {
  transition: 0.3s;
}
.login:hover {
  background-color: orange;
  /* font-weight: bold; */
}
</style>../composable/fetch.js
