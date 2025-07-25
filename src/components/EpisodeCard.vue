<script setup lang="ts">
import type { Episode } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  episode: Episode
}>()

const navigateToEpisode = (id: number) => {
  router.push(`/episode/${id}`)
}
</script>

<template>
  <article class="episode-card" @click="navigateToEpisode(episode.id)">
    <h3 class="episode-title">{{ episode.name }}</h3>
    <div class="episode-meta">
      <span class="episode-number">{{ episode.episode }}</span>
      <span class="episode-date">{{ episode.air_date }}</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.episode-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .episode-title {
    margin: 0 0 8px 0;
    font-size: 1rem;
    color: #333;
  }

  .episode-meta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #666;

    .episode-number {
      font-weight: bold;
    }
  }
}
</style>