// импортируем ядро библиотеки кодеков
import ffmpeg from 'fluent-ffmpeg'
// импортируем модуль конвертации
import installer from '@ffmpeg-installer/ffmpeg'
import axios from "axios"
import { createWriteStream } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { removeFile } from './utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url)) 

class OggConverter {
    constructor() {
        // Как только вызывается конструктор - мы устанавливаем путь до конвертера
        ffmpeg.setFfmpegPath(installer.path)
    }
    
    toMp3(input, output) {
    // input - oggPath, output - выходной файл
    try {
        const outputPath = resolve(dirname(input), `${output}.mp3`)
        return new Promise((resolve, reject) => {
            ffmpeg(input)
                .inputOption('-t 30')
                .output(outputPath)
                .on('end', () => {
                    removeFile(input)
                    resolve(outputPath)
                })
                .on('error', err => reject(err.message))
                .run()
        })
    } catch (e) {
        console.log('Error on creating mp3 file', e.message);
    }
    }

    async create(url, filename) {
        // скачиваем наш файл с серверов ТГ
        try {
            const oggPath = resolve(__dirname, '../voices', `${filename}.ogg`)
            const response = await axios({
                method: 'get',
                url, 
                responseType: 'stream'
            })
            return new Promise(resolve => {
                // передаем путь, по которому файл будет храниться
                const stream = createWriteStream(oggPath)
                response.data.pipe(stream)
                stream.on('finish', () => resolve(oggPath))
            })
         
        } catch (e) {
console.log('Error on creating ogg file', e.message)
        }
        
     
    }
        
    }

export const ogg = new OggConverter()