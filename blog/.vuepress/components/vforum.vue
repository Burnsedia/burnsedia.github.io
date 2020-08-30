<template>
 <form action="submission.html" method="GET">
  <label for="username">Name:</label>
    <br>
			<input id="username" name="username" type="text" required minlength="3" maxlength="15">
      <br>
       <label for="pw">Email:</label>
      <br>
        <!--Add the pattern attribute to the input below-->
			<input id="pw" name="pw" type="text" required minlength="8" maxlength="32">
        <br>
      <input type="text" value="Submit">
</form>
</template>
