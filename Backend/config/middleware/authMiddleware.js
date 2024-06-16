const JWT = require("jsonwebtoken");
//middleware to check if the user is authenticated
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];//get the token from the header
    //verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
