const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS = path.resolve(TMP, "uploads")

const MULTER = {
   storage: multer.diskStorage({
    destination: TMP,
    filename(request, file, callback){
        const fileHashed = crypto.randomBytes(8).toString("hex")
        const fileName = `${fileHashed}-${file.originalname}`
        return callback(null, fileName)
    }

   })
}

module.exports = {
    TMP, UPLOADS, MULTER
}