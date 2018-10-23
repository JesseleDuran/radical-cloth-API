'use strict'
const Mensaje = use('App/Models/Mensaje')
class ChatController {

    async send ({request, response, auth}) {
        const mensajeInfo = request.only(['chat_id', 'mensaje'])
        const mensaje = new Mensaje()
        mensaje.autor_1 = auth.user.id
        mensaje.chat_id = mensajeInfo.chat_id
        mensaje.mensaje = mensajeInfo.mensaje
        try {
            await mensaje.save()
            return response.status(201).json({"mensaje": mensaje})
        } catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }

    async index ({request, response}) {
        const chat = await Mensaje
        .query()
        .where('chat_id', request.get().chat_id)
        .fetch()
        return response.json(chat)
    }
}

module.exports = ChatController
