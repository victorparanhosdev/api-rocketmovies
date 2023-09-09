const fs = require("fs")
const path = require("path")

const uploadConfig = require("../config/upload")


class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP, file),
            path.resolve(uploadConfig.UPLOADS, file)
        )
        return file
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS, file)
        try{
            await fs.promises.stat(filePath)

        }catch {
            return
        }

        await fs.promises.unlink(filePath)

    }

}


module.exports = DiskStorage