const express = require('express'); // એક્સપ્રેસ ફ્રેમવર્ક ઇમ્પોર્ટ કરો (Import the Express framework)
const app = express(); // એક્સપ્રેસ એપ્લિકેશન બનાવો (Create an Express application)
const db = require('./db'); // ડેટાબેસ ફાઇલ ઇમ્પોર્ટ કરો (Import the database file)
const bodyParser = require('body-parser'); // બોડી-પાર્સર ઇમ્પોર્ટ કરો (Import the body-parser)
app.use(bodyParser.json()); // બોડી-પાર્સર માધ્યમથી JSON ડેટા હેન્ડલ કરો (Handle JSON data through body-parser)

// મૂળભૂત રુટ પર GET વિનંતી માટે હેન્ડલર
app.get('/', function(req, res) {
    res.send("Welcome to my hotel"); // "Welcome to my hotel" મોકલો (Send "Welcome to my hotel")
});

const MenuItem = require('./models/menu'); // મેનુ આઈટમ મોડેલ ઇમ્પોર્ટ કરો (Import the menu item model)
const person = require('./models/person'); // પર્સન મોડેલ ઇમ્પોર્ટ કરો (Import the person model)

const personRoutes = require('./routes/personRoutes'); // પર્સન રૂટ્સ ઇમ્પોર્ટ કરો (Import the person routes)
const menuitemRoutes = require('./routes/menuitemRoutes'); // મેનુ આઈટમ રૂટ્સ ઇમ્પોર્ટ કરો (Import the menu item routes)

app.use('/person', personRoutes); // પર્સન રૂટ્સનો ઉપયોગ કરો (Use the person routes)
app.use('/Menuitem', menuitemRoutes); // મેનુ આઈટમ રૂટ્સનો ઉપયોગ કરો (Use the menu item routes)

console.log('Server is running'); // સર્વર ચાલી રહ્યો છે (Server is running)
app.listen(3000); // સર્વરને 3000 પોર્ટ પર સાંભળો (Listen to the server on port 3000)
