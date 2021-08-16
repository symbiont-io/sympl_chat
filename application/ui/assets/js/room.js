
let room_channel = ''

function init() {
    room_channel = window.location.hash.substr(1);
    //initialize the list of rooms
    call_api("POST", "get_rooms").then(rooms=> {
        console.log(rooms)
        for(let room of rooms) {
            add_room(room);
        }
    })
    load_messages();

    window.scrollTo(0,0);

    //events 
    document.querySelector("#btn-send-message").addEventListener('click', send_message)
}

function send_message(e) {
    let input_element = document.querySelector("#inp-send-message")
    call_api("POST", "send_message", {
        "room_channel":room_channel, 
        "message":input_element.value})
    input_element.value = "";
}

function add_room(room) {
    let li = document.createElement("li");
    li.id = room.channel;
    let link = document.createElement("a")
    link.href = `/room#${room.channel}`;
    link.innerHTML = room.name;
    li.appendChild(link);
    document.querySelector("#room-items").appendChild(li);
} 

function add_message(message) {
    let msg_dom = document.createElement("p");
    msg_dom.innerHTML = `${message.sender}: ${message.body}`;
    document.querySelector("#messages").appendChild(msg_dom)
}

function load_messages() {
    if(room_channel) {
        document.querySelector("#messages").innerHTML = "";
        call_api("POST", "get_messages", { "room_channel" : room_channel} ).then( messages => {
            for(let message of messages) {
                add_message(message);
            }
        })
    }       
}

window.addEventListener('hashchange', () => {
    room_channel = window.location.hash.substr(1);
    load_messages();
})

window.addEventListener('load', () => {
    init();
})