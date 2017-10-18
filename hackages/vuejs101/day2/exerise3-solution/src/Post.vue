<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <div>{{ post.message }}</div>
        <div>{{ comments }}</div>
    </div>
</template>

<script>
export default {

}

</script>
