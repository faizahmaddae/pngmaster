<template>
    <div class="container">
        <div class="box" v-for="(item, index) in items" :key="index">
            <meta itemprop="fileFormat" content="image/png">
            <link itemprop="contentUrl" :href="item.link">
            <meta itemprop="keywords" :content="item.keywords">
            <figure class="m-0 p-0">
                <a itemprop="url" :href="`/${item.slug}/`" target="_blank">
                    <img itemprop="thumbnail" :alt="item.figcaption" :title="item.keywords" :src="item.link"
                        :data-src="item.link" class="lazy" data-was-processed="true">
                </a>
                <figcaption itemprop="caption description" class="title">{{ item.figcaption }}</figcaption>
            </figure>
        </div>

    </div>
</template>

<script setup>
// accept props data 
const { items } = defineProps({
    items: {
        type: Object,
        required: true,
    },
});

</script>

<style scoped>

*:before,
*:after,
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    width: 1400px;
    margin: 20px auto;
    columns: 4;
    column-gap: 20px;
}

.container .box {
    width: 100%;
    margin-bottom: 10px;
    break-inside: avoid;
}

.container .box img {
    max-width: 100%;
    border-radius: 15px;
}

@media (max-width: 1200px) {
    .container {
        width: calc(100% - 40px);
        columns: 3;
    }
}

@media (max-width: 768px) {
    .container {
        columns: 2;
    }
}

@media (max-width: 480px) {
    .container {
        columns: 1;
    }
}


.grid-sizer,
.grid-item {
    width: 25%;
    padding: 10px;
}

.grid-item:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    margin-top: -5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

/* 2 columns wide */
.grid-item--width2 {
    width: 40%;
}

img {
    width: 100%;
    max-width: 100%;
    height: auto;
}

/* on tablet */
@media (max-width: 768px) {

    .grid-sizer,
    .grid-item {
        width: 50%;
    }

    .grid-item--width2 {
        width: 100%;
    }
}
</style>