<template lang='pug'>
  .realm
    .posts-container
      .posts-list posts in a realm {{ realm }} or multiple realms {{ realms }}
</template>

<script>
export default {
  name: 'realm',
  data () {
    return {
      realm: $route.params.realm,
      realms: $route.params.realms
      // siteTitle: 'Agora'
    }
  },
  socket: {
    connect() {
      this.isConnected = true
    },
    disconnect() {
      this.isConnected = false
    },
    updatePosts(data){
      if(this.user && this.user.wantsLive){

      }

    }
  },
  created () {
    getPosts({
      count: 25,
      realm: this.realm
    })
  },
  methods: {
    getPosts(opts){
      this.$socket.emit('getPosts', opts)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
