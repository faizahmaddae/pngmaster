<template>
    <div>
        <SearchBox />

        <h1>v6.1 - playwright chromium headless:false</h1>

        <p>{{ data }}</p>
        <div class="hotsearch py-4">
            <ul class="p-0 ul">
                <!-- <li v-if="data.body" v-for="(item, index) in data.body" :key="index" class="left">
                    <a :href="`/search/?q=${getQueryString(item.ahref)}`">{{ item.atext }}</a>
                </li> -->
            </ul>
        </div>
        <div class="suggest-items my-5">
            <h1 class="h3 center text-center">Transparent background png images for designers</h1>
            <!-- <Gallery :items="data.list_ul_data" /> -->
        </div>

    </div>
</template>

<script setup>
const { data } = await useFetch('/api/home/');

function getQueryString(url) {
    const queryString = url.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const q = urlParams.get('q');
    return q ? q : 'not found';
}
</script>

<style scoped>
.hotsearch li {
    display: inline-block;
    padding-bottom: 8px;
}

.hotsearch a {
    color: #19578e;
    text-decoration: underline;
    padding: 0 5px;
}

.hotsearch {
    text-align: center;
    color: #fff;
    margin: auto;
    padding-bottom: 90px;
    font-size: 14px;
}
</style>
