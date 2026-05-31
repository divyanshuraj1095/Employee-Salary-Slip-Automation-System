import jwt, { JwtPayload } from "jsonwebtoken";

const authUser = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (err: any) {
    res.status(401).send("ERROR: " + err.message);
  }
};

export default authUser;