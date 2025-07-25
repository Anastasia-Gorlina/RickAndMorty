<script setup lang="ts">
import { onMounted } from 'vue'
import { useEpisodeStore } from '@/stores/episode'
import EpisodeCard from '@/components/EpisodeCard.vue'

const episodeStore = useEpisodeStore()

onMounted(() => {
  episodeStore.fetchAllEpisodes()
})
</script>

<template>
  <div class="episodes-page">
    <header class="header">
      <img src="../assets/logo.webp" />
      <input
        v-model="episodeStore.searchQuery"
        type="text"
        placeholder="Search episodes..."
        class="search-input"
      />
    </header>

    <div v-if="episodeStore.isLoading" class="loading">Loading episodes...</div>
    <div v-else-if="episodeStore.error" class="error">{{ episodeStore.error }}</div>
    <div v-else class="episodes-grid">
      <EpisodeCard
        v-for="episode in episodeStore.filteredEpisodes"
        :key="episode.id"
        :episode="episode"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.episodes-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  .header {
    position: sticky;
    display: flex;
    gap: 20px;
    top: 0;
    background: white;
    padding: 20px 10px;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    img {
        width: 70px;
        height: 50px;
    }
    h1 {
      margin: 0 0 16px 0;
      color: #42b983;
    }

    .search-input {
      width: 100%;
      padding: 10px 15px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        border-color: #42b983;
        outline: none;
      }
    }
  }

  .loading, .error {
    padding: 40px;
    text-align: center;
    font-size: 1.2rem;
  }

  .error {
    color: #ff4444;
  }

  .episodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }
}
</style>