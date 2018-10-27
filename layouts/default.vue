<template>
  <div>
    <nuxt/>
  </div>
</template>
 

<script>
export default {
  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js'}
      ] 
    }
  }
}
</script>