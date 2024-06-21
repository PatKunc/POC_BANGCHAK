<script setup>
import Sidebar from "../components/Sidebar.vue"
import { ref,onMounted } from "vue"
import apiService from "../composable/fetch";

const role = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const objToRegis = ref({})
const errorMsg = ref('')
const successMsg = ref('')

const clear = ()=>{
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  successMsg.value = ''
  errorMsg.value = ''
}

const register = async ()=>{
  // objToRegis.value = {
  //     email: username.value,
  //     password: password.value,
  //     role: role.value
  //   }

  // try {
  //   const response = await apiService.register(objToRegis)

  //   console.log('Registration successful:', response);
  //   // Optionally handle successful registration (e.g., show success message, redirect to login)

  // } catch (error) {
  //   console.error('Registration error:', error);
  //   errorMsg.value = 'Registration failed. Please try again.'; // Set error message for display in the template
  //   // Optionally handle registration error (e.g., show error message to user)
  // }
   // Check if any required fields are null or empty
   // Check if any required fields are null or empty
  if (!username.value || !password.value || !confirmPassword.value || !role.value) {
    successMsg.value = ''
    errorMsg.value = 'Please fill in all fields.'; // Set error message for display in the template
    return;
  }

  // Check if confirmPassword matches password
  if (confirmPassword.value !== password.value) {
    successMsg.value = ''
    errorMsg.value = 'Passwords do not match.'; // Set error message for display in the template
    return;
  }

  try {
    const response = await apiService.register({
      email: username.value,
      password: password.value,
      role: role.value
    });

    console.log('Registration successful:', response);
    errorMsg.value = ''
    successMsg.value = 'Registration successful'
    // Optionally handle successful registration (e.g., show success message, redirect to login)

  } catch (error) {
    console.error('Registration error:', error);
    errorMsg.value = 'Registration failed. Please try again.'; // Set error message for display in the template
    // Optionally handle registration error (e.g., show error message to user)
  }
}

onMounted(async()=>{
objToRegis.value ={
  email: '',
  password: '',
  role: '',
}
})
</script>

<template>
  <Sidebar />
  <div class="all ml-52 flex flex-col min-h-screen border-solid">
    <div class="flex flex-col items-center justify-center">
      <h1
        class="p-5 mb-4 font-sans font-bold text-xl md:text-3xl w-full  justify-center items-center flex bg-green-500 text-white"
      >
        Register
      </h1>
      <h1 v-if="errorMsg != ''" class="p-2 font-bold rounded-md bg-red-500 text-white">{{ errorMsg }}</h1>
      <h1 v-if="successMsg != ''" class="p-2 font-bold rounded-md bg-green-500 text-white">{{ successMsg }}</h1>
      <ul>
        <li>Role</li>
        <li>
            <select
            v-model="role"
            id="role"
            name="role"
            class="border-2 border-gray-400 border-solid rounded mt-2 mb-2 p-2 w-96 block pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
            <option value="" disabled selected>- Select Role -</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
        </select>
        </li>
        <li><h4>Email</h4></li>
        <li>
          <input
          v-model="username"
            placeholder="ex. mr_abc@gmail.com"
            class="input border-2 border-gray-400 border-solid rounded mt-2 mb-2 p-2 w-96 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </li>
        <li><h4>Password</h4></li>
        <li>
          <input
          v-model="password"
            placeholder="Enter password"
            type="password"
            class="input border-2 border-gray-400 border-solid rounded mt-2 mb-2 p-2 w-96 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </li>
        <li><h4>Confirm Password</h4></li>
        <li>
          <input
          v-model="confirmPassword"
            placeholder="Must matched with above password"
            type="password"
            class="input border-2 border-gray-400 border-solid rounded mt-2 mb-2 p-2 w-96 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </li>
        <li>
          <div class="justify-center items-center flex flex-row mt-4">
          <button @click="clear" class="clear p-3 bg-blue-500 hover:bg-blue-400 text-white rounded-md w-1/3 mr-4">Clear</button>
          <button @click="register" class="add p-3 bg-orange-500 text-white w-1/3 rounded-md">Add User</button>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.add,.clear{
  transition: 0.3s;
}
.add:hover{
  background-color: orange;
}
</style>
