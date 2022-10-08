const { mongoose } = require("mongoose");
module.exports = (mongoose)=>{
    const UserSchema = mongoose.Schema(
        {
            childs_name: { type: String, required: true },
            childs_birth: { type: Number, required: true }, // tambahan
            childs_gender: { type: String, required: true },
            parents_name: { type: String, required: true },
            parents_phone: { type: String, required: true }, // tambahan
            childs_nik: { type: Number, required: true, index: { unique: true, dropDups: true } },
            // address: { type: String, required: true },
            // posyandu_name: { type: String, required: true },
            // posyandu_address: { type: String, required: true },
            data: [
                {
                    type: mongoose.Schema(
                        {
                            fullDate: { type:Number, required: true },
                            date: { type:Number, required: true },
                            month: { type:Number, required: true },
                            year: { type:Number, required: true },
                            weight: { type:Number, required: true },
                            height: { type:Number, required: true },
                            status_h: { type:String, required: true },
                            status_w: { type:String, required: true },
                            status_a: { type:String, required: true },
                        },
                        { timestamps: true }
                    )
                }
            ]
            // weight: [
            //     {
            //         type: mongoose.Schema(
            //             {
            //                 fullDate: { type:Number, required: true },
            //                 date: { type:Number, required: true },
            //                 month: { type:Number, required: true },
            //                 year: { type:Number, required: true },
            //                 value: { type:Number, required: true },
            //             },
            //             { timestamps: true }
            //         )
            //     }
            // ],
            // height: [
            //     {
            //         type: mongoose.Schema(
            //             {
            //                 fullDate: { type:Number, required: true },
            //                 date: { type:Number, required: true },
            //                 month: { type:Number, required: true },
            //                 year: { type:Number, required: true },
            //                 value: { type:Number, required: true },
            //             },
            //             { timestamps: true }
            //         )
            //     }
            // ],
    
        },
        { timestamps: true }
    )

    const User = mongoose.model("users", UserSchema)
    return User
}


// module.exports = mongoose.model('User', UserSchema)