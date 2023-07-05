
const postDogValidate = (req, res, next)=>{
    const { name, heightMin, heightMax, weightMin, weightMax, life_spanMin, life_spanMax } = req.body;
    const regex_string = /[^a-zA-Z ]/;
    if(regex_string.test(name)) res.status(400).json({error: 'Name must not contain numbers or special characters'});
    if(!name.length) res.status(400).json({error: 'Name cannot be an empty field'})
    if(name.length > 30) res.status(400).json({error: 'Name exceeds the number of characters allowed'})
    if(!Number(heightMin)) res.status(400).json({error: 'Height min must be a number'});
    if(!Number(heightMax)) res.status(400).json({error: 'Height max must be a number'});
    if(!Number(weightMin)) res.status(400).json({error: 'Weight min must be a number'});
    if(!Number(weightMax)) res.status(400).json({error: 'Weight max must be a number'});
    if(!Number(life_spanMin)) res.status(400).json({error: 'Life span min must be a number'});
    if(!Number(life_spanMax)) res.status(400).json({error: 'Life span max must be a number'});
    if(!(heightMin > 0 && heightMin < 200)) res.status(400).json({error: 'Height min must be greater than 0 and less than 200'});
    if(!(heightMax > 0 && heightMax < 200)) res.status(400).json({error: 'Height max must be greater than 0 and less than 200'});
    if(!(weightMin > 0 && weightMin < 200)) res.status(400).json({error: 'Weight min must be greater than 0 and less than 200'});
    if(!(weightMax > 0 && weightMax < 200)) res.status(400).json({error: 'Weight max must be greater than 0 and less than 200'});
    if(!(life_spanMin > 0 && life_spanMin < 99)) res.status(400).json({error: 'Life span min must be greater than 0 and less than 99'});
    if(!(life_spanMax > 0 && life_spanMax < 99)) res.status(400).json({error: 'Life span max must be greater than 0 and less than 99'});
    next();
}

module.exports = {postDogValidate}