
if(Meteor.isClient){

	Template.rooms.helpers({
		rooms: function(){
			return Chats.find();
		}
	})

	Template.newRoom.events({
		"submit #newRoomForm": function(e){
			var roomName = e.target.newRoomName.value;
			Chats.insert({
		      roomName: roomName,
		      createdAt: new Date() // current time
		    });

		    // Clear form
		    e.target.newRoomName.value = "";

		    // Prevent default form submit
		    return false;
		}
	})

	Template.room.helpers({
		room: function(){
			console.log(this)
			// return Chats.find({this._id})
		}
	})

	Template.room.events({
		"submit #newMessage": function(e){
			var msg = e.target.message.value;
			var room_id = e.target.room_id.value;

			Meteor.call('sendChatMessage', msg, room_id)

		    // Clear form
		    e.target.message.value = "";

		    // Prevent default form submit
		    return false;
		}
	})

}

Meteor.methods({
	sendChatMessage: function(msg, room_id){
		var msgObj = {
			msg: msg,
			createdAt: new Date()
		}
		Chats.update({'_id': room_id}, {$push:{'msgs':msgObj}});
	}
})