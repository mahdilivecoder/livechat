var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message.js');

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
describe('generateLocationMessage',()=>{
    it('Should Work correctly in this case!',()=>{
       var from='Deb';
       var lantitude=15;
       var longitude=19;
       var url='http://www.google.com/maps?q=15,19';
       var message=generateLocationMessage(from,lantitude,longitude);
        expect(message.createdAt).toBe('number');
        expect(message).toInclude({
            from,
            url
        });
    });
});







