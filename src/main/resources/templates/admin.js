// $(async function () {
//     await getTableWithUsers();
//     getNewUserForm();
//     getDefaultModal();
//     addNewUser();
// })
//
//
// const userFetchService = {
//     head: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Referer': null
//     },
//     // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
//     findAllUsers: async () => await fetch('http://localhost:8080/admin/getallusers'),
//     findOneUser: async (id) => await fetch(`http://localhost:8080/admin/getuser/${id}`),
//     addNewUser: async (user) => await fetch('http://localhost:8080/admin/saveuser', {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
//     updateUser: async (user, id) => await fetch(`http://localhost:8080/admin/updateuser/${id}`, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
//     deleteUser: async (id) => await fetch(`http://localhost:8080/admin/deleteuser/${id}`, {method: 'DELETE', headers: userFetchService.head})
// }
//
// async function getTableWithUsers() {
//     let table = $('#mainTableWithUsers tbody');
//     //table.empty();
//
//     await userFetchService.findAllUsers()
//         .then(res => res.json())
//         .then(users => {
//             users.forEach(user => {
//                 let tableFilling = `$(
//                         <tr>
//                             <td>${user.id}</td>
//                             <td>${user.username}</td>
//                             <td>${user.password.slice(0, 15)}...</td>
//                             <td>
//                                 <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-outline-secondary"
//                                 data-toggle="modal" data-target="#someDefaultModal"></button>
//                             </td>
//                             <td>
//                                 <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-outline-danger"
//                                 data-toggle="modal" data-target="#someDefaultModal"></button>
//                             </td>
//                         </tr>
//                 )`;
//                 table.append(tableFilling);
//             })
//         })
//
//     // ???????????????????????? ?????????????? ???? ?????????? ???? ???????????? edit ?????? delete
//     // ?????????????? ???? ?????? ???????????? ?? ???????????? ??????????????, ?????????????? ?? ???????? ???? ??????????????????
//     $("#mainTableWithUsers").find('button').on('click', (event) => {
//         let defaultModal = $('#someDefaultModal');
//
//         let targetButton = $(event.target);
//         let buttonUserId = targetButton.attr('data-userid');
//         let buttonAction = targetButton.attr('data-action');
//
//         defaultModal.attr('data-userid', buttonUserId);
//         defaultModal.attr('data-action', buttonAction);
//         defaultModal.modal('show');
//     })
// }
//
//
// async function getNewUserForm() {
//     let button = $(`#SliderNewUserForm`);
//     let form = $(`#defaultSomeForm`)
//     button.on('click', () => {
//         if (form.attr("data-hidden") === "true") {
//             form.attr('data-hidden', 'false');
//             form.show();
//             button.text('Hide panel');
//         } else {
//             form.attr('data-hidden', 'true');
//             form.hide();
//             button.text('Show panel');
//         }
//     })
// }
//
//
// // ?????? ???? ???????????? ?????? ???????????????? ?????????????? ?? ?????? ????????????????
// // ?????????????????????? ???? ???? ???????? ??????????????????
// async function getDefaultModal() {
//     $('#someDefaultModal').modal({
//         keyboard: true,
//         backdrop: "static",
//         show: false
//     }).on("show.bs.modal", (event) => {
//         let thisModal = $(event.target);
//         let userid = thisModal.attr('data-userid');
//         let action = thisModal.attr('data-action');
//         switch (action) {
//             case 'edit':
//                 editUser(thisModal, userid);
//                 break;
//             case 'delete':
//                 deleteUser(thisModal, userid);
//                 break;
//         }
//     }).on("hidden.bs.modal", (e) => {
//         let thisModal = $(e.target);
//         thisModal.find('.modal-title').html('');
//         thisModal.find('.modal-body').html('');
//         thisModal.find('.modal-footer').html('');
//     })
// }
//
//
// // ?????????????????????? ?????????? ???? ?????????????? ????????????????????????????, ???????????????? ????????????, ????????????????????
// async function editUser(modal, id) {
//     let preuser = await userFetchService.findOneUser(id);
//     let user = preuser.json();
//
//     modal.find('.modal-title').html('Edit user');
//
//     let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
//     let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
//     modal.find('.modal-footer').append(editButton);
//     modal.find('.modal-footer').append(closeButton);
//
//     user.then(user => {
//         let bodyForm = `
//             <form class="form-group" id="editUser">
//                 <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
//                 <input class="form-control" type="text" id="username" value="${user.username}"><br>
//                 <input class="form-control" type="password" id="password"><br>
//             </form>
//         `;
//         modal.find('.modal-body').append(bodyForm);
//     })
//
//     $("#editButton").on('click', async () => {
//         let id = modal.find("#id").val().trim();
//         let username = modal.find("#username").val().trim();
//         let password = modal.find("#password").val().trim();
//         let data = {
//             id: id,
//             username: username,
//             password: password,
//         }
//         const response = await userFetchService.updateUser(data, id);
//
//         if (response.ok) {
//             getTableWithUsers();
//             modal.modal('hide');
//         } else {
//             let body = await response.json();
//             let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
//                             ${body.info}
//                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>`;
//             modal.find('.modal-body').prepend(alert);
//         }
//     })
// }
//
//
// // ?????????????? ?????????? ???? ?????????????? ????????????????
// async function deleteUser(modal, id) {
//     await userFetchService.deleteUser(id);
//     getTableWithUsers();
//     modal.find('.modal-title').html('');
//     modal.find('.modal-body').html('User was deleted');
//     let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
//     modal.find('.modal-footer').append(closeButton);
// }
//
//
//
//
//
//
// async function addNewUser() {
//     $('#addNewUserButton').click(async () =>  {
//         let addUserForm = $('#defaultSomeForm')
//         let username = addUserForm.find('#AddNewUserUsername').val().trim();
//         let password = addUserForm.find('#AddNewUserPassword').val().trim();
//         let data = {
//             username: username,
//             password: password,
//         }
//         const response = await userFetchService.addNewUser(data);
//         if (response.ok) {
//             getTableWithUsers();
//             addUserForm.find('#AddNewUserUsername').val('');
//             addUserForm.find('#AddNewUserPassword').val('');
//         } else {
//             let body = await response.json();
//             let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
//                             ${body.info}
//                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>`;
//             addUserForm.prepend(alert)
//         }
//     })
// }