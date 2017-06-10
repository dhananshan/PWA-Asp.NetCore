
function processMessage(msgObj){
    try{
        if(msgObj.type==1){
            notify(msgObj.message);
            return "received";
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
