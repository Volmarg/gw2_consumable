<template>
    <div class="container">
test
        <section id="master">
            <select id="numbers">
                <option v-for="n in 10" ref="numbers">@{{ n }}</option>
            </select>

            <section v-for="i in refik2 ">
                <div data-id="1" ref="a1">a</div>
                <div data-id="2" ref="a1">b</div>
                <div data-id="3" ref="a1">c</div>
            </section>

            <div id="divium">
                @{{ eeee }}
            </div>

            <script>

            </script>
        </section>

    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Food attribute selector - Component mounted.');


            // demo for tests
            var ul = new Vue({
                el: '#numbers',

            });

            var master = new Vue({
                el: '#master',
            });

            var section2 = new Vue({
                el: '#divium',
                data: {
                    eeee: console.log(master.$refs.a1[0].dataset.id),
                }

            });


        }
    }

</script>

<style scoped>

</style>