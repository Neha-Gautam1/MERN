const {z} = require('zod');

const signupSchema = z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 char."})
    .max(255,{message:"Name must not be more than 255 char."}),
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .min(3,{message:"Email must be atleast 3 char."})
    .max(255,{message:"Email must not be more than 255 char."}),
    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be atleast 10 digit."})
    .max(20,{message:"Phone must not be more than 20 digit."}),
    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast 7 char."})
    .max(1024,{message:"Password must not be more than 1024 char."}),
});

module.exports=signupSchema;