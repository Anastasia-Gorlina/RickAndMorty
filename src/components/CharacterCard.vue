<script setup lang="ts">
import type { Character } from '@/types'

defineProps<{
  character: Character
}>()
</script>

<template>
  <article class="character-card">
    <img :src="character.image" :alt="character.name" class="character-image">
    <div class="character-info">
      <h3 class="character-name">{{ character.name }}</h3>
      <div class="character-meta">
        <span class="character-status" :class="`status-${character.status.toLowerCase()}`">
          {{ character.status }}
        </span>
        <span class="character-species">{{ character.species }}</span>
        <span class="character-gender">{{ character.gender }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.character-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .character-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .character-info {
    padding: 12px;

    .character-name {
      margin: 0 0 8px 0;
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .character-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      font-size: 0.75rem;
      color: #666;

      .character-status {
        &::before {
          content: '•';
          margin-right: 4px;
        }

        &.status-alive {
          color: #42b983;
        }

        &.status-dead {
          color: #ff4444;
        }

        &.status-unknown {
          color: #9e9e9e;
        }
      }
    }
  }
}
</style>