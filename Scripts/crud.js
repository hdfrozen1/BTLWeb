// crud.js

let data = JSON.parse(localStorage.getItem("xe")) || [];
let selectedId = null;

// Render dữ liệu ra bảng
export function renderTable() {
  const tbody = document.querySelector("#tableBody");
  tbody.innerHTML = "";
  data.forEach(x => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${x.id}</td>
      <td>${x.tenChuXe}</td>
      <td>${x.diaChi}</td>
      <td>${x.soCMND}</td>
      <td>${x.bienSo}</td>
    `;
    row.addEventListener("click", () => selectRow(x.id));
    tbody.appendChild(row);
  });
}

// Thêm mới
export function themXe(ten, diachi, cmnd, bienso) {
  if (!ten || !diachi || !cmnd || !bienso) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  const id = data.length ? Math.max(...data.map(x => x.id)) + 1 : 1;
  data.push({ id, tenChuXe: ten, diaChi: diachi, soCMND: cmnd, bienSo: bienso });
  saveData();
  renderTable();
  clearForm();
}

// Sửa thông tin xe
export function suaXe(ten, diachi, cmnd, bienso) {
  if (!selectedId) return alert("Chưa chọn xe để sửa!");
  const i = data.findIndex(x => x.id === selectedId);
  if (i === -1) return;

  data[i] = { id: selectedId, tenChuXe: ten, diaChi: diachi, soCMND: cmnd, bienSo: bienso };
  saveData();
  renderTable();
  clearForm();
}

// Xóa xe
export function xoaXe() {
  if (!selectedId) return alert("Chưa chọn xe để xóa!");
  if (!confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) return;

  data = data.filter(x => x.id !== selectedId);
  saveData();
  renderTable();
  clearForm();
}

// Chọn dòng để chỉnh sửa
function selectRow(id) {
  selectedId = id;
  const xe = data.find(x => x.id === id);
  if (!xe) return;
  document.getElementById("ten").value = xe.tenChuXe;
  document.getElementById("diachi").value = xe.diaChi;
  document.getElementById("cmnd").value = xe.soCMND;
  document.getElementById("bienso").value = xe.bienSo;
}

// Lưu vào localStorage
function saveData() {
  localStorage.setItem("xe", JSON.stringify(data));
}

// Xóa form
function clearForm() {
  document.getElementById("ten").value = "";
  document.getElementById("diachi").value = "";
  document.getElementById("cmnd").value = "";
  document.getElementById("bienso").value = "";
  selectedId = null;
}

// Dành cho file khác cần truy cập
export function getData() {
  return data;
}
