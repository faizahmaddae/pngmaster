<template>
    <div>
        <Head>
            <Title> PNG Master | {{ params.slug }} </Title>
            <Meta name="description" :content="data.body.title" />
            <Meta name="keywords" :content="data.body.title" />
            <Meta name="author" content="PNG Master" />
            <Meta name="robots" content="index, follow" />
            <Meta property="og:title" :content="data.body.title" />
            <Meta property="og:description"
                content="High quality cutout png images in PNG Master, free and unlimited downloads" />
            <Meta property="og:image" content="https://www.pngmaster.com/img/logo.png" />
            <Meta property="og:url" content="https://www.pngmaster.com/img/logo.png" />
            <Meta property="og:type" content="website" />
            <Meta property="og:site_name" content="PNG Master" />
            <Meta property="og:locale" content="en_US" />
            <Meta property="og:updated_time" :content="new Date().toISOString()" />
        </Head>
        <div class="row my-5">
            <div class="col-12 col-md-8">
                <figure>
                    <img itemprop="contentUrl" :alt="data.body.alt" :title="data.body.title" :src="data.body.image"
                        oncontextmenu="return false;" class="img-fluid">
                    <figcaption itemprop="caption description">{{ data.body.title }}</figcaption>
                </figure>

                <!-- tags -->
                <span class="badge bg-secondary mx-1" v-for="(tag, index) in data.body.tags" :key="index">
                    <a :href="`/${tag.link}`" class="text-white">{{ tag.name }}</a>
                </span>

                <!-- info_list -->
                <div class="mt-4 info_list" v-html="data.body.info_list"></div>
                <div class="dl-content">
                    <a :href="`${data.body.image}?dl=1`" target="_blank" class="btn btn-outline-primary w-100"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-download" viewBox="0 0 16 16">
                            <path
                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg> Download</a>
                </div>
            </div>

            <div class="col-12 col-md-4">
                <!-- sidebar ads -->
                <SidebarAds />
            </div>
        </div>

        <div class="row py-4">
            <h3 class="text-center center">Related png images</h3>

            <Gallery :items="data.body.related" />
        </div>

        <div class="m-5"></div>

    </div>
</template>

<script setup>
var Url = require('url-parse');

const route = useRoute();
const params = route.params;

// var url = new Url('https://www.pngwing.com/en/free-png-zucjg/?q=apple');
// url.set('hostname', 'yahoo.com/en/');
// url.set('query', 'q=apple');
// url.set('hash', 'top');
// console.log(url.pathname);
// console.log(url.query);
// console.log(url.hash);


const { data, pending, refresh, error } = await useFetch(`/api/single?slug=${params.slug}`, {
    method: 'GET',
    key: params.slug,
})

</script>

<style>
.info_title {
    display: block;
    float: left;
}

.info_detail {
    float: right;
    display: block;
}

p,
ul,
dl,
dt,
dd {
    margin: 0;
    padding: 0;
}

.info_list>div:nth-child(1) {
    border-top: 0;
}

.info_list div {
    display: block;
    height: 52px;
    text-align: center;
    border-top: 1px dotted #bbb;
    padding: 0 15px;
    line-height: 52px;
}
</style>