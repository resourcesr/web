 <template>
    <div>
        <div v-if="resources.data.length">
            <div v-for="(type, index) in resources.types" :key="index">
                <div v-if="content == 'resource'">
                    <h3 v-if="type=='slides'"  class="title text-center">Slides / Notes</h3>
                    <h3 v-else-if="type=='projects'"  class="title text-center">Projects</h3>
                    <h3 v-else class="title text-center">Books</h3>
                </div>
                <div style="" v-if="resources.data.length">
                    <div v-for="resource in resources.data" :key="resource.id">
                        <v-card class="mx-auto custom-card-resource" style="margin: 6px;" max-width="1000" v-if="type == resource.type && (resource.content == content) && (resource.delete != 'true' || resource.delete == undefined)">
                            <div>
                                <v-container class="">
                                    <v-row no-gutters class="padding: 25px">
                                        <v-col key="1" sm="10" xs="10" md="10" xl="10" lg="10">
                                            <div class="resource">
                                                <p class="left">
                                                    <img :src="`/img/files/${icons[resource.icon] || 'file'}.svg`" class="mr-4 w-8" >
                                                </p>
                                                <div class="center">
                                                    <p class="name text-wrap">{{resource.name}}</p>
                                                    <p class="cr">Uploaded <strong>{{resource.created | formatDate }}  </strong> by
                                                    <strong> {{resource.userName}} </strong></p>
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col key="2" sm="2" xs="2" md="2" lg="2" xl="2">
                                            <p class="res_right">
                                                <a :href="resource.openUrl" target="_blank" ><v-icon>mdi-link-variant</v-icon></a>
                                                <a :href="resource.downloadUrl" target="_blank" ><v-icon>mdi-file-download</v-icon></a>
                                            </p>
                                        </v-col>
                                        <v-responsive  width="100%" ></v-responsive>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="title text-center">Sorry, no resource found.</h3>
        </div>
    </div>
</template>

<script>
import {timeAgo} from "../utils"
export default {
    name: "resources",
    props: {
        resources: Object,
        content: String,
        icons: Object,
    },
    methods: {
    },
    filters: {
        formatDate(val) {
            if (!val) { return '-' }
            return timeAgo(val)
        }
    }
}
</script>
