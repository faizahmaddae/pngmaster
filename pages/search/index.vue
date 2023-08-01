<template>
    <div>
        <Head>
            <Title>Search | {{ route.query.q }} </Title>
            <Meta name="description" content="High quality cutout png images in PNG Master, free and unlimited downloads" />
            <Meta name="keywords" content="High quality cutout png images in PNG Master, free and unlimited downloads" />
            <Meta name="author" content="PNG Master" />
            <Meta name="robots" content="index, follow" />
            <Meta property="og:title" content="PNG Master" />
            <Meta property="og:description" content="High quality cutout png images in PNG Master, free and unlimited downloads" />
            <Meta property="og:image" content="https://www.pngmaster.com/img/logo.png" />
            <Meta property="og:url" content="https://www.pngmaster.com/img/logo.png" />
            <Meta property="og:type" content="website" />
            <Meta property="og:site_name" content="PNG Master" />
            <Meta property="og:locale" content="en_US" />
            <Meta property="og:updated_time" :content="new Date().toISOString()" />
        </Head>

        <SearchBox />
        <!-- check if message -->
        <div v-if="data.body.length == 0" class="container">
            <h4 class="text-center py-5">Not found !</h4>
        </div>

        <Gallery :items="data.body" class="py-4" />
        <div class="container">
            <!-- <p>{{ next_page_url }}</p>
            <p>{{ prev_page_url }}</p> -->

            <div class="row">
                <div class="prevnext my-4" id="pn" v-if="data.body.length > 0">
                    <a :href="prev_page_url" :class="`btn btn-primary btn-lg ${page == 1 ? 'disabled' : ''}`" role="button"
                        aria-disabled="true">
                        <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="34px"
                            fill="#FFFFFF">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                    </a>

                    <a :href="next_page_url" class="btn btn-primary btn-lg " role="button" aria-disabled="true">
                        <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="34px"
                            fill="#FFFFFF">
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const route = useRoute();
const page = route.query.page || 1;

const next_page_url = `/search?q=${route.query.q}&page=${parseInt(page) + 1}`;
var prev_page_url = '';

if (page > 1) {
    prev_page_url = `/search?q=${route.query.q}&page=${parseInt(page) - 1}`;
} else {
    prev_page_url = `/search?q=${route.query.q}`;
}

const { data, pending, refresh, error } = await useFetch(`/api/search?q=${route.query.q}${page > 1 ? '&page=' + page : ''}`, {
    method: 'GET',
    key: route.query.q,
    watch: [route.query.q],
    initialCache: false,
});

onMounted(() => { });

watch(
    () => route.fullPath,
    async () => {
        refresh();
        console.log("route fullPath updated", route.query.q);
    }
);
</script>

<style scoped>
.bgcolor {
    background-color: #066bc6 !important;
    transition: background-color .2s;
}

.prevnext a {
    display: inline-block;
    color: #fff;
    padding: 15px 30px;
    font-size: 16px;
    margin: 0 5px;
    border-radius: 2px;
}

.prevnext {
    text-align: center;
    height: 80px;
    padding-top: 20px;
}
</style>