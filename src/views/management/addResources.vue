<template>
    <div>
    <br />
        <v-card flat>
            <v-card-title>Resources</v-card-title>
            <v-card-subtitle>Lists</v-card-subtitle>
            <v-card-text>
                <v-simple-table style="height: 200px; overflow: auto">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">By</th>
                                <th class="text-left">Type</th>
                                <th class="text-left">Content Type</th>
                                <th class="text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="resource in _resources.data" :key="resource.id" >
                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.name }}</td>
                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.userName }}</td>
                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.type }}</td>
                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.content }}</td>
                                <td v-if="resource.delete != 'true' || resource.delete == undefined"> <a @click="deleteResource(resource.id)">Delete</a></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-subtitle>Add new</v-card-subtitle>
            <v-card class="mx-auto" tile>
                <v-card-text>
                    <div class="text--primary">
                        <v-form ref="form"  v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="resources.forms.openUrl"
                                :rules="nameRules"
                                label="Open URL"
                                required
                            ></v-text-field>
                            <v-btn
                                    color="success"
                                    class="mr-4"
                                    @click="fetchFileInfo()"
                                    >
                                    Fetch info
                                </v-btn>
                            <v-divider />
                            <v-text-field
                                v-model="resources.forms.name"
                                :rules="nameRules"
                                label="Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="resources.forms.downloadUrl"
                                :rules="nameRules"
                                label="Download URL"
                                required
                            ></v-text-field>
                            <label class="label-custom">Select Course</label>
                            <select class="v-select__selections" v-model="resources.forms.course_id">
                                <option v-for="item in _courses" :key="item.id" :value="item.id">{{item.title}}</option>
                            </select>
                            <label class="label-custom">Select Icon</label>
                            <select class="v-select__selections" v-model="resources.forms.icon">
                                <option v-for="(item, index) in icons" :key="index" :value="item">{{item}}</option>
                            </select>
                            <label class="label-custom">Select Type</label>
                            <select class="v-select__selections" v-model="resources.forms.type">
                                <option v-for="(item, index) in types" :key="index" :value="item">{{item}}</option>
                            </select>
                            <label class="label-custom">Select Content Type</label>
                            <select class="v-select__selections" v-model="resources.forms.content">
                                <option v-for="(item, index) in contents" :key="index" :value="item">{{item}}</option>
                            </select>
                            <v-card-actions>
                                <v-btn
                                    :disabled="!valid || submit"
                                    color="success"
                                    class="mr-4"
                                    @click="addResource"
                                    style="float:right;"
                                    >
                                    Add
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </div>
                </v-card-text>
            </v-card>
        </v-card>
        <v-snackbar v-model="isMsg">{{ msg }} </v-snackbar>
    </div>
</template>

<script>

export default {
    name: 'addResources',
    data () {
      return {
        valid: false,
        submit: false,
        isMsg: false,
        msg: "",
        icons: {
            word: "word",
            powerpoint: "powerpoint",
            zip: "zip",
            pdf: "pdf",
            file: "file",
            ppt: "ppt",
            doc: "doc",
            docs: "docs",
        },
        types: [
            'slides', 'books', 'projects'
        ],
        contents: [
            'resource', 'assignment', 'quiz', 'lab',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 1000) || 'Name must be less than 100 characters',
        ],
        resources: {
            forms: {
                course_id: null,
                name: null,
                icon: null,
                openUrl: null,
                downloadUrl: null,
                type: null,
                content: null,
                ext: null,
                mimeType: null,
                size: null,
            },
        },
      }
    },
    methods: {
        async fetchFileInfo() {
            let info
            this.fetch = true
            let id = this.resources.forms.openUrl.split("/d/")[1].replace("/view?usp=sharing", "")
            let key = "AIzaSyDPtscuAqioxWMkZqpMQW-5LPubtpI6aW4"
                await fetch(`https://www.googleapis.com/drive/v2/files/${id}?key=${key}`).then(resp => resp.json()).then(resp => {
                    this.resources.forms.name = resp.title.split('.')[0]
                    this.resources.forms.downloadUrl = resp.webContentLink
                    this.resources.forms.icon = resp.fileExtension
                    this.resources.forms.ext = resp.fileExtension
                    this.resources.forms.mimeType = (resp || {}).mimeType
                    this.resources.forms.size = (resp || {}).size
                }).catch(err => {
                    this.fetch = false
                    this.isMsg = true
                    this.msg = err
                })
        },
        prepareData() {
            return  {
                course_id: this.resources.forms.course_id,
                name: this.resources.forms.name,
                icon: this.resources.forms.icon,
                openUrl: this.resources.forms.openUrl,
                downloadUrl: this.resources.forms.downloadUrl,
                type: this.resources.forms.type,
                content: this.resources.forms.content,
                size: this.resources.forms.size ? this.resources.forms.size : "" ,
                mineType: this.resources.forms.mineType ? this.resources.forms.mineType : "" ,
            }
        },
        addResource() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("resources/addResources", this.prepareData())
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        },
        deleteResource(ID) {
            this.$store.dispatch("resources/deleteResource", ID),
            this.isMsg = true
            this.msg = "Deleted successfully"

        },
    },
    mounted() {
        this.$store.dispatch("courses/getAllCourses")
        this.$store.dispatch("resources/getResources")
    },
    computed: {
        _courses() {
            return this.$store.getters['courses/courses']
        },
        _resources() {
            return this.$store.getters['resources/resources']
        }
    }
}
</script>
