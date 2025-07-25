import { createRouter, createWebHistory } from 'vue-router'
import EpisodesView from '@/views/EpisodesView.vue'
import EpisodeDetailView from '@/views/EpisodeDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/RickAndMorty',
      name: 'episodes',
      component: EpisodesView,
      meta: {
        title: 'Rick and Morty Episodes'
      }
    },
    {
      path: '/episode/:id',
      name: 'episode-detail',
      component: EpisodeDetailView,
      meta: {
        title: 'Episode Details'
      },
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Page Not Found'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string || 'Rick and Morty'
  document.title = `${title}`
  next()
})

export default router