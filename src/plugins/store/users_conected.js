let user_conected = {}
let users = []

user_conected.add = function (user) {
	users.push(user)
}

user_conected.all = function () {
  users = users.filter((thing, index) => {
  const _thing = JSON.stringify(thing);
    return index ===  users.findIndex(obj => {
      return JSON.stringify(obj) === _thing;
    });
  });
  return users;
}

user_conected.remove = function (user) {
	var index = users.indexOf(user);
    if (index !== -1) {
      users.splice(index, 1);
    }
}

export default user_conected