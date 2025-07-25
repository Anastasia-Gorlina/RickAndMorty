<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEpisodeStore } from '@/stores/episode'
import CharacterCard from '@/components/CharacterCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, FreeMode  } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

const route = useRoute()
const episodeStore = useEpisodeStore()
const episode = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const modules = [Navigation]
const swiperModules = [Navigation, Pagination, FreeMode]

const swiperBreakpoints = {
  320: {
    slidesPerView: 1.2,
    spaceBetween: 10
  },
  480: {
    slidesPerView: 2.2,
    spaceBetween: 12
  },
  640: {
    slidesPerView: 3.2,
    spaceBetween: 14
  },
  768: {
    slidesPerView: 4.2,
    spaceBetween: 16
  },
  1024: {
    slidesPerView: 5.2,
    spaceBetween: 18
  },
  1280: {
    slidesPerView: 8,
    spaceBetween: 20
  }
}
const episodeId = computed(() => parseInt(route.params.id as string))
const episodeCharacters = computed(() => {
  if (!episode.value) return []
  return episode.value.characters
    .map((url: string) => {
      const id = parseInt(url.split('/').pop() || '0')
      return episodeStore.getCharacterById(id)
    })
    .filter(Boolean)
})

onMounted(async () => {
  try {
    isLoading.value = true
    episode.value = await episodeStore.fetchEpisodeDetails(episodeId.value)
    await episodeStore.fetchCharacters(episode.value.characters)
  } catch (err) {
    error.value = 'Failed to load episode details'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="episode-detail">
    <router-link to="/RickAndMorty" class="back-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="#42b983" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Все эпизоды
    </router-link>

    <div v-if="isLoading" class="loading">Загрузка данных...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <template v-else-if="episode">
      <div class="episode-card">
        <div class="episode-info">
          <h1 class="episode-title">{{ episode.name }}</h1>
          <div class="episode-meta">
            <span class="meta-badge episode-number">{{ episode.episode }}</span>
            <span class="meta-badge air-date">{{ episode.air_date }}</span>
          </div>
        </div>
      </div>

      <div class="characters-section">
        <h2 class="section-title">Персонажи эпизода</h2>
        
        <div v-if="episodeCharacters.length === 0" class="no-characters">
          Загрузка персонажей...
        </div>
        
        <div v-else class="characters-container">
          <Swiper
            :modules="swiperModules"
            :breakpoints="swiperBreakpoints"
            :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            }"
            :pagination="{ clickable: true }"
            :free-mode="true"
            class="characters-carousel"
        >
            <SwiperSlide v-for="character in episodeCharacters" :key="character.id">
            <CharacterCard :character="character" />
            </SwiperSlide>
            
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </Swiper>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.episode-detail {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
  color: #2c3e50;

  @media (max-width: 768px) {
    padding: 16px;
  }
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: #42b983;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #3aa876;
    transform: translateX(-2px);

    svg {
      transform: translateX(-3px);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
}

.episode-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  margin-bottom: 40px;
  border: 1px solid #eaeaea;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 320px) {
    padding: 24px;
    margin-bottom: 32px;
  }
}

.episode-info {
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 320px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.episode-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.episode-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;

  &.episode-number {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  &.air-date {
    background-color: #e8f5e9;
    color: #388e3c;
  }
}

.section-title {
  font-size: 1.5rem;
  margin: 0 0 24px 0;
  font-weight: 600;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
}

.characters-container {
  position: relative;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}

.characters-carousel {
  padding: 10px 0 40px;

  .swiper-slide {
    width: auto;
    height: auto;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    color: #42b983;
    width: 32px;
    height: 32px;
    margin-top: -16px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &::after {
      font-size: 20px;
      font-weight: bold;
    }

    &.swiper-button-disabled {
      opacity: 0.3;
    }
  }
}

.no-characters {
  padding: 40px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
  color: #666;
}

.loading, .error {
  padding: 40px;
  text-align: center;
  font-size: 1.2rem;
}

.error {
  color: #ff4444;
}

@media (max-width: 767px) {
  .characters-container {
    padding: 0;
    
    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
      display: none;
    }
  }
}
</style>