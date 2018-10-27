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
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js'}
      ] 
    }
  }
}
</script>