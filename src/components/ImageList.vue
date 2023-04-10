<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const images = ref([]);

const fetchImages = async () => {
  try {
    const res = await fetch('http://127.0.0.1:5001/api/images');
    images.value = await res.json();
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchImages();
});

const deleteFile = async (file) => {
  const nameToDelete = `gobybus/${file.filename}`;
  try {
    const res = await fetch('http://127.0.0.1:5001/api/imageDestroy', {
      method: 'DELETE',
      body: JSON.stringify({ data: nameToDelete }),
      headers: { 'Content-Type': 'application/json' },
    });

    images.value = images.value.filter((image) => image.filename !== file.filename);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="my-8 max-w-xl">
    <h2 className="text-3xl font-medium mb-8">
      <span v-if="images.length > 0">({{ images.length }} images)</span>
      <span v-else>(No images)</span>
    </h2>

    <div v-if="images.length > 0">
      <div class="mb-12 p-2 bg-gray-100 border border-gray-300 rounded-lg" v-for="image in images" :key="image.filename">
        <div class="flex mb-4">
          <img :src="`${image.url}`" class="w-48 rounded-lg" alt="Image" />
          <div class="flex flex-col justify-end">
            <button
              class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ml-3 transition duration-150 text-gray-50 ease-in-out hover:border-orange-400 bg-orange-600 hover:bg-orange-400 border sm:rounded-lg text-base px-4 py-2 ml-16 h-min"
              @click="deleteFile(image)"
              type="button"
            >
              Delete Image
            </button>
          </div>
        </div>

        <div>{{ image.filename }}.{{ image.format }}</div>
      </div>
    </div>
  </div>
</template>
