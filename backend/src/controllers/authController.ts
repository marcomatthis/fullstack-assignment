import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { users } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ name, surname, email, passwordHash });

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = { email: user.email };
  res.json({ message: "Login Successful", email });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "Logged out" });
  });
};

export const getSession = (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.session && req.session.user) {
    res.json({ loggedIn: true, email: req.session.user.email });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};
