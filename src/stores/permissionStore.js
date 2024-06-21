// stores/permissions.js
import { defineStore } from 'pinia';

const permissionLink = [
  {
    name: 'Home',
    label: 'Home',
    to: { name: 'Home' },
    roles: ['User', 'Admin'],
    icon: {
      svgAttrs: {
        class: 'w-6 h-6 text-gray-800 dark:text-white',
        'aria-hidden': 'true',
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      pathAttrs: {
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'm4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5',
      }
    }
  },
  {
    name: 'Register',
    label: 'Register',
    to: { name: 'Register' },
    roles: ['User', 'Admin'],
    icon: {
      svgAttrs: {
        class: 'w-6 h-6 text-gray-800 dark:text-white',
        'aria-hidden': 'true',
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      pathAttrs: {
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z'
      }
    }
  },
  {
    name: 'Test1',
    label: 'Test Admin',
    to: { name: 'Test1' },
    roles: ['Admin'],
    icon: {
      svgAttrs: {
        class: 'w-6 h-6 text-gray-800 dark:text-white',
        'aria-hidden': 'true',
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      pathAttrs: {
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28',
      }
    }
  },
  {
    name: 'Test2',
    label: 'Test Admin',
    to: { name: 'Test2' },
    roles: ['Admin'],
    icon: {
      svgAttrs: {
        class: 'w-6 h-6 text-gray-800 dark:text-white',
        'aria-hidden': 'true',
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      pathAttrs: {
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28',
      }
    }
  }
];

export const usePermissionsStore = defineStore('permissions', {
  state: () => ({
    permissions: permissionLink,
  }),
  getters: {
    getPermissions: (state) => state.permissions,
    getUserPermissions: (state) => (role) => state.permissions.filter(link => link.roles.includes(role)),
  },
  actions: {
    setPermissions(newPermissions) {
      this.permissions = newPermissions;
    },
  },
});
