import { auth, db } from "./../firebase";
import {
  addFavMail,
  initializeFavMail,
  initializeSendMail,
} from "./../redux/userSlice";

// add mail to FAV list
export const addToFavList = (item, dispatch, mailList, e) => {
  // mailList.favMails.map(el => el===item)
  e.stopPropagation();
  db.collection("users")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var id = doc.id;
        var data = doc.data();
        var c = 0;
        if (data?.uid === auth?.currentUser?.uid) {
          data?.favMails?.map((mail) => {
            if (mail?.uuid === item?.uuid) {
              c += 1;
              alert("Already added to favMails");
              return "already fav";
            }
          });
          if (c === 0) {
            db.collection("users")
              .doc(id)
              .update({
                favMails: [item, ...data.favMails],
              });
            dispatch(
              addFavMail({
                mail: item,
              })
            );
          }
        }
      });
    });
};

// remove mail from fav list
export const removeToFavList = (item, dispatch, mailList, e) => {
  e.stopPropagation();
  db.collection("users")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var id = doc.id;
        var data = doc.data();
        if (data?.uid === auth?.currentUser?.uid) {
          const newfavList = data.favMails.filter(
            (mail) => mail.uuid !== item.uuid
          );
          console.log(newfavList);
          db.collection("users").doc(id).update({
            favMails: newfavList,
          });
          dispatch(
            initializeFavMail({
              items: newfavList,
            })
          );
        }
      });
    });
};

// delete mail from inbox
export const deleteMail = (itemUuid, dispatch, mailList, e, history) => {
  history.push("/");
  e.stopPropagation();
  db.collection("users")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var id = doc.id;
        var data = doc.data();
        if (data?.uid === auth?.currentUser?.uid) {
          const newSendMailList = data.sendMails.filter(
            (mail) => mail.uuid !== itemUuid
          );
          const newFavMailList = data.favMails?.filter(
            (mail) => mail.uuid !== itemUuid
          );
          // remove from send mail
          db.collection("users").doc(id).update({
            sendMails: newSendMailList,
          });
          dispatch(
            initializeSendMail({
              items: newSendMailList,
            })
          );
          // remove from fav mail it deleted mail is added to fav
          db.collection("users").doc(id).update({
            favMails: newFavMailList,
          });
          dispatch(
            initializeFavMail({
              items: newFavMailList,
            })
          );
        }
      });
    });
};

// show time of creating of mail
export const createdAt = (date) => {
  const nowDate = new Date().toLocaleDateString();

  const dateArr = date?.split(",");
  if (dateArr && nowDate === dateArr[0]) {
    return dateArr[1];
  } else {
    return nowDate;
  }
};
