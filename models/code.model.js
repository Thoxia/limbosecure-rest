const { default: mongoose } = require("mongoose");

const CodeSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ['VERIFIED', 'VALID', 'NOT_FOUND'],
            required: true,
            default: 'VALID',
        },
        serverId: {
            type: String,
            required: true,
        },
        discordId: {
            type: String,
            required: true,
        },
        createdAt: { type: Date, expires: 300, default: Date.now }
    },
    {
        timestamps: true
    }
)

const Code = mongoose.model("codes", CodeSchema);

module.exports = Code;