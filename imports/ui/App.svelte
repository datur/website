<script>
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  require('dotenv').config({ path: require('find-config')('.env') })

  let emailAddress = "";
  let messageBody = "";
  var resp;

  function handleSubmit(e) {
    grecaptcha.ready(function() {
          grecaptcha.execute(process.env.CAPTCHA_CLIENT_KEY, {action: 'submit'}).then(function(token) {
              // Add your logic to submit to your backend server here.
              resp = Meteor.call("verifyCaptcha", token)
              console.log(resp)
          });
        });
  }
</script>

<headder>
  <h1>David Turner</h1>
  
  <form on:submit|preventDefault|stopPropagation={handleSubmit}>
    <input type="text" placeholder="Add your email address" bind:value={emailAddress} /><br>
    <input type="text" placeholder="Your message" bind:value={messageBody}/>
    <div id="form-TOS">This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
  </div>
    <button>Submit</button>
  </form>
</headder>
