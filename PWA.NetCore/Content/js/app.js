
function processMessage(msgObj){
    try{
        if(msgObj.type==1){
            $.notify(msgObj.message);
        }
        console.log(msgObj);
    }catch(err)
    {
        console.log(err);
    }
}

module.exports = {
     processMessage:  processMessage,
};
