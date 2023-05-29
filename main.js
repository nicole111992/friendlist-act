function save(event) {
  var id = document.getElementById('inputFriendId').value;
  var fullName = document.getElementById('inputFriendName').value;
  var age = document.getElementById('inputFriendAge').value;
  var birthdate = document.getElementById('inputFriendBirthdate').value;
  var email = document.getElementById('inputFriendEmail').value;
  var phone = document.getElementById('inputFriendPhone').value;
  var duration = document.getElementById('inputFriendDuration').value;
  var socialMedia = document.getElementById('inputFriendSocial').value;

  var friendList = JSON.parse(localStorage.getItem('friendList')) || [];
  if (fullName=== "" || age === "" || birthdate === "" || email=== "" || phone === "" || duration === "" || socialMedia === ""){
    alert("Please fill out the form");
    return;
  }
  if (id) {
    // Update existing friend
    friendList.forEach((friend) => {
      if (friend.id == id) {
        friend.fullName = fullName;
        friend.age = age;
        friend.birthdate = birthdate;
        friend.email = email;
        friend.phone = phone;
        friend.duration = duration;
        friend.socialMedia = socialMedia;
      }
    });
    document.getElementById('inputFriendId').value = '';
  } else {
    // Add new friend
    var friend = {
      id: friendList.length > 0 ? friendList[friendList.length - 1].id + 1 : 1,
      fullName: fullName,
      age: age,
      birthdate: birthdate,
      email: email,
      phone: phone,
      duration: duration,
      socialMedia: socialMedia,
    };
    friendList.push(friend);
  }

  localStorage.setItem('friendList', JSON.stringify(friendList));
  allData();
  document.getElementById('form').reset();
}

function allData() {
  var table = document.getElementById('table');
  table.innerHTML = '';

  var friendList = JSON.parse(localStorage.getItem('friendList')) || [];

  friendList.forEach(function (friend, index) {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${friend.fullName}</td>
        <td>${friend.age}</td>
        <td>${friend.birthdate}</td>
        <td>${friend.email}</td>
        <td>${friend.phone}</td>
        <td>${friend.duration}</td>
        <td>${friend.socialMedia}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="find(${friend.id})">
            <i class="fa fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeData(${friend.id})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function removeData(id) {
  var friendList = JSON.parse(localStorage.getItem('friendList')) || [];
  friendList = friendList.filter(function (friend) {
    return friend.id != id;
  });
  localStorage.setItem('friendList', JSON.stringify(friendList));
  allData();
}

function find(id) {
  var friendList = JSON.parse(localStorage.getItem('friendList')) || [];
  friendList.forEach(function (friend) {
    if (friend.id == id) {
      document.getElementById('inputFriendId').value = friend.id;
      document.getElementById('inputFriendName').value = friend.fullName;
      document.getElementById('inputFriendAge').value = friend.age;
      document.getElementById('inputFriendBirthdate').value = friend.birthdate;
      document.getElementById('inputFriendEmail').value = friend.email;
      document.getElementById('inputFriendPhone').value = friend.phone;
      document.getElementById('inputFriendDuration').value = friend.duration;
      document.getElementById('inputFriendSocial').value = friend.socialMedia;
    }
  });
}

allData();
