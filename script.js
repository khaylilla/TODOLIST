const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Fungsi untuk menampilkan konfirmasi sebelum menghapus tugas
function confirmDelete(li) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
        li.remove();
        alert("Tugas berhasil dihapus!");
        saveData();
    }
}


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);


// Fungsi untuk menambahkan tugas baru
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Anda harus menulis sesuatu!");
        return;
    }

    let li = document.createElement("li");

    // Ikon untuk menambahkan file
    let attachIcon = document.createElement("img");
    attachIcon.src = "attach.png";
    attachIcon.classList.add("image-preview");
    attachIcon.onclick = function () { openFileSelector(li, attachIcon); };

    // Elemen teks untuk tugas
    let textSpan = document.createElement("span");
    textSpan.textContent = inputBox.value;
    textSpan.classList.add("text-container");

    // Ikon edit tugas
    let editIcon = document.createElement("img");
    editIcon.src = "edit.png";
    editIcon.classList.add("icon");
    editIcon.onclick = function () { editTask(textSpan); };

    // Ikon hapus tugas
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "hapus.png";
    deleteIcon.classList.add("icon");
    deleteIcon.onclick = function () { confirmDelete(li); };

    // Menampung ikon edit dan hapus
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(editIcon);
    buttonContainer.appendChild(deleteIcon);

    // Menyusun elemen tugas
    li.appendChild(attachIcon); 
    li.appendChild(textSpan);   
    li.appendChild(buttonContainer); 

    // Menambahkan ke daftar tugas
    listContainer.appendChild(li);
    inputBox.value = "";

    alert("Tugas berhasil ditambahkan!");
    saveData();
}

// Fungsi untuk mengedit tugas
function editTask(textSpan) {
    let newValue = prompt("Edit Tugas:", textSpan.textContent);
    if (newValue) {
        textSpan.textContent = newValue;
        alert("Tugas berhasil diedit!");
        saveData();
    }
}

// Fungsi untuk notifikasi berhasil menambahkan file
function fileAddedNotification() {
    alert("File berhasil ditambahkan!");
}

// Fungsi untuk membuka pemilih file
function openFileSelector(li, attachIcon) {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png, image/jpeg";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", function () {
        attachImage(li, attachIcon, fileInput);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Fungsi untuk menampilkan gambar yang diunggah ke tugas
function attachImage(li, attachIcon, fileInput) {
    let file = fileInput.files[0];
    if (file) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.classList.add("image-preview");
        img.onclick = function () { openFileSelector(li, img); }; 
        li.replaceChild(img, attachIcon); 
        fileAddedNotification();
    }
}


