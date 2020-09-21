<template>
  <div>
    <v-card class="mx-auto" max-width="600">
      <v-card-text>
        <p class="text-center pt-5">Select your department.</p>
        <v-divider class="pt-5"/>
        <div v-for="(department, index) in departments" :key="index">
            <router-link  :to="{ name: 'classes:index', params: {department: department.key, name:department.name} }">
              <div class="department-select">
                <p class="left">
                  <v-icon>home</v-icon>
                </p>
                <p class="center" style="width: 500px">{{department.name}}</p>
                <p class="right" style="margin-top: -5px">
                  <v-icon>mdi-chevron-right</v-icon>
                </p>
              </div>
            
            </router-link>
          <v-divider class="pt-5" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      departments: [
        {
          key: "fc",
          name: "faculty of computing",
       },
       {
          key: "phy",
          name: "faculty of physics",
       }
      ]
    }
  }
}
</script>
