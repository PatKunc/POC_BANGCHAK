<script setup>
import Sidebar from "../components/Sidebar.vue";
import { onMounted, provide, ref } from "vue";
import { useTokenStore } from "../stores/tokenStore";
import apiService from "../composable/fetch";

const allProducts = ref([]);
// const api = '/api'
const pathProduct = ref("/Products");
const pageInformation = ref({});
const isDisablePrev = ref(true);
const isDisableNext = ref(false);
const rowParam = ref("10");
const searchText = ref("");
const categoryParam = ref("");

const rowSelect = async () => {
  allProducts.value = await apiService.get(
    pathProduct.value,
    1,
    rowParam.value,
    searchText.value,
    categoryParam.value
  );
  pageInformation.value = allProducts.value;
  // isDisableNext.value = false
  // isDisablePrev.value = true
  if (
    pageInformation.value.nextPage === null &&
    pageInformation.value.previousPage !== null
  ) {
    isDisableNext.value = true;
    isDisablePrev.value = false;
  } else if (
    pageInformation.value.previousPage === null &&
    pageInformation.value.nextPage !== null
  ) {
    isDisablePrev.value = true;
    isDisableNext.value = false;
  } else {
    isDisableNext.value = true;
    isDisablePrev.value = true;
  }
};

const search = async () => {
  allProducts.value = await apiService.get(
    pathProduct.value,
    1,
    rowParam.value,
    searchText.value,
    categoryParam.value
  );
  pageInformation.value = allProducts.value;

  if (
    pageInformation.value.nextPage === null &&
    pageInformation.value.previousPage !== null
  ) {
    isDisableNext.value = true;
    isDisablePrev.value = false;
  } else if (
    pageInformation.value.previousPage === null &&
    pageInformation.value.nextPage !== null
  ) {
    isDisablePrev.value = true;
    isDisableNext.value = false;
  } else {
    isDisableNext.value = true;
    isDisablePrev.value = true;
  }
  // console.log(searchText.value)
};

const goNext = async () => {
  allProducts.value = await apiService.goTo(
    pageInformation.value.nextPage,
    searchText.value,
    categoryParam.value
  );
  pageInformation.value = allProducts.value;

  if (pageInformation.value.nextPage === null) {
    isDisableNext.value = true;
    isDisablePrev.value = false;
  } else if (pageInformation.value.pageNumber !== 1) {
    isDisablePrev.value = false;
  } else {
    isDisableNext.value = false;
  }
};

const goPrev = async () => {
  allProducts.value = await apiService.goTo(
    pageInformation.value.previousPage,
    searchText.value,
    categoryParam.value
  );
  pageInformation.value = allProducts.value;

  if (pageInformation.value.pageNumber === 1) {
    isDisablePrev.value = true;
    isDisableNext.value = false;
  } else if (pageInformation.value.nextPage !== null) {
    isDisableNext.value = false;
  } else {
    isDisablePrev.value = false;
  }
};

const goLast = async () => {
  allProducts.value = await apiService.goTo(
    pageInformation.value.lastPage,
    searchText.value,
    categoryParam.value
  );
  pageInformation.value = allProducts.value;

  isDisablePrev.value = false;
  isDisableNext.value = true;
};

const goFirst = async () => {
  allProducts.value = await apiService.goTo(
    pageInformation.value.firstPage,
    searchText.value,
    categoryParam.value
  );
  pageInformation.value = allProducts.value;

  isDisablePrev.value = true;
  isDisableNext.value = false;
};

const clear = async () => {
  searchText.value = "";
  allProducts.value = await apiService.get(pathProduct.value, 1, 10);
  pageInformation.value = allProducts.value;
  categoryParam.value = "";
  rowParam.value = 10;
};

onMounted(async () => {
  allProducts.value = await apiService.get(pathProduct.value, 1, 10);
  console.log(allProducts.value);
  pageInformation.value = allProducts.value;
});
</script>

<template>
  <Sidebar />
  <div class="all ml-52 flex flex-col min-h-screen border-solid dark:bg-white">
    <div class="flex flex-col items-center justify-center">
      <h1
        class="p-5 mb-4 font-sans font-bold text-xl md:text-3xl w-full justify-center items-center flex bg-green-500 text-white"
      >
        Home
      </h1>
    </div>

    <div class="border-2 border-gray-700 border-solid m-4 rounded-lg">
      <div class="p-4 bg-gray-700 w-full flex flex-row">
        <h1 class="font-bold text-2xl text-white">Product table</h1>
        <input
          v-model="searchText"
          @input="search"
          class="rounded-lg ml-8 pl-2"
          placeholder="search product"
        />
        <select
          @change="search"
          v-model="categoryParam"
          id="row"
          name="row"
          class="ml-5 border-2 border-gray-600 border-solid rounded-xl pl-2 text-base sm:text-sm mr-3 w-1/11 text-black dark:text-white"
        >
          <option value="" selected>- Filter category -</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
        <button
          class="bg-white ml-4 p-2 rounded-lg hover:bg-gray-400 hover:animate-pulse dark:text-black"
          @click="clear"
        >
          clear
        </button>
      </div>

      <div class="m-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Descriptions</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Instock Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in allProducts.data"
              :key="product.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ product.name }}
              </th>
              <td class="px-6 py-4">
                {{ product.price }}
              </td>
              <td class="px-6 py-4">
                {{ product.description }}
              </td>
              <td class="px-6 py-4">
                {{ product.category }}
              </td>
              <td class="px-6 py-4">
                {{ product.stockQuantity }}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <h1
            class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400 w-full p-2"
          >
            <select
              @change="rowSelect"
              v-model="rowParam"
              id="row"
              name="row"
              class="border-2 border-gray-600 border-solid rounded-xl pl-2 text-base sm:text-sm mr-3 w-1/12 text-black dark:bg-white"
            >
              <option value="" disabled>- Select row to display -</option>
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
            </select>

            page {{ pageInformation.pageNumber }} of
            {{ pageInformation.totalPages }}

            <button
              class="mx-2 text-sm bg-gray-600 p-1 rounded-full hover:bg-gray-400 hover:text-gray-800"
              @click="goFirst"
              :disabled="isDisablePrev"
            >
              <<
            </button>
            <button
              class="mr-2 text-sm bg-gray-600 p-1 rounded-full hover:bg-gray-400 hover:text-gray-800"
              @click="goPrev"
              :disabled="isDisablePrev"
            >
              <
            </button>
            <button
              class="text-sm bg-gray-600 p-1 rounded-full hover:bg-gray-400 hover:text-gray-800"
              @click="goNext"
              :disabled="isDisableNext"
            >
              >
            </button>
            <button
              class="mx-2 text-sm bg-gray-600 p-1 rounded-full hover:bg-gray-400 hover:text-gray-800"
              @click="goLast"
              :disabled="isDisableNext"
            >
              >>
            </button>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
