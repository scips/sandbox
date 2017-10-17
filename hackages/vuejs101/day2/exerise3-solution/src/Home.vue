<template>
    <div>
        <h1>Home</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <router-link :to="/posts/"+post.io>
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.message }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                posts: []
            }
        },
        created () {
            axios.get('https://jsonplaceholder.typicode.com/posts').then( ({ data }) => {
                this.posts = data.slice(0, 10)
            })
        }
    }
</script>
