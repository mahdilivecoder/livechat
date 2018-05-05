var expect=require('expect');

var {generateMessage}=require('./message.js');

describe('generateMessage',()=>{
   it("Should work correctly in this case!",()=>{
       var from="This is a livecoder";
       var text="livecoder is not yet";
       var message=generateMessage(from,text);

        expect(message.createdAt).toBe('number');
        expect(message).toInclude({
           from,
           text
        });
    });
});








