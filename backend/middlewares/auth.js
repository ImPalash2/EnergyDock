import jwt from "jsonwebtoken";

console.log("Inside auth.js");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth failed.",
          success: false,
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed.",
      success: false,
    });
  }
};

export default auth;

console.log("After auth.js");
