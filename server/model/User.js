import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    }
});

const UserModel = mongoose.model("users", UserSchema)
export default UserModel; 