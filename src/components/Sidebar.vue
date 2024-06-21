<script setup>
import {ref,onMounted} from 'vue'
import { RouterLink,useRouter } from "vue-router";
import permissionLink from "../router/accessPermission"
import { useTokenStore } from "../stores/tokenStore.js"

const tokenStore = useTokenStore()
// const userRole = ref()
const links = ref()
const router = useRouter();
const { userRole } = useTokenStore()

const signout = () => {
  tokenStore.setAccessToken("");
  tokenStore.setRefreshToken("");
  tokenStore.setRole('')
  // tokenStore.setPermission('')
  router.push("/login");
}

onMounted(async ()=>{
  // console.log(userRole)
  links.value = permissionLink.filter(link => link.roles.includes(userRole))
  // console.log(links.value)
})
</script>

<template>
  
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-600 dark:bg-gray-600">
      <div class="header min-h-14 w-full"></div>
      <ul class="space-y-2 font-medium">
        <RouterLink v-for="link in links" :key="link.name" :to="link.to">
          <li>
            <a class="flex items-center p-2 rounded-lg text-white hover:bg-green-500 group hover:shadow-md hover:shadow-orange-400">
              <svg v-if="link.icon" class="w-6 h-6 text-white" aria-hidden="true"  :width="24" :height="24" fill="transparent" viewBox="0 0 24 24">
                <path v-bind="link.icon.pathAttrs" />
              </svg>
              <span class="ms-3">{{ link.label }}</span>
            </a>
          </li>
        </RouterLink>
        <!-- <RouterLink :to="{ name: 'Login' }"> -->
          <li onclick="confirmSignout.showModal()" class="cursor-pointer">
            <a
              class="flex items-center p-2 rounded-lg text-white hover:bg-green-500 group hover:shadow-md hover:shadow-orange-400"
            >
              <svg
                class="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap cursor-pointer">Sign Out</span>
            </a>
          </li>
        <!-- </RouterLink> -->
      </ul>
    </div>
  </aside>

  <dialog id="confirmSignout" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Logging Out!</h3>
    <p class="py-4">Are you sure you want to log out</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-error mx-3" @click="signout">Log out</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</template>

<style scoped>
a {
  transition: 0.3s;
}
.header {
  background-image: url('../assets/logo.png');
  background-size: cover; /* Optional: ensures the image covers the entire element */
  background-position: center; /* Optional: centers the background image */
}
</style>
