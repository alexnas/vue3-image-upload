<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const description = ref('');
const selectedFile = ref(null);
const previewSource = ref(null);
const isFileInput = ref(false);

const isFormValid = computed(() => {
  return isFileInput && description.value.trim().length > 5;
});

const onFileSelected = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  isFileInput.value = !!e.target.value;
  previewImage(file);
};

const previewImage = (file) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      selectedFile.value = file;
      previewSource.value = reader.result || null;
    };
  } catch (error) {
    console.log(error);
  }
};

const handleReset = () => {
  document.getElementById('fileUpload').value = '';
  description.value = '';
  selectedFile.value = null;
  previewSource.value = null;
  isFileInput.value = false;
};

const handleSubmit = () => {
  let formData = new FormData();
  formData.append('files', selectedFile.value);
  formData.append('description', description.value);

  uploadData(formData);
};

const uploadData = async (formData) => {
  try {
    const result = await axios.post('http://127.0.0.1:5001/api/upload', formData, {
      headers: {
        'Content-Type': `multipart/form-data}`,
      },
    });
    console.log('result =================== ', result);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="my-8 max-w-xl">
    <div class="mb-3">
      <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal">Image description</label>
      <input
        name="description"
        type="text"
        v-model="description"
        class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Image description"
      />
    </div>

    <div class="mb-3">
      <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal">Image file</label>
      <div
        class="mt-2 p-2 w-full text-sm text-gray-600 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      >
        <div v-if="isFileInput" class="mb-5">
          <img :src="`${previewSource}`" type="file" alt="New Image" />
        </div>

        <div class="flex">
          <input
            name="description"
            type="file"
            id="fileUpload"
            @change.prevent="onFileSelected"
            aria-describedby="file_input_help"
          />
        </div>

        <div class="mt-1 pl-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG or JPG</div>
      </div>
    </div>

    <div class="flex items-center justify-start w-full mt-4">
      <button
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 sm:rounded-lg text-white px-8 py-2 text-sm"
        type="submit"
        :disabled="!isFormValid"
        @click.prevent="handleSubmit"
      >
        Submit
      </button>

      <button
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-500 transition duration-150 text-gray-100 ease-in-out hover:border-gray-400 hover:bg-gray-400 border sm:rounded-lg px-8 py-2 text-sm"
        @click.prevent="handleReset"
        type="reset"
      >
        Reset
      </button>
    </div>
  </div>
</template>
