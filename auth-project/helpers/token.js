const jwt = require("jsonwebtoken")
JWT_KEY = "ksjfksjdfkfjaskdjfdfjaok"


const tokenGen = async (email) => {
    try {
        const token = jwt.sign(
            { email }, // Wrap email in an object
            JWT_KEY, 
            { expiresIn: "3 hours" }
        );
        return token;
    } catch (error) {
        console.error("Error occurred while generating token:", error);
    }
};

const tokenValidator = (token) => {
    try {
        const data =  jwt.verify(token,JWT_KEY)
        return data;
    } catch(error){
        return false
    }
}


module.exports.tokenGen = tokenGen;
module.exports.tokenValidator = tokenValidator;