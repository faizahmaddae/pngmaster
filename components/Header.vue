<template>
    <div class="head navbar-light bg-light">
        <div class="container">
            <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <!-- <a class="navbar-brand">PNG Master</a> -->
                <a class="navbar-brand" href="/">
                    <img :src="`/img/logo.png`" alt="PNG Master" class="logo">
                </a>
                <form class="d-flex" v-if="showSearchBox">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
        </div>

    </div>
</template>
  
<script setup>
// accept props showSearchBox default false
const props = defineProps({
    showSearchBox: {
        type: Boolean,
        default: false
    }
});

</script>

<!-- css -->
<style scoped>

.logo{
    width: 150px;
}

</style>