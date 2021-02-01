<template>
  <div id="app">

<router-view/>

  </div>
</template>
<script>

  export default {
    components: {

    }
  }

</script>
<style>
@import "assets/css/base.css";
html,body,#app{
  height: 100%;
  width: 100%;
}

 .popper-edit{
   position: absolute !important;
   display: block;
   left: 50%;
   margin-left: -150px;
 }


</style>
