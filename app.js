// let pre_registered_users = fetch("users.json")
//   .then((response) => response.json())
//   .then((data) => data);

// console.log(pre_registered_users.then((data) => console.log(data)));

// async function fetchData(url) {
//   try {
//     let response = await fetch(url);
//     let data = response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

async function getData(url) {
  let response = await fetch(url);
  let data = response.json();
  return data;
}

function saveLocal(items, itemName) {
  localStorage.setItem(itemName, JSON.stringify(items));
}

async function getUser() {
  let users = await getData("users.json"); //[1, 2, 3]

  saveLocal(users, "users"); //သိမ်းထားမယ် json server data

  // console.log(users);
  let signUpForm = $("#signup-form");

  signUpForm.on("submit", (e) => {
    e.preventDefault();
    let signUpUserName = $("#signup-form-username").val();
    let signUpEmail = $("#signup-form-email").val();
    let signUpPass = $("#signup-form-password").val();
    let signUpConfirmPass = $("#signup-form-confirm-password").val();

    if (signUpPass != signUpConfirmPass) {
      alert("Password မတူဘူးဖြစ်နေတယ်!!!");
      return;
    } else {
      signUpForm.trigger("reset");
      console.log(signUpUserName, signUpEmail);

      let newUser = {
        userName: signUpUserName,
        email: signUpEmail,
        password: signUpPass,
      };

      console.log(users);
      users.push(newUser);
      console.log(users);

      saveLocal(users, "users"); // json data + အကောင့် အသစ်
    }
  });

  let loginForm = $("#login-form");

  loginForm.on("submit", (e) => {
    e.preventDefault();

    let loginEmail = $("#login-form-email").val();
    let loginPass = $("#login-form-password").val();
    // users.forEach((user) => {
    //   if (user.email === loginEmail && user.password === loginPass) {
    //     console.log("အကောင့်  တွေ့သွားပြီ");
    //   } else {
    //     console.log("အကောင့်မတွေ့ပါ");
    //   }
    // });

    let loginUser = users.find((user) => {
      return user.email === loginEmail && user.password === loginPass;
    });

    console.log(loginUser);

    if (loginUser) {
      console.log("အကောင့်ဝင်တာ အောင်မြင်ပါတယ်။");
    } else {
      console.log("အကောင့် ဝင်တာ မအောင်မြင်ပါ။ ");
    }

    // for (let i = 0; i < users.length; i++) {
    //   console.log(users[i]);
    // }
  });
}

getUser();

// Form အသစ်ယူပြီး သိမ်းမယ်။
