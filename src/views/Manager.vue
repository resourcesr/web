<template>
    <div>
    </div>
</template>

<script>
import router from "../router"
import isAdmin from "../user"

export default {
    name: 'Manager',
    mounted() { 
        isAdmin("manager")        
    },
    computed: {
                
    }
    
}

</script>