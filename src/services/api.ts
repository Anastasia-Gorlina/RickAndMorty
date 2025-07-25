import axios from 'axios'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const fetchEpisodes = async () => {
  try {
    const initialResponse = await axios.get(`${API_BASE_URL}/episode`)
    const count = initialResponse.data.info.count
    const response = await axios.get(`${API_BASE_URL}/episode?count=${count}`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching episodes:', error)
    throw error
  }
}