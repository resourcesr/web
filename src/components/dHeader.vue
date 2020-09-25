 <template>
    <div>
        <div class="desktop-header" v-if="userProfile.name">
            <v-card height="350px" max-width="250">
                <v-navigation-drawer permanent left>
                    <navbar />
                </v-navigation-drawer>
            </v-card>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import navbar from "./navbar"

export default {
    name: "dHeader",
    components: {
        navbar,
    },
    computed: {
        ...mapState(['userProfile'])
    }
}
</script>
