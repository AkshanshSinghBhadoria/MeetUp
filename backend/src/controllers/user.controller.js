import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import { User } from "../models/user.model.js";


const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ message: "please Provide" });
    }

    try {
        const user = await User.findOne({username});
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found "});
        }

        if(bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });
        }

    } catch(e) {
        return res.status(500).json({ message: `Something went wrong ${e}` });
    }
}

const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });
        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" });

    } catch(e) {
        res.json({ message: `Somthing went Wrong ${e}`});
    }
}

export { login, register };