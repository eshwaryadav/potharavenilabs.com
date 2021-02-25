
//form-write
const first_name = document.getElementById("form-write").elements.namedItem("first")
const last_name = document.getElementById("form-write").elements.namedItem("last")
const mobile_number = document.getElementById("form-write").elements.namedItem("mobile")
const email = document.getElementById("form-write").elements.namedItem("email")
const add_btn = document.getElementById("form-write").elements.namedItem("submit")
const update_btn = document.getElementById("form-write").elements.namedItem("update")

///form-get
const id = document.getElementById("form-get").elements.namedItem("id")
const get_btn = document.getElementById("form-get").elements.namedItem("get")
const remove_btn = document.getElementById("form-get").elements.namedItem("remove")

///get all
const getAll_btn = document.getElementById("all-get")



// Get a reference to the database service
var database = firebase.database();

///add and update
add_btn.addEventListener('click',() =>{
    // e.preventDefault();
    if (first_name.value == ""||last_name.value == ""||mobile_number.value == ""||email.value == "") {
        alert("Enter all details");
        return false;
      }
    database.ref('/users/employees/'+mobile_number.value).set({
        firstname :first_name.value,
        lastname:last_name.value,
        mobilenumber:mobile_number.value,
        email:email.value
    })

})

var rootRef =database.ref("users/employees")
update_btn.addEventListener('click',(e) =>{
    // e.preventDefault();
    if (first_name.value == ""||last_name.value == ""||mobile_number.value == ""||email.value == "") {
        alert("Enter all details");
        return false;
      }
    
    rootRef.child(mobile_number.value).update({
        firstname :first_name.value,
        lastname:last_name.value,
        mobilenumber:mobile_number.value,
        email:email.value
    })

})


remove.addEventListener('click',() =>{
    // e.preventDefault();
    if (id.value == "") {
        alert("Enter employ ID");
        return false;
      }

    rootRef.child(id.value).remove()

})


///reading

get_btn.addEventListener('click',(e) =>{
    e.preventDefault();
    deleteRows()

    if (id.value == "") {
        alert("Enter employ ID");
        return false;
      }
    //   alert(id.value)

    var starCountRef = firebase.database().ref('users/employees/'+id.value);
starCountRef.on('value', (snapshot) => {
    var check =snapshot.val().mobilenumber
    if( check == undefined ){
        alert("No details available")
    }else{
        // alert(check)
        var x = document.getElementById("table-boot");
    
    var header = x.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0).innerHTML = "<b>S.No.</b>";
    var cell1 = row.insertCell(1).innerHTML = "<b>Employ ID</b>";
    var cell1 = row.insertCell(2).innerHTML = "<b>First Name</b>";
    var cell1 = row.insertCell(3).innerHTML = "<b>Last Name</b>";
    var cell1 = row.insertCell(4).innerHTML = "<b>Mobile No.</b>";
    var cell1 = row.insertCell(5).innerHTML = "<b>Email</b>";
    
  const f_n = snapshot.val().firstname;
  const s_n = snapshot.val().lastname;
  const m_n = snapshot.val().mobilenumber;
  const em = snapshot.val().email;
  
//   for(i=1;i<=snapLength;i++){
    var row = x.insertRow(1);
    var cell1 = row.insertCell(0).innerHTML = 1;
    var cell1 = row.insertCell(1).innerHTML = m_n;
    var cell1 = row.insertCell(2).innerHTML = f_n;
    var cell1 = row.insertCell(3).innerHTML = s_n;
    var cell1 = row.insertCell(4).innerHTML = m_n;
    var cell1 = row.insertCell(5).innerHTML = em;
//   }
    }
});
    
    
})

///reading all employees

getAll_btn.addEventListener('click',(e) =>{
    // e.preventDefault();
    deleteRows()

    var starCountRef = firebase.database().ref('users/employees');
starCountRef.on('value', (snapshot) => {
    var i=1
    var check =snapshot.val()
    if( check == undefined ){
        alert("No details available")
    }else{
        // alert(check)
    var x = document.getElementById("table-boot");
    

    var header = x.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0).innerHTML = "<b>S.No.</b>";
    var cell1 = row.insertCell(1).innerHTML = "<b>Employ ID</b>";
    var cell1 = row.insertCell(2).innerHTML = "<b>First Name</b>";
    var cell1 = row.insertCell(3).innerHTML = "<b>Last Name</b>";
    var cell1 = row.insertCell(4).innerHTML = "<b>Mobile No.</b>";
    var cell1 = row.insertCell(5).innerHTML = "<b>Email</b>";
    snapshot.forEach((childSnapshot) =>{
       
  const f_n = childSnapshot.val().firstname;
  const s_n = childSnapshot.val().lastname;
  const m_n = childSnapshot.val().mobilenumber;
  const em = childSnapshot.val().email;
  const snapLength = parseInt(snapshot.numChildren())
  
//   for(i=1;i<=snapLength;i++){
    var row = x.insertRow(i);
    var cell1 = row.insertCell(0).innerHTML = i;
    var cell1 = row.insertCell(1).innerHTML = m_n;
    var cell1 = row.insertCell(2).innerHTML = f_n;
    var cell1 = row.insertCell(3).innerHTML = s_n;
    var cell1 = row.insertCell(4).innerHTML = m_n;
    var cell1 = row.insertCell(5).innerHTML = em;
//   }
        i++
});
  ////
}
});


})


function deleteRows(){
    var x = document.getElementById("table-boot");
    var len = x.rows.length
    for(var j=0;j<len;j++){
         x.deleteRow(0)
    }
}


  