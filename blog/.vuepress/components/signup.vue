<template>
  <div class="sign-up">
    <p>
      <input type="text" placeholder="Email"><br>
      <input type="password" placeholder="Password"><br>
      <button> Sign Up</button>
      <span> or go back to login.</span>
    </p>
  </div>
</template>

<style>
.sign-up {
  margin-top: 40px;
}
input{
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button{
  margin-top: 10px;
  width: 10%;
cursor: pointer;
}
span{
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>

<script>
export default {
  name: 'signUp',
  data(){
    return {}
  },
  methods: {}
}
</script>
