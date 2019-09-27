# Summary
The server files are largely spread out between 15 main files:
* server.js
* data.json
* checkUser.js
* fetchUser.js
* fetchAllUsers.js
* addUser.js
* deleteUser.js
* fetchAllGroups.js
* addGroup.js
* deletegroup.js
* addUsersToGroup.js
* deleteUsersFromGroup.js
* fetchAllChannels.js
* addChannel.js
* deleteChannel.js
* addUsersToChannel.js
* deleteUsersFromChannel.js

## server.js
**server.js** is the main file that will run the server.

## data.json
This is my data structure:
{
    **"users"**: [
        {
            *"username"*: "super",
            *"email"*: "super@com.au",
            *"role"*: "superadmin"
        },
        {
            *"username"*: "james",
            *"email"*: "james@com.au",
            *"role"*: "superadmin"
        },
        {
            *"username"*: "group",
            *"email"*: "group@com.au",
            *"role"*: "groupadmin"
        },
        {
            *"username"*: "groupass",
            *"email"*: "groupass@com.au",
            *"role"*: "groupassis"
        },
        {
            *"username"*: "member1",
            *"email"*: "member1@com.au",
            *"role"*: "user"
        }
    ],
    **"groups"**: [
        {
            *"groupname"*: "2811ICT",
            *"users"*: [
                "groupass",
                "member1"
            ]
        },
        {
            *"groupname"*: "3811ICT",
            *"users"*: []
        },
        {
            *"groupname"*: "3813ICT",
            *"users"*: []
        }
    ],
    **"channels"**: [
        {
            *"channelname"*: "Lab",
            *"groupname"*: "2811ICT",
            *"users"*: [
                "group"
            ]
        },
        {
            *"channelname"*: "Assignment",
            *"groupname"*: "2811ICT",
            *"users"*: []
        }
    ]
}

# Routes

### Login
**[GET]checkUser.js**:<br/>
This route returns **userValid** (true or false) to determine whether the user is in the data.json when the user enters the username.

### User
**[GET]fetchUser.js**:<br/>
This route returns the information of the current logged-in **user** (username, email, and role).

**[GET]fetchAllUsers.js**:<br/>
This route returns an array containing all **users** objects.

**[POST]addUser.js**:<br/>
The client user *(superadmin and groupadmin)* enters the username, email, and role. This route reads and writes data.json file, and checks wheher the user exists. Add the new user to the data.json file and return a **users** list.

**[DELETE]deleteUser.js**:<br/>
The client user *(superadmin)* select the username he/she want to delete. This route reads data.json file and removes selected user from users array. And writes new users list into data.json file and returns a **users** list except the selected user.

### Group
**[GET]fetchAllGroups.js**:<br/>
This route returns an array containing all **groups** objects.

**[POST]addGroup.js**:<br/>
The client user *(superadmin and groupadmin)* enters the groupname. This route reads and writes data.json file, and checks wheher the group exists. Add the new group to the data.json file and return a **groups** list (groupname and an empty users array in a group).

**[DELETE]deletegroup.js**:<br/>
The client user *(superadmin and groupadmin)* select the groupname he/she want to delete. This route reads data.json file and removes selected group from groups array. And writes new groups list into data.json file and returns a **groups** list except the selected group.

**[POST]addUsersToGroup.js**:<br/>
The client user *(superadmin and groupadmin)* selects the username and groupname. This route reads and writes data.json file. Add the exist user to the selected group in the data.json file and return a **groups** list.

**[DELETE]deleteUsersFromGroup.js**:<br/>
The client user *(superadmin and groupadmin)* selects the username and groupname. This route reads and writes data.json file. Delete the exist user from the selected group in the data.json file and return a **groups** list.

### Channel
**[GET]fetchAllChannels.js**:<br/>
This route returns an array containing all **channels** objects.

**[POST]addChannel.js**:<br/>
The client user *(superadmin and groupadmin and groupassis)* enters the channelname and groupname. This route reads and writes data.json file, and checks wheher the channel exists. Add the new channel to the data.json file and return a **channels** list (channelname, groupname and an empty users array in a channel).

**[DELETE]deleteChannel.js**:<br/>
The client user *(superadmin and groupadmin and groupassis)* select the channelname he/she want to delete. This route reads data.json file and removes selected channel from channels array. And writes new channels list into data.json file and returns a **channels** list except the selected channel.

**[POST]addUsersToChannel.js**:<br/>
The client user *(superadmin and groupadmin and groupassis)* selects the username and channelname. This route reads and writes data.json file. Add the exist user to the selected channel in the data.json file and return a **channels** list.

**[DELETE]deleteUsersFromChannel.js**:<br/>
The client user *(superadmin and groupadmin and groupassis)* selects the username and channelname. This route reads and writes data.json file. Delete the exist user from the selected channel in the data.json file and return a **channels** list.