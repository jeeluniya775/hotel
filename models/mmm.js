const mongoose = require('mongoose'); // મોંગૂસ લાઇબ્રેરીને ઇમ્પોર્ટ કરો

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String, // આઇટમનું નામ સ્ટ્રિંગ પ્રકારનું છે
        required: true // આ ફીલ્ડ અનિવાર્ય છે (ચોક્કસપણે હોવું જોઈએ)
    },
    price: {
        type: Number, // આઇટમની કિંમત નંબર પ્રકારની છે
        required: true // આ ફીલ્ડ પણ અનિવાર્ય છે
    },
    taste: {
        type: String, // આઇટમનો સ્વાદ સ્ટ્રિંગ પ્રકારનો છે
        enum: ['sweet', 'spicy', 'sour'], // સ્વાદ ફક્ત 'sweet', 'spicy', 'sour' માંથી કોઈ એક હોઈ શકે છે
        required: true // આ ફીલ્ડ પણ અનિવાર્ય છે
    },
    is_drink: {
        type: Boolean, // આ આઇટમ પીણું છે કે નહીં તે બુલિયન (સાચો કે ખોટો) પ્રકારનું છે
        default: false // આનું મૂળ્ય મૂળભૂત રીતે ખોટું છે (False)
    },
    ingredients: {
        type: [String], // આઇટમમાં ઉપયોગમાં લેવાયેલ ઘટકોની સૂચિ, જે સ્ટ્રિંગનો એરે છે
        default: [] // આનું મૂળ્ય મૂળભૂત રીતે ખાલી એરે છે
    },
    num_sales: {
        type: Number, // આઇટમની વેચાણ સંખ્યા નંબર પ્રકારની છે
        default: 0 // આનું મૂળ્ય મૂળભૂત રીતે શૂન્ય (0) છે
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema); // 'MenuItem' મોડલ બનાવો, જે 'menuItemSchema'નો ઉપયોગ કરે છે

module.exports = MenuItem; // આ મોડલને એક્સપોર્ટ કરો, જેથી અન્ય ફાઇલોમાં તેનો ઉપયોગ કરી શકાય
