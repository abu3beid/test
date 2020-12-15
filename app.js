const Instagram = require("instagram-web-api");
const fs = require("fs");
const { username, password } = { username: "m76eef", password: "@m76eef0597@" };
const m76eef = "494754483";

const client = new Instagram({ username, password });

async function insta() {
  let index = 0;
  var end_cursor;
  const followersArr = [];
  try {
    await client.login();
  } catch (err) {
    console.log("err in login");
    return;
  }

  while (true) {
    try {
      const followers = await client.getFollowers({
        userId: m76eef,
        first: 50,
        after: end_cursor,
      });
      followers.data.forEach(function (value) {
        //followersArr.push(value.username);
        index++;
        console.log(index + ": " + value.username);
      });
      end_cursor = followers.page_info.end_cursor;
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      const temp = JSON.stringify(err, 3, 3);
      fs.writeFileSync("error.txt", temp);
      return;
    }
  }
}
insta();
