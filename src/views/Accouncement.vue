<template>
    <div>
        <breadcrumb name_r="Home"/>
        <dHeader /> 
        <div class="page">
            <div>
                <h3 class="title text-center">Accouncements</h3>
            </div>
            <v-card class="mx-auto" max-width="1000">
                <template v-for="announcement in announcements">
                    <v-card-text v-for="(item, index) in announcement" :key="index" @click="markAsRead(index)">
                        <p>
                            <strong>{{item.title}}</strong>
                             by <i>{{item.userName}}</i>
                        </p> 
                        <p style="padding: 6px;width: 100%">
                            {{item.msg}}
                        </p>
                        <v-divider />
                    </v-card-text>
                </template>
            </v-card>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import breadcrumb from "../components/breadcrumb"
import dHeader from "../components/dHeader"

export default {
    name: "accouncment",
    components: {
        breadcrumb,
        dHeader
    },
    methods: {
        markAsRead(announcement) {
            //Todo
            //this.$store.dispatch('markAsRead', announcement)
        }
    },
    computed: {
        ...mapState(["announcements"])
    }
}
</script>
