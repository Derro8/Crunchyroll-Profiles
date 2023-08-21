/*
  Handles the message url traffic.
*/

request.block([URLS.message], "GET", (info) => {
    let messages = info.details.url.split("message=")[1].split("&")[0].split(",");
    let type = info.details.url.split("type=")[1].split("&")[0];
  
    type = parseInt(type);
  
    switch(type) {
      case 0:
        avatar = messages[0];
        username = messages[1];
  
        profile = new crunchyProfile();
  
        profile.avatar = avatar;
        profile.username = username;
  
        storage.getUsers((profiles) => {
          let count = 0;
  
          for(let i of profiles.others) {
            count++;
          }
  
          profiles.current = count;
          profiles.others.push(count);
  
          storage.set(count, "profile", profile);
          url = browser.extension.getURL("/src/pages/profile/profile.html")
          tabExec('window.location.href = "' + url + '"');
        })
        break;
      case 1:
        let js = JSON.parse(messages[0].replaceAll("$LERE", ",").replaceAll("%22", "\"").replaceAll("$LCASE", "}"));
        switch(js.type){
          case 1:
            // Import profile.
            storage.set(storage.currentUser, "profile", js.value);
            tabExec('window.location.reload()');
            break;
          
        }
        break;
    }
  });