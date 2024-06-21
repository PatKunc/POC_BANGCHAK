<script setup>
import Sidebar from './Sidebar.vue'
import apiService from '../composable/fetch'
import { ref, onMounted } from 'vue';


// const weatherForecast = ref()
const pageSizeParam = ref('')
const pageSizeValue = ref('')
const nameParam = ref('')
const nameValue = ref('')
const categoryParam = ref('')
const categoryValue = ref('')
const allParams = ref('')
const allData = ref()
const pathProduct = ref('/Products')
const pageInformation = ref({})
const productsArray = ref()

const paramsCompute = ()=>{
    if(pageSizeValue.value === ''){
        pageSizeParam.value = ''
    }else{
        pageSizeParam.value = `&pageSize=${pageSizeValue.value}`
    }

    if(categoryValue.value === ''){
        categoryParam.value = ''
    }else{
        categoryParam.value = `&Category=${categoryValue.value}`
    }

    if(nameValue.value === ''){
        nameParam.value = ''
    }else{
        nameParam.value = `&Name=${nameValue.value}`
    }

    allParams.value = pageSizeParam.value+categoryParam.value+nameParam.value
    console.log(allParams.value)
}

const getData = async()=>{
    allData.value = await apiService.getWithParams(pathProduct.value,1,allParams.value)
    productsArray.value = allData.value.data
    console.log(allData.value)
    pageInformation.value = allData.value
}

const clear = async () => {
  allParams.value = ''
  nameValue.value = ''
  pageSizeValue.value = ''
  categoryValue.value = ''
  allData.value = await apiService.getWithParams(pathProduct.value, 1,allParams.value)
  productsArray.value = allData.value.data
  pageInformation.value = allProducts.value
  categoryValue.value = "";
  pageSizeValue.value = 10;
};

onMounted(async ()=>{
    // weatherForecast.value = await apiService.get('','/WeatherForecast')
    // console.log(weatherForecast.value)
    allData.value = await apiService.get(pathProduct.value, 1, 10)
    productsArray.value = allData.value.data
    console.log(productsArray.value)
    pageInformation.value = allData.value
})
</script>
 
<template>
<Sidebar />
<div class="ml-56">
Test 1

<input class="border-2 border-black border-solid" @input="paramsCompute" v-model="nameValue">
<select
            @change="paramsCompute"
            v-model="categoryValue"
            id="row"
            name="row"
            class="ml-5 border-2 border-gray-600 border-solid rounded-xl pl-2 text-base sm:text-sm mr-3 w-1/11 text-black dark:text-white"
        >
            <option value="" selected>- Filter category -</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
</select>

<select
            @change="paramsCompute"
            v-model="pageSizeValue"
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

        <button class="bg-white ml-4 p-2 rounded-lg hover:bg-gray-400 hover:animate-pulse dark:text-black"
         @click="getData">
         Search
        </button>

        <button
          class="bg-white ml-4 p-2 rounded-lg hover:bg-gray-400 hover:animate-pulse dark:text-black"
          @click="clear"
        >
          clear
        </button>

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
              v-for="product in productsArray"
              
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
        <!-- <div>
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
        </div> -->
      </div>
        
</div>


</template>
 
<style scoped>

</style>