const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {JWT_KEY} = require("../config")
const { User, Account } = require("../db.js");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional()
});

router.post("/signup", async(req, res) => {
    const object = signupBody.safeParse(req.body);
    if(!object.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    await Account.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000
    })

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_KEY);

    res.json({
        message: "User created successfully",
        token: token
    })
});

router.post("/signin", async(req, res) => {
    const object = signinBody.safeParse(req.body);
    if(!object.success){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(existingUser){
        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_KEY);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

router.put("/", authMiddleware, async(req, res) => {
    const object = updateBody.safeParse(req.body);

    if(!object.success){
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.findOneAndUpdate({_id: req.userId}, req.body);
    
    res.json({
        message: "Updated successfully"
    })
});

router.get("/bulk", authMiddleware, async(req, res) => {
    let filter = req.query.filter || "" ;

    //pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    let skip = (page - 1) * limit;

    let totalDocs = await User.countDocuments();
    totalDocs = totalDocs - 1;
    const totalPages = Math.ceil(totalDocs/limit);

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter,
                $options: "i"
            }
        },{
            lastName: {
                $regex: filter,
                $options: "i"

            }
        }],
        _id: { $ne: req.userId}
    })
    .skip(skip)
    .limit(limit);

    //fitler users i.e dont return user who has logged in
    // const filterUsers = users.filter((user) => (req.userId != user._id) );

    res.json({
        users: users.map( (user) => {
            return {
                username: user.username,
                firstName : user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        }),
        totalPages: totalPages

    })
    });

router.get("/info", authMiddleware, async(req, res) => {
    const userInfo = await User.findById(req.userId);
    res.json({
        username: userInfo.username,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName
    });
})

module.exports = router;