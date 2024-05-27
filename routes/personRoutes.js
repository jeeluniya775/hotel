const express = require('express'); // એક્સપ્રેસ ફ્રેમવર્ક ઇમ્પોર્ટ કરો
const router = express.Router(); // એક્સપ્રેસ રાઉટરને ઈનિશિયલાઈઝ કરો
const Person = require('/Users/jeel/Movies/nodejs/models/person.js'); // પર્સન મોડેલ ઇમ્પોર્ટ કરો
const person = require('/Users/jeel/Movies/nodejs/models/person.js');

// નવું પર્સન બનાવવાના માટે POST રાઉટ
router.post('/', async (req, res) => {
    try {
        const data = req.body; // રિક્વેસ્ટના બોડીમાંથી ડેટા મેળવો
        const newPerson = new Person(data); // નવો પર્સન ઓબ્જેક્ટ બનાવો

        const response = await newPerson.save(); // ડેટાને સંગ્રહિત કરો
        console.log('Data saved successfully');
        res.status(200).json(response); // સફળતા પ્રતિસાદ મોકલો
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' }); // ભૂલ પ્રતિસાદ મોકલો
    }
});

// બધી વ્યક્તિઓને મેળવવાના માટે GET રાઉટ
router.get('/', async (req, res) => {
    try {
        const data = await person.find(); // બધી વ્યક્તિઓ શોધો
        console.log('Data fetched');
        res.status(200).json(data); // સફળતા પ્રતિસાદ મોકલો
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' }); // ભૂલ પ્રતિસાદ મોકલો
    }
});

// worktype દ્વારા વ્યક્તિઓને મેળવવાના માટે GET રાઉટ
router.get('/:worktype', async (req, res) => {
    try {
        // worktype પેરામીટરને req.params.worktype માંથી મેળવો
        const worktype = req.params.worktype;

        // worktype માન્ય છે કે કેમ તે ચકાસો
        if (worktype === 'chef' || worktype === 'manager' || worktype === 'waiter') {
            // જો માન્ય છે, તો ડેટાબેસમાંથી તે worktype સાથેની વ્યક્તિઓ શોધો
            const response = await Person.find({ work: worktype });
            console.log('response fetched');
            // સફળતા માટે 200 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
            res.status(200).json(response);
        } else {
            // જો worktype અમાન્ય છે, તો 404 સ્થિતિ સાથે ભૂલ સંદેશ મોકલો
            res.status(404).json({ error: 'invalid work type' });
        }
    } catch (err) {
        // ભૂલ લોગ કરો
        console.log(err);
        // આંતરિક સર્વર ભૂલ માટે 500 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
        res.status(500).json({ error: 'internal server error' });
    }
});

// વ્યક્તિને અપડેટ કરવા માટે PUT રાઉટ
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // પેરામીટરમાંથી id મેળવો
        const personData = req.body; // રિક્વેસ્ટના બોડીમાંથી અપડેટ ડેટા લો

        // findByIdAndUpdate દ્વારા વ્યક્તિને અપડેટ કરો
        const response = await Person.findByIdAndUpdate(personId, personData, {
            new: true, // નવા ડેટા સાથે પ્રતિસાદ મોકલો
            runValidators: true, // વેલિડેટર્સ ચલાવો
        });

        // જો વ્યક્તિ ન મળે, 404 મોકલો
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(response); // સફળતા માટે 200 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' }); // આંતરિક સર્વર ભૂલ માટે 500 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // પેરામીટરમાંથી id મેળવો
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data deleted');
        res.status(200).json({ message: 'data deleted' }); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' }); // આંતરિક સર્વર ભૂલ માટે 500 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
    }
});


module.exports = router; // રાઉટર નિકાસ કરો
