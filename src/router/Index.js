import { createRouter, createWebHistory } from "vue-router";
import { usePermissionsStore } from "../stores/permissionStore";
import HomeVue from "../views/Home.vue";
import LoginVue from "../views/Login.vue";
import Register from "../views/Register.vue"
import Test1 from '../components/Test1.vue'
import Test2 from '../components/Test2.vue'

const requireAccessToken = (to, from, next) => {
  if (localStorage.getItem('accessToken')) {
    next()
  } else {
    alert('Please login')
    next('/login');
  }
}

const requirePermission =(to, from, next) => {
  const userRole = localStorage.getItem('role'); // Get the user's role from local storage
  const permissionsStore = usePermissionsStore(); // Access the permissions store
  const permissionLink = permissionsStore.getPermissions // Get permissions from the store

  const routePermission = permissionLink.find(link => link.to.name === to.name)
  // if(localStorage.getItem('accessToken')){
  if (routePermission && routePermission.roles && !routePermission.roles.includes(userRole)) {
    alert('Access Denied')
    return next({ path: '/home' });
  }
// }
  // Allow the navigation
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginVue,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeVue,
      beforeEnter: [requireAccessToken,requirePermission],
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: [requireAccessToken,requirePermission],
    },
    {
      path: '/test1',
      name: 'Test1',
      component: Test1,
      beforeEnter: [requireAccessToken,requirePermission],
    },
    {
      path: '/test2',
      name: 'Test2',
      component: Test2,
      beforeEnter: [requireAccessToken,requirePermission],
    },
  ],
});

// Navigation guard to check for required roles
// router.beforeEach((to, from, next) => {
//   const userRole = localStorage.getItem('role'); // Get the user's role from local storage
// console.log(JSON.stringify(to))
//   if (to.matched.some(record => record.meta.requiresAdmin)) {
//     // Check if the route requires admin access
//     if (userRole !== 'Admin') {
//       // If the user is not an admin, show an alert and redirect to home
//       alert('Access Denied');
//       return next({ path: '/home' });
//     }
//   }

//   // Allow the navigation
//   next();
// });

// Navigation guard to check for required roles
// Navigation guard to check for required roles and login status
// router.beforeEach((to, from, next) => {
//   const accessToken = localStorage.getItem('accessToken');
//   const userRole = localStorage.getItem('role'); // Get the user's role from local storage
//   const permissionLink = JSON.parse(localStorage.getItem('permissions')) // Get permissions from local storage

//   if(permissionLink.length !== 0){
//   if (!accessToken) {
//     // If no access token, only allow access to the login page
//     if (to.name !== 'Login') {
//       alert('Please login');
//       return next({ name: 'Login' });
//     }
//   } else {
//     // If the user is logged in, check for role-based access control
//     if (permissionLink) {
//       const routePermission = permissionLink.find(link => link.to.name === to.name);

//       if (routePermission && routePermission.roles && !routePermission.roles.includes(userRole)) {
//         alert('Access Denied');
//         return next({ name: 'Home' });
//       }
//     }
//   }
// }

//   // Allow the navigation
//   next();
// });

// Navigation guard to check for required roles
// router.beforeEach((to, from, next) => {
//   const userRole = localStorage.getItem('role'); // Get the user's role from local storage
//   const permissionsStore = usePermissionsStore(); // Access the permissions store
//   const permissionLink = permissionsStore.getPermissions; // Get permissions from the store

//   const routePermission = permissionLink.find(link => link.to.name === to.name)
//   // if(localStorage.getItem('accessToken')){
//   if (routePermission && routePermission.roles && !routePermission.roles.includes(userRole)) {
//     alert('Access Denied')
//     return next({ path: '/home' });
//   }
// // }
//   // Allow the navigation
//   next()
// })



export default router;
