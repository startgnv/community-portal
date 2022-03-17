const CAL_ID = 'pemisin.toyo@gmail.com';
const API_KEY = process.env.NEXT_GOOGLE_API_KEY;
let url = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events?key=${API_KEY}`;
export async function getEvents(callback) {
  const values = await fetch(url)
    .then(res => res.json())
    .then(({ items, error }) => {
      //destructuring attributes from objects
      if (!error) {
        const events = [];
        items.forEach(event => {
          if ('start' in event) {
            events.push({
              start:
                JSON.stringify(new Date(event.start.dateTime)) ||
                JSON.stringify(new Date(event.start.date)),
              end:
                JSON.stringify(new Date(event.end.dateTime)) ||
                JSON.stringify(new Date(event.end.date)),
              title: event.summary || null,
              allDay: false
            });
          }
        });
        return events;
      }
      return null;
    });
  callback(values);
}
