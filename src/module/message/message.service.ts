import { Injectable } from "@nestjs/common";

export class Message{
  constructor(id, name, text){
    this.id = id;
    this.name = name;
    this.text = text;
  }

  id: number
  name: string
  text: string
}

export class MessageService{
  static lastId = 0;

  static messagesById = new Map<number, Message>;
  static messagesByName = new Map<string, Message>;

  static addMessage_getId(name: string, text: string){
    if (MessageService.messagesByName.has(name))
      return MessageService.messagesByName.get(name).id;
    const message: Message = new Message(MessageService.lastId, name, text);
    MessageService.messagesById.set(MessageService.lastId, message);
    MessageService.messagesByName.set(name, message);
    return MessageService.lastId++;;
  }

  static DifferentPasswords(){
    return MessageService.addMessage_getId(
      'different_password',
      'Пароли не совпадают. Повторите попытку.'
    );
  }

  static UserAlreadyExists(){
    return MessageService.addMessage_getId(
      'user_already_exists',
      'Пользователь с таким именем уже существует. Попробуйте другое.'
    );
  }

  static UserNotExists(){
    return MessageService.addMessage_getId(
      'user_not_exists',
      'Пользователя с таким именем не существует'
    )
  }

  
}