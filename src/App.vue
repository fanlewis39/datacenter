<template>
  <div id="app">
    <header ref="header">
      <Navbar>
        <router-link
          v-for="(item, index) in links"
          :key="index"
          v-slot="{ href, isExactActive }"
          :to="item.path"
        >
          <NavbarItem :name="index" :active="isExactActive">
            <a class="navbar-link" :href="href">
              {{ item.name }}
            </a>
          </NavbarItem>
        </router-link>
      </Navbar>
    </header>
    <main :style="{ height: `${mainHeight}px` }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  RESIZE_WINDOW,
  QUERY_PROJECT,
  QUERY_ALL_TASKS,
  QUERY_HISTORY_PROGRESS
} from './store/types'

import Navbar from './components/basis/Navbar'
import NavbarItem from './components/basis/NavbarItem'

export default {
  name: 'App',
  components: {
    Navbar,
    NavbarItem
  },
  data () {
    const routes = this.$router.options.routes
    const links = []

    for (let i = 0, len = routes.length; i < len; i++) {
      const { path, name } = routes[i]

      links.push({ path, name })
    }

    return {
      links,
      headerHeight: 0
    }
  },
  computed: {
    ...mapState(['height']),
    mainHeight () {
      return this.height - this.headerHeight
    }
  },
  created () {
    this.queryProject().then(success => {
      if (success) {
        this.queryAllTasks()
        this.queryHistoryProgress()
      }
    })
  },
  mounted () {
    this.computeHeaderHeight()

    window.addEventListener('resize', () => {
      this.computeHeaderHeight()
      this.resizeWindow()
    })
  },
  methods: {
    ...mapMutations({
      resizeWindow: RESIZE_WINDOW
    }),
    ...mapActions({
      queryProject: QUERY_PROJECT,
      queryAllTasks: QUERY_ALL_TASKS,
      queryHistoryProgress: QUERY_HISTORY_PROGRESS
    }),
    computeHeaderHeight () {
      this.$nextTick(() => {
        const header = this.$refs.header
        const { height } = header.getBoundingClientRect()

        this.headerHeight = height
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
