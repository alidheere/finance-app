// import User from '../models/user.js';

// import { generateToken } from '../utils/genarateToken.js';

// export const register = async (req, res) => {
//     try {
//         let { name, password, email, role } = req.body;

//         email = email.toLowerCase();

//         const exists = await User.findOne({ email });

//         if (exists) {
//             return res.status(400).json({
//                 message: "Email already exists"
//             });
//         }

//         const user = await User.create({
//             name,
//             password,
//             email,
//             role
//         });

//         const token = generateToken(user._id);

//         res.status(201).json({ token });

//     } catch (err) {
//         console.log("REGISTER ERROR:", err);

//         res.status(500).json({
//             message: err.message
//         });
//     }
// };

export const login= async (req, res, next)=>{
    let {email, password}=req.body
    try{
        email= email.toLowerCase()

        const user = await User.findOne({email})
        if(!user || !( await user.comparePassword(password))){
            return res.status(401).json({massage: "invalid email or password"})
            console.log(user)
        }
        console.log("login info", user)
        const token = generateToken(user._id)

        res.json({token})
    }catch(err){
        next(err)
    }
}


import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";
import { generateToken } from "../utils/genarateToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    let profilePicture;

    // Upload picture if provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profile",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      profilePicture = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Create user
     const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      profilePicture,
    });

    // Generate token
    const token = generateToken(user._id);

    // Return token only
    res.status(201).json({
      token,
    });
  } catch (error) {
    next(error);
  }
}
