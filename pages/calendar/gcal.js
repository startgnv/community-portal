import request from 'superagent';

const CAL_ID = 'pemisin.toyo@gmail.com';
//const API_KEY = 'AIzaSyAw1p5htjqDIyVSmuMvGJwenRtiQ6ZqACk';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events?key=${API_KEY}`
// https://www.googleapis.com/calendar/v3/calendars/cGVtaXNpbi50b3lvQGdtYWlsLmNvbQ.calendar.google.com/events?key=AIzaSyAw1p5htjqDIyVSmuMvGJwenRtiQ6ZqACk
// https://calendar.google.com/calendar/u/0?cid=cGVtaXNpbi50b3lvQGdtYWlsLmNvbQ
// https://calendar.google.com/calendar/u/0?cid=cGVtaXNpbi50b3lvQGdtYWlsLmNvbQ
export function getEvents (callback) {
    request
        .get(url)
        .end((err, resp) =>{
            if(!err){
                const events = [];
                JSON.parse(resp.text).items.map((event) =>{
                    events.push({
                        start: event.start.date || event.start.dateTime,
                        end: event.end.date || event.end.dateTime,
                        title: event.summary,
                    })
                })
                callback(events);
            }

        })
}

export default getEvents;