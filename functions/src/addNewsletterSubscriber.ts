import * as functions from "firebase-functions";
import axios from 'axios';

interface NewsletterSubscriber {
    email: string
}

interface Config {
    apikey: string
    listid: string
}

export const addNewsletterSubscriber = functions.https.onCall((data: NewsletterSubscriber, context) => {
    const { apikey, listid } = functions.config().mailchimp as Config;

    return axios({
        url: `https://us2.api.mailchimp.com/3.0/lists/${listid}/members`,
        method: 'post',
        auth: {
            username: 'Firebase',
            password: apikey
        },
        data: {
            email_address: data.email,
            status: 'subscribed'
        }
    }).then(result => {
        console.log(result);
    }).catch(err => {
        if (err.response) {
            console.error(`Failed to add subscriber. Status code: ${err.response.status}. Response data: ${err.response.data}`);
        } else {
            // If the error is due to network issues or other non-API related problems
            console.error(`Failed to add subscriber. Error: ${err.message}`);
        }
        console.error(err);
        throw(new Error("Something unexpected happened!"))
    })
});
