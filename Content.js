const ZIP = [
  "01025-020",
  "01015-100",
  "01026-010",
  "01030-020",
  "01007-030",
  "01028-030",
  "01030-010",
  "01049-030",
  "01022-000",
  "01049-020",
  "01012-020",
  "01012-030",
  "01034-010",
  "01007-070",
  "01029-010",
  "01501-050",
  "01007-040",
  "01031-005",
  "01007-050",
  "01007-080",
  "01033-040",
  "01010-010",
  "01501-040",
  "01007-020",
  "01050-050",
  "01031-030",
  "01015-020",
  "01015-010",
  "01032-030",
  "01022-040",
  "01034-030",
  "01501-030",
  "01050-070",
  "01027-020",
  "01025-010",
  "01033-020",
  "01032-020",
  "01034-020",
  "01022-020",
  "01023-050",
  "01023-040",
  "01022-070",
  "01501-060",
  "01033-030",
  "01012-010",
  "01013-010",
  "01034-040",
  "01013-020",
  "01031-010",
  "01007-010",
  "01022-060",
  "01031-020",
  "01008-010",
  "01501-010",
  "01015-080",
  "01049-000",
  "01015-000",
  "01015-060",
  "01023-020",
  "01016-010",
  "01050-020",
  "01014-010",
  "01022-030",
  "01023-060",
  "01015-050",
  "01050-030",
  "01015-040",
  "01050-000",
  "01028-000",
  "01023-010",
  "01027-010",
  "01049-010",
  "01032-010",
  "01016-020",
  "01015-030",
  "01023-030",
  "01014-020",
  "01022-010",
  "01016-000",
  "01023-070",
  "01033-010",
  "01014-030",
  "01015-090",
  "01002-020",
  "01501-020",
  "01007-060",
  "01050-060",
  "01033-050",
  "01028-010",
  "01028-020",
  "01027-040",
  "01027-030",
  "01027-050",
];
document.addEventListener("DOMContentLoaded", function () {
  try {
    faker.locale = "pt_BR";

    const inputName = document.querySelector('[data-input="name"]');
    const inputCpf = document.querySelector('[data-input="cpf"]');
    const inputMail = document.querySelector('[data-input="mail"]');
    const inputPhone = document.querySelector('[data-input="phone"]');
    const inputCompany = document.querySelector('[data-input="company"]');
    const inputZipcode = document.querySelector('[data-input="zipcode"]');
    const inputObs = document.querySelector('[data-input="obs"]');

    const buttons = [
      {
        node: document.querySelector('[data-button="name"]'),
        input: inputName,
      },
      {
        node: document.querySelector('[data-button="cpf"]'),
        input: inputCpf,
      },
      {
        node: document.querySelector('[data-button="mail"]'),
        input: inputMail,
      },
      {
        node: document.querySelector('[data-button="phone"]'),
        input: inputPhone,
      },
      {
        node: document.querySelector('[data-button="company"]'),
        input: inputCompany,
      },
      {
        node: document.querySelector('[data-button="zipcode"]'),
        input: inputZipcode,
      },
    ];

    for (const key in buttons) {
      if (Object.hasOwnProperty.call(buttons, key)) {
        const element = buttons[key];
        element.node.addEventListener("click", function () {
          copyToClipboard(element.input);
        });
      }
    }

    function copyToClipboard(input) {
      input.select();
      input.setSelectionRange(0, 99999); /* For mobile devices */

      navigator.clipboard.writeText(input.value);
    }

    function changeButtonSave(disabled = false) {
      const buttonSave = document.querySelector("[data-btn-save]");

      if (disabled) {
        buttonSave.classList.add("btn-secondary");
        buttonSave.classList.remove("btn-success");
        buttonSave.attributes.disabled = true;
        buttonSave.innerHTML = "Salvo!";
        return;
      }

      buttonSave.classList.remove("btn-secondary");
      buttonSave.classList.add("btn-success");
      buttonSave.attributes.disabled = true;
      buttonSave.innerHTML = "Salvar massa";
    }

    function random() {
      const name = faker.name.findName();
      const mail =
        slugify(name.toLowerCase().replace(/ /g, "")) + "@yopmail.com";
      const phone = faker.phone.phoneNumber("(11) 9####-####");
      const company = faker.company.companyName();

      let randomZipIndex = Math.floor(Math.random() * (ZIP.length - 1) + 1);
      if (!ZIP[randomZipIndex]) {
        randomZipIndex -= 1;
      }

      const zipCode = ZIP[randomZipIndex];

      inputName.value = name;
      inputCpf.value = gerarCpf();
      inputMail.value = mail;
      inputPhone.value = phone;
      inputCompany.value = company;
      inputZipcode.value = zipCode;

      localStorage.setItem(
        "datafake",
        JSON.stringify({
          name: inputName.value,
          cpf: inputCpf.value,
          mail: inputMail.value,
          phone: inputPhone.value,
          company: inputCompany.value,
          zipcode: inputZipcode.value,
        })
      );

      changeButtonSave(false);
    }

    function save() {
      const newItem = {
        name: inputName.value,
        cpf: inputCpf.value,
        mail: inputMail.value,
        phone: inputPhone.value,
        company: inputCompany.value,
        zipcode: inputZipcode.value,
        obs: inputObs.value,
      };

      let list = localStorage.getItem("datafake-list");

      if (!list) {
        list = "[]";
      }

      let listCompleate = JSON.parse(list);

      listCompleate = listCompleate.filter((item) => item.cpf !== newItem.cpf);

      listCompleate.push(newItem);

      localStorage.setItem("datafake-list", JSON.stringify(listCompleate));

      changeButtonSave(true);
    }

    function getFromCache() {
      const data = localStorage.getItem("datafake");
      if (!data) {
        return;
      }

      const value = JSON.parse(data);

      inputName.value = value.name;
      inputCpf.value = value.cpf;
      inputMail.value = value.mail;
      inputPhone.value = value.phone;
      inputCompany.value = value.company;
      inputZipcode.value = value.zipcode;
    }

    document
      .querySelector("[data-btn-generate]")
      .addEventListener("click", random);

    document.querySelector("[data-btn-save]").addEventListener("click", save);

    getFromCache();
  } catch (error) {
    console.log("error::::", error);

    const div = document.createElement("div");
    div.innerText = error;
    document.append(div);
  }
});

function slugify(text) {
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";

  const newText = text
    .split("")
    .map((letter, i) =>
      letter.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
    );

  return newText
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-y-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function gerarCpf() {
  const num1 = aleatorio();
  const num2 = aleatorio();
  const num3 = aleatorio();

  const dig1 = dig(num1, num2, num3);
  const dig2 = dig(num1, num2, num3, dig1);

  return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
}

function dig(n1, n2, n3, n4) {
  const nums = n1.split("").concat(n2.split(""), n3.split(""));

  if (n4 !== undefined) {
    nums[9] = n4;
  }

  let x = 0;

  for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
    x += parseInt(nums[j]) * i;
  }

  const y = x % 11;

  return y < 2 ? 0 : 11 - y;
}

function aleatorio() {
  const aleat = Math.floor(Math.random() * 999);

  return ("" + aleat).padStart(3, "0");
}
