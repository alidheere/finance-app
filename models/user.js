import  mongoose  from "mongoose";
import bcrypt from 'bcryptjs';

export const userSchema= new mongoose.Schema({
    name: String,
     email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum:["user", "admin"],
        default: "user"
    },
    profilePicture: {
  url: String,
  public_id: String
}

})

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

export default mongoose.model('User', userSchema);
