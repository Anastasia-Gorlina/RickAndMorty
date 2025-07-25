import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Episode, Character } from '@/types'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const useEpisodeStore = defineStore('episode', () => {
  const episodes = ref<Episode[]>([])
  const characters = ref<Record<number, Character>>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const filteredEpisodes = computed(() => {
    return episodes.value.filter(episode =>
      episode.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const fetchAllEpisodes = async () => {
    if (episodes.value.length > 0) return
    
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_BASE_URL}/episode`)
      const allEpisodes = []
      
      let nextPage = response.data.info.next
      allEpisodes.push(...response.data.results)
      
      while (nextPage) {
        const nextResponse = await axios.get(nextPage)
        allEpisodes.push(...nextResponse.data.results)
        nextPage = nextResponse.data.info.next
      }
      
      episodes.value = allEpisodes
    } catch (err) {
      error.value = 'Failed to fetch episodes'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchEpisodeDetails = async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/episode/${id}`)
      return response.data
    } catch (err) {
      error.value = `Failed to fetch episode ${id}`
      console.error(err)
      throw err
    }
  }

  const fetchCharacters = async (characterUrls: string[]) => {
    const characterIds = characterUrls.map(url => 
      parseInt(url.split('/').pop() || '0')
    ).filter(id => !characters.value[id])

    if (characterIds.length === 0) return

    try {
      const response = await axios.get(`${API_BASE_URL}/character/${characterIds.join(',')}`)
      const fetchedCharacters = Array.isArray(response.data) ? response.data : [response.data]
      
      fetchedCharacters.forEach((character: Character) => {
        characters.value[character.id] = character
      })
    } catch (err) {
      console.error('Failed to fetch characters:', err)
    }
  }

  const getCharacterById = (id: number) => {
    return characters.value[id]
  }

  return {
    episodes,
    characters,
    filteredEpisodes,
    isLoading,
    error,
    searchQuery,
    fetchAllEpisodes,
    fetchEpisodeDetails,
    fetchCharacters,
    getCharacterById
  }
})