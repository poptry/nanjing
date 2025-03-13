<template>
  <div class="unauthorized">
    <h1>403 - Unauthorized</h1>
    <p>您没有该页面的访问权限</p>
    <p>You do not have permission to view this page.</p>

    <router-link to="/Login">去 登 录 Go to Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style scoped>
.unauthorized {
  text-align: center;
  margin-top: 50px;
}

.unauthorized h1 {
  font-size: 2em;
  color: #ff0000;
}

.unauthorized p {
  font-size: 1.2em;
  margin: 20px 0;
}

.unauthorized a {
  color: #007bff;
  text-decoration: none;
}
</style>