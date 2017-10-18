    <template>
        <div @click="$emit('increment')">{{ count }}</div>
    </template>


    <script>
        export default {
            props: ['count']
        }

    </script>
