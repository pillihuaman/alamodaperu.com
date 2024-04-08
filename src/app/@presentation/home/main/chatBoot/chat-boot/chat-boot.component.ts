import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReqSpeech } from 'src/app/@data/model/general/reqSpeech';
import { ChatRepository } from 'src/app/@domain/repository/repository/chat.repository';

@Component({
  selector: 'app-chat-boot',
  templateUrl: './chat-boot.component.html',
  styleUrls: ['./chat-boot.component.scss'],
})
export class ChatBootComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private chatRepository: ChatRepository
  ) {}

  chatForm: FormGroup = this.formBuilder.group({
    keyWord: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(15)],
    ],
  });

  ngOnInit(): void {}
  submit() {

    const chat: ReqSpeech = {
      keyWord: this.chatForm.get('keyWord')?.value,
    };
    this.chatRepository.speech(chat).subscribe(
      (value) => {},
      (error) => {}
    );
  }
  state(trues: any) {
    return trues;
  }
}
