function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    // 메세지 정보 확인
    const obj = {
        "isGroupChat": isGroupChat,
        "sender": sender,
        "msg": msg,
        "imageDB": imageDB,
        "packageName": packageName
    };

    replier.reply(JSON.stringify(obj));

    // 단톡이 아닐 때
    if (!isGroupChat) {
        switch (msg) {
            case 'ㅎㅇ':
                replier.reply(room, 'ㅎㅇ');
            default:
                replier.reply(room, msg);
        }
    }
}