<template>
    <div>
        <!-- search box in the center page -->
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-lg-6">
                    <!-- Search Form -->
                    <!-- @submit.prevent="handleSubmit" -->
                    <form action="/search" method="GET">
                        <div class="input-group">
                            <input type="text" class="form-control" required :value="q" placeholder="Search png..." name="q">
                            <div class="input-group-append">
                                <button class="btn btn-primary bg-dark" type="submit">Go</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const q = route.query.q || '';

</script>

<script>
export default {
    props: {},
    computed: {},
    methods: {
        handleSubmit() {
            console.log("handleSubmit");
            // submit the form
            // this.$router.push({ path: '/search', query: { q: $('input[name="q"]').value()} });
        }
    },
    async created() { },
    mounted() { },
}
</script>

<style lang="scss" scoped></style>