const { tokenValidator } = require("./token.js");

module.exports = async function(req, res, next) {
    try {
        const { jwt } = req.cookies;
        const valid =  await tokenValidator(jwt);
        if(valid){
            next();
        } else {
            res.send("Access Denied");
        }
    } catch(e){
        res.send(e);
    }
};
