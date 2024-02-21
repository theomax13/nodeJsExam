import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user";
import { Request, Response } from "express";
import { sign } from "../utils/jwtUtil";
import RefreshToken from "../models/refreshToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user: IUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const result = await user.save();

    const jwt = sign({ _id: result._id }, { expiresIn: "15m" }); // JWT expires in 15 minutes
    const refreshToken = sign({ _id: result._id }, { expiresIn: "7d" }); // Refresh token expires in 7 days

    const refreshTokenDoc = new RefreshToken({
      token: refreshToken,
      user: result._id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });
    await refreshTokenDoc.save();

    res.json({ result, jwt, refreshToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const jwt = sign({ _id: user._id }, { expiresIn: "15m" }); // JWT expires in 15 minutes
      const refreshToken = sign({ _id: user._id }, { expiresIn: "7d" }); // Refresh token expires in 7 days

      const refreshTokenDoc = new RefreshToken({
        token: refreshToken,
        user: user._id,
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });
      await refreshTokenDoc.save();

      res.json({ jwt, refreshToken });
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
