<template>
    <div>
    </div>
</template>

<script>
import router from "../router"
import isAdmin from "../user"

export default {
    name: 'Admin',
    mounted() { 
        isAdmin("admin")        
    },
    computed: {
                
    }
    
}

</script>