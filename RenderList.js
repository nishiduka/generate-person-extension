document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("[data-load-rows]");

  let list = localStorage.getItem("datafake-list");

  if (!list) {
    list = "[]";
  }

  let listCompleate = JSON.parse(list);
  for (let index = 0; index < listCompleate.length; index++) {
    const element = listCompleate[index];

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${element.obs}</td>
        <td scope="row">${element.cpf}</td>
        <td>${element.name}</td>
        <td>${element.mail}</td>
        <td>${element.phone}</td>
        <td>${element.company}</td>
        <td>${element.zipcode}</td>
        <td><button class="btn btn-danger" data-remove data-index="${index}">remover</button></td>
    `;

    tr.querySelector("[data-remove]").addEventListener("click", function () {
      const attr = this.attributes["data-index"].nodeValue;
      const position = attr.replace("data-index=", "").replace(/"/g, "");

      listCompleate.splice(parseInt(position), 1);
      localStorage.setItem("datafake-list", JSON.stringify(listCompleate));

      document.location.reload(true);
    });

    table.append(tr);
  }
});
