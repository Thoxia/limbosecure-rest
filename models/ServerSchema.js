const { default: mongoose } = require("mongoose");

const ServerSchema = mongoose.Schema(
    {
        serverId: {
            type: String,
            required: true,
            unique: true
        },
        ip: {
            type: String,
            required: true
        },
        premium: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Server = mongoose.model("servers", ServerSchema);

module.exports = Server;