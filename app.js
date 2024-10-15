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

// နေရာလွတ်သက်မှတ် ==> ဝင်တာအောင်မြင် မမြင်နဲ့ ဘယ်သူဝင်လည်း
let loginState = {
  isLogin: false,
  loginUser: null,
};

function saveLocal(items, itemName) {
  localStorage.setItem(itemName, JSON.stringify(items));
}

function getLocal(itemName) {
  let data = localStorage.getItem(itemName); // Json type
  return JSON.parse(data); // JSON type ကိုယ်ထည့်လိုက်တဲ့ type ကိုပြန်ပြောင်း
}

// function updateUsers(jsonUsers, localUsers) {
//   let combined = [...new Set([...jsonUsers, ...localUsers])];
//   return combined;
// }

// console.log("===>", updateUsers(["a", "b", "c"], [1, 2, 3, 4]));

// Merge the arrays and remove duplicates based on userID
function removeDuplicatesByEmail(arr1, arr2, email) {
  const mergedArray = [...arr1, ...arr2];
  // [1,2,3,1,2,3,4]

  // Create a Map to store unique objects by the specified email
  const uniqueUsers = new Map(mergedArray.map((item) => [item[email], item]));

  // Convert the Map values back to an array
  return Array.from(uniqueUsers.values());
}

async function getUser() {
  // ပထမ json server accounts ယူတယ်။
  let users = await getData("users.json"); //[0,1,2,4,5, hlahal]
  console.log(users);

  // ဒုတိယ local accounts ယူတယ်။
  let localUsers = getLocal("users"); // [0,1,2,3,4]
  console.log(users);

  users = removeDuplicatesByEmail(users, localUsers, "email");

  // local အကောင့်တွေ သာ ရှိခဲ့လို့ရှိရင်တော့
  // if (localUsers) {
  //   // မတူညီ user တွေ ကိုသိမ်းလိုက်မယ် diffUsers
  //   // filter( xxx ) xxx function ထဲက အခြေအနေတွေနဲ့ တူတဲ့ trueဖြစ်တာတွေ ဟာကို ပြန်ထုတ်ပေးတယ်။
  //   let diffUsers = localUsers.filter((localUser) => {
  //     // some method က ဘာလုပ်ပေးလည်းဆိုရင် ( xxx ) စစ်လိုက်တဲ့ အရာက မှန်ရင် true မှားရင် false
  //     return !users.some(
  //       // ! not true
  //       (user) => localUser.email === user.email // ture ==> flase , false ==> true
  //     );
  //   });

  //   users.push(...diffUsers);

  //   console.log(users);
  // }

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
    loginForm.trigger("reset");
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
      loginState.isLogin = true;
      loginState.loginUser = loginEmail;
      saveLocal(loginState, "loginState");
      console.log(loginState);
    } else {
      console.log("အကောင့် ဝင်တာ မအောင်မြင်ပါ။ ");
    }

    // for (let i = 0; i < users.length; i++) {
    //   console.log(users[i]);
    // }
  });
}

loginState = JSON.parse(localStorage.getItem("loginState"));

getUser();

// Form အသစ်ယူပြီး သိမ်းမယ်။
