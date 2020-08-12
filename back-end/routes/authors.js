const router = require('express').Router();

const {test} = require('../query');

router.route('/:drug/:disease').get( (req,res) => 
{
    const drug = req.params.drug;
    const disease = req.params.disease;


    if( !drug || !disease  )
    {
        res.status(400).send('Bad Request');
        return;
    }

    test(drug,disease,res);
    
});






module.exports = router;

