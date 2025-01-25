import jwt from "jsonwebtoken";
 

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined && authHeader !== null)
    jwtToken = authHeader.split(" ")[1];
  if (jwtToken === undefined || jwtToken === null || jwtToken === "") {
        response.status(401);
        response.send({ message: "Invalid JWT Token" });
  } 
  else {
        jwt.verify(jwtToken, process.env.SECRET_KEY, async (error, payload) => {
        if (error) {
            response.status(401);
            response.send({ message: `Invalid JWT Token with error ${error}` });
        } else {
            // console.log(payload);
            request.role = payload.role;
            request.email = payload.email;
            request.id = payload.id;
            next();
        }
        });
  }
};

export { authenticateToken };
