<template>
    <div class="page-not-found">
      <p>Sorry, page not found.</p>
      <router-link to="/">Back to home page</router-link>
    </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style lang="scss" scoped>
  .page-not-found {
    height: calc(100vh - #{$navBarHeight});
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      font-size: 24px;
      font-weight: bold;
    }

    a {
      font-size: 18px;
    }
  }
</style>
