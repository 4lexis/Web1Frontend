import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { Message } from '../_models/message';

import { AlertService, UserService, MessagesService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'messages.component.html'
})

export class MessagesComponent implements OnInit {
    loading = false;
    loadingMessages = false;
    loadingSentMessages = false;
    users: Array<User>;
    message: string;
    sentMessages: Array<Message> = [];
    receivedMessages: Array<Message> = [];    
    selectedUser = new User;
    myId = (JSON.parse(sessionStorage.getItem("user")) as User).Id;

    constructor(private router: Router,
            private userService: UserService,
            private alertService: AlertService,
            private messagesService: MessagesService) {  }

    ngOnInit() {
        this.getUsers();
        this.getSentMessages();
    }

    getUsers() {
        this.userService
        .getAll()
        .then(users => {
            this.users = users;  
            this.selectedUser = users[0];     
      })
    }

    getSentMessages() {
        this.messagesService.getAll()
        .then(messages => {
            this.sentMessages = [];

            for (let message of messages)
                if(message.Sender_Id == this.myId) this.sentMessages.push(message);

            this.loadingSentMessages = false;
        })
        .catch(throwable => {this.loadingSentMessages = false;})
    }

    onPostMessage() {
        let m = new Message;
        m.Text = this.message;
        m.Receiver_Id = this.selectedUser.Id;
        m.Sender_Id = (JSON.parse(sessionStorage.getItem("user")) as User).Id;

        debugger
        this.messagesService.sendMessage(m)
            .subscribe(
                data => {
                    this.alertService.success('Message sent successfully.', true);
                    this.loadingSentMessages = true;
                    this.message = "";
                    this.getSentMessages();
                },
                error => {
                    this.alertService.error('Error while sending message.');
            });     
    }

    getReceivedMessages() {
        this.loadingMessages = true;

        this.messagesService.getAll()
            .then(messages => {
                for (let message of messages)
                    if(message.Receiver_Id == this.myId) this.receivedMessages.push(message);
               
                this.loadingMessages = false;
            })
            .catch(throwable => {this.loadingMessages = false;});
    }
}