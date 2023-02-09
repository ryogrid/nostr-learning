import { Component } from '@angular/core';

declare const NostrEmitter: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'nostr-paint';
  public emitter

  constructor() {
    // Specify optional parameters.
    this.emitter = new NostrEmitter({
      version : 0,          // Nostr protocol version.
      //kind    : 29001,      // Default event type (ephemeral).
      kind    : 1,      // Default event type (ephemeral).
      selfPub : false,      // Filter self-published events.
      socket  : new WebSocket('wss://relay.damus.io'),  // Specify your own websocket object.
      tags    : ["nostr-paint"],         // Add your own tags to each message.
      filter  : {kinds: 1, "#e": "nostr-paint"}          // Add your own subscription filters.
    })

    //this.emitter = new NostrEmitter();

    // this.emitter.connect(
    //   //'wss://nostr.developer.li',
    //   'wss://relay.damus.io',
    //   'nostr-paint'
    // ).then(()=>{
    //   this.emitter.on('paint', (eventData:any) => {
    //     console.log('parint: ', eventData);
    //   })
    //   this.emitter.opt.selfsub = false
    // })

    this.emitter.connect(
      //'wss://nostr.developer.li',
      null,
      null
    ).then(()=>{
      this.emitter.on('paint', (eventData:any) => {
        console.log('parint: ', eventData);
      })
      this.emitter.opt.selfsub = false    
    })
    
  }

  emitPaint(){
    this.emitter.emit('paint', 'painted!')
  }

}
