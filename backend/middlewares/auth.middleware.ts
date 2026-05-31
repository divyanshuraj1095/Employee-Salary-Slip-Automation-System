import jwt, { JwtPayload } from "jsonwebtoken";

const authUser = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unauthorized";
    res.status(401).json({ message });
  }
};

export default authUser;
