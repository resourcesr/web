<template>
    <div>
        <v-divider />
        <v-card tile>
            <v-card-text>
                <ul class="breadcrumb">
                <li
                    v-for="(breadcrumb, index) in breadcrumbList"
                    :key="index"
                    @click="routeTo(index)"
                    :class="{'linked': !!breadcrumb.route}">
                        {{name(breadcrumb)}}
                    <svg v-if="index != (breadcrumbList.length - 1)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
                </li>
            </ul>
            </v-card-text>
        </v-card>  
    </div>
</template>

<script>
import router from "../router"
export default {
  name: 'breadcrumb',
  watch: {
    $route (to, from) {
        this.activeRoute = to
        this.updateList()
    },
  },
  props: {
      name_r: String
  },
  data() {
    return {
      breadcrumbList: [],
      activeRoute: { meta: {}, fullPath: '' },
    }
  },
  methods: {
    name(bread) {
      if (bread.middle)
        return this.name_r
      else if (typeof bread.name == "string")
        return bread.name
      else if (!bread.middle && typeof bread.name == "function")
        return this.$route.meta.title(this.$route)
    },
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].route) {
        this.$router.push({name: this.breadcrumbList[pRouteTo].route, params: this.$route.params})
      }
    },
    updateList () { 
      this.breadcrumbList = this.$route.meta.breadcrumb
      }

  },
  mounted() {
    this.updateList()
  }
}
</script>