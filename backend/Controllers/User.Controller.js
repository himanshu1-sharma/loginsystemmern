import User from "../Models/User.Model.js";

export const register = async (req, res) => {
    console.log('here', req.body)
    try {
        const { name, email, phone, password } = req.body
        if(!name, !email, !phone, !password) 
        return res.status(200).json(
            {
                errorcode: 2,
                status: false,
                msg: "Fill all this feilds",
                data: null
            }
        )

        const existingUser = await User.findOne({email: email, phone: phone})
        console.log("exists user",existingUser)
        if(existingUser) 
        return res.status(200).json({errorcode: 3, status: false, msg: "this email and phone no. already exists"})
        let user = new User({
            name,
            email,
            phone,
            password
        })
        user = await user.save()
        console.log('user', user)
        return res.status(200).json(
            {
                errorcode: 0,
                status: true,
                msg: "user register",
                data: user
            }
        )
    } catch (error) {
        return res.status(200).json(
            {
                errorcode: 5,
                status: false,
                msg: error.message,
                data: null
            }
        )
    }
}

export const login  = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({email: email})
        if(!user) return res.status(200).json({errorcode: 2, status: false, msg: "User doesn't exists", data: null})
        const cmpPass = await User.findOne({password: password})
        if(!cmpPass){
            res.status(200).json({ errorcode: 3, status: false, msg: "Incorrect Password", data: null })
        }
        else{
            return res.status(200).json({ errorcode: 0, status: true, msg: "Logged In Successfully", data: user })
        }
    } catch (error) {
        return res.status(400).json({ errorcode: 5, status: false, msg: error, data: error })
    }
}