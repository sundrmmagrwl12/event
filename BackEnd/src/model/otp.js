import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        trim : true,
    },
    otp:{
        type : String,
        required : true,
        trim : true,
    }

},{timestamps : true});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;