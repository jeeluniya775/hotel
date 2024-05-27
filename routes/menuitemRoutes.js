const express = require('express'); // એક્સપ્રેસ ફ્રેમવર્ક ઇમ્પોર્ટ કરો
const router = express.Router(); // એક્સપ્રેસ રાઉટર બનાવો
const MenuItem = require('/Users/jeel/Movies/nodejs/models/menu.js'); // મેનુ આઈટમ મોડેલ ઇમ્પોર્ટ કરો

// POST રાઉટ નવો મેનુ આઈટમ બનાવવા માટે
router.post('/', async (req, res) => {
    try {
        const data = req.body; // રિક્વેસ્ટના બોડીમાંથી ડેટા લો
        const menuItem = new MenuItem(data); // નવો મેનુ આઈટમ ઓબ્જેક્ટ બનાવો

        const response = await menuItem.save(); // ડેટાને સંગ્રહિત કરો
        console.log('ડેટા સફળતાપૂર્વક સંગ્રહિત થયો');
        res.status(200).json(response); // સફળતા પ્રતિસાદ મોકલો
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'આંતરિક સર્વર ભૂલ' }); // ભૂલ પ્રતિસાદ મોકલો
    }
});

// GET રાઉટ બધા મેનુ આઈટમ લાવવા માટે
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find(); // બધા મેનુ આઈટમ ડેટાને શોધો
        console.log('ડેટા લાવવામાં આવ્યો');
        res.status(200).json(data); // સફળતા પ્રતિસાદ મોકલો
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'આંતરિક સર્વર ભૂલ' }); // ભૂલ પ્રતિસાદ મોકલો
    }
});

// GET રાઉટ મેનુ આઈટમો લાવવા માટે tasteType દ્વારા
router.get('/:tastetype', async (req, res) => {
    try {
        const tasteType = req.params.tastetype; // tasteType પેરામીટરને req.params.tastetype માંથી એક્સેસ કરો
        
        // ચેક કરો કે tasteType માન્ય છે કે કેમ
        if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
            // જો માન્ય છે, તો ડેટાબેસમાંથી તે tasteType સાથેનું મેનુ આઈટમ શોધો
            const response = await MenuItem.find({ taste: tasteType });
            console.log('પ્રતિસાદ લાવવામાં આવ્યો');
            // સફળતા માટે 200 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
            res.status(200).json(response);
        } else {
            // જો tasteType અમાન્ય છે, તો 404 સ્થિતિ સાથે ભૂલ સંદેશ મોકલો
            res.status(404).json({ error: 'અમાન્ય રુચિ પ્રકાર' });
        }
    } catch (err) {
        // ભૂલ લોગ કરો
        console.log(err);
        // આંતરિક સર્વર ભૂલ માટે 500 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
        res.status(500).json({ error: 'આંતરિક સર્વર ભૂલ' });
    }
});










router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // પેરામીટરમાંથી id મેળવો
        const menuData = req.body; // રિક્વેસ્ટના બોડીમાંથી અપડેટ ડેટા લો

        // findByIdAndUpdate દ્વારા વ્યક્તિને અપડેટ કરો
        const response = await MenuItem.findByIdAndUpdate(menuId, menuData, {
            new: true, // નવા ડેટા સાથે પ્રતિસાદ મોકલો
            runValidators: true, // વેલિડેટર્સ ચલાવો
        });

        // જો વ્યક્તિ ન મળે, 404 મોકલો
        if (!response) {
            return res.status(404).json({ error: 'menu id not found' });
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
        const menuId = req.params.id; // પેરામીટરમાંથી id મેળવો
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'meni id  not found' });
        }

        console.log('data deleted');
        res.status(200).json({ message: 'data deleted' }); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' }); // આંતરિક સર્વર ભૂલ માટે 500 સ્થિતિ સાથે JSON પ્રતિસાદ મોકલો
    }
});










module.exports = router; // રાઉટર નિકાસ કરો
