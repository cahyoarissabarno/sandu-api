const { mongoose } = require("mongoose");
module.exports = (mongoose)=>{
    const KaderSchema = mongoose.Schema(
        {
            username: { type: String, required: true },
            password: { type: String, required: true }, 
        },
        { timestamps: true }
    )

    const Kader = mongoose.model("kader", KaderSchema)
    return Kader
}

