// search.js
import { getData, renderTable } from "./crud.js";

// Tìm theo tên
export function timTheoTen(keyword) {
  const list = getData().filter(x => x.tenChuXe.toLowerCase().includes(keyword.toLowerCase()));
  renderSearchResult(list);
}

// Tìm theo biển số
export function timTheoBienSo(keyword) {
  const list = getData().filter(x => x.bienSo.toLowerCase().includes(keyword.toLowerCase()));
  renderSearchResult(list);
}

// Tìm theo quê quán (dựa trên địa chỉ)
export function timTheoQueQuan(keyword) {
  const list = getData().filter(x => x.diaChi.toLowerCase().includes(keyword.toLowerCase()));
  renderSearchResult(list);
}

// Hàm hiển thị kết quả tìm kiếm ra bảng
function renderSearchResult(list) {
  const tbody = document.querySelector("#tableBody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Không tìm thấy kết quả</td></tr>`;
    return;
  }

  list.forEach(x => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${x.id}</td>
      <td>${x.tenChuXe}</td>
      <td>${x.diaChi}</td>
      <td>${x.soCMND}</td>
      <td>${x.bienSo}</td>
    `;
    tbody.appendChild(row);
  });
}
