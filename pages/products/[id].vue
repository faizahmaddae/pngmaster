<template>
    <div>
        <h2>Products Details {{ params }}</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, cupiditate facere praesentium minus ipsam
            officia odio saepe reiciendis numquam tempore, dolorum odit harum. Fugiat rerum sunt incidunt nostrum pariatur
            laboriosam.</p>
    </div>
</template>

<script setup>
    const params = useRoute().params;
    // get ?q=iphone
    const query = useRoute().query;


</script>

<style scoped></style>
