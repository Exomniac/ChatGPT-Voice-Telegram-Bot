import { OpenAI } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAIMain {
    constructor(key) {
        this.openai = new OpenAI({ apiKey: key})
    }

        chat () {}

        // создаем поток на чтение из файла, указываем модель, которая будет его читать
        async transcription (filepath) {
            try {
                console.log(filepath)
                await this.openai.audio.transcriptions.create({
                model: 'whisper-1',
                file: createReadStream(filepath)
                })
                return response.data.text
            } catch (e) {
                console.log('Error during transcription', e.message)
            }
        }
}

export const openai = new OpenAIMain(config.get('OPENAI_KEY'))