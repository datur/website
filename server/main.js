import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

require('dotenv').config({ path: require('find-config')('.env') })


Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.methods({
    verifyCaptcha(token){
        var result;

        const response = HTTP.call('POST', 'https://www.google.com/recaptcha/api/siteverify', 
        { params: {
            secret: process.env.CAPTCHA_SECRET_KEY,
            response: token,
            
        }});


        var resp = JSON.parse(response.content)
        
        if (resp.score >= 0.7) 
            result = {success: true,
                        score: resp.score}
        else 
            result = {success: false,
                score: resp.score}

        console.log(result)

        return result;
    }
})