import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req,res) => {
    try {
        const { fullName, email,phoneNumber, password, role } = req.body;
        
        if(!fullName || !email || !password ||  !phoneNumber || !role ) {
            return res.status(400).json({ 
                message: 'All fields are required', 
                success: false    
            });
        }
        

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudRes = await cloudinary.uploader.upload(fileUri.content)

        const existingUser = await User.findOne({ email });     
        if(existingUser){
            return res.status(400).json({
                message: 'Email already exists',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName, 
            email, 
            password: hashedPassword, 
            phoneNumber, 
            role,
            profile:{
                profilePhoto:cloudRes.secure_url,
            }
        });
        return res.status(201).json({
            message: 'User registered successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        console.log("Sumit hrere");
        
        return res.status(400).json({
            message: 'Failed to register user',
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if(!email ||!password || !role) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            });
        }
        if(user.role!== role) {
            return res.status(403).json({
                message: 'Invalid role',
                success: false
            });
        }
        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1 * 60 * 60 * 24 * 1000, httpsOnly: true, sameSite:'strict'}).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });

    }
    catch (error) {
        console.log(error);
    };
}

export const logout = async (req, res, ) => {
    try {
        return res.status(200).cookie("token","",{maxAge: 0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req, res) => {
    try {
        
        const { fullName, email, bio, phoneNumber, skills } = req.body;
        
        const file = req.file;

        const fileUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",")
        }
        const userid = req.id;
        let user = await User.findById(userid);
    
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
    
        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(bio) user.profile.bio = bio;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(skills) user.profile.skills = skillsArray;


        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: 'User updated successfully',
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
    
}