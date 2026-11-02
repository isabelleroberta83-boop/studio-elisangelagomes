const modal = document.getElementById("contact");
const topics = {
  agenda: [
    "Agende seu horário",
    "Entre em contato para consultar horários e combinar o atendimento.",
  ],
  limpeza: [
    "Limpeza de pele",
    "Fale com a Elisângela para conhecer a limpeza de pele e a disponibilidade.",
  ],
  facial: [
    "Tratamento facial",
    "Converse para conhecer os tratamentos faciais e agendar uma avaliação.",
  ],
  estrias: [
    "Estrias",
    "Solicite informações sobre o tratamento de estrias e os próximos passos.",
  ],
  lobuloplastia: [
    "Lobuloplastia",
    "Entre em contato para conhecer a lobuloplastia e consultar a agenda.",
  ],
};

document.querySelectorAll("[data-topic]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.topic;
    const url = window.clinica[key];
    if (url && /^https:\/\//.test(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    document.getElementById("modal-title").textContent = topics[key][0];
    document.getElementById("modal-text").textContent = topics[key][1];
    modal.showModal();
  });
});

modal.querySelector(".close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target !== modal) return;
  const rect = modal.getBoundingClientRect();
  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (outside) modal.close();
});

document.getElementById("year").textContent = new Date().getFullYear();

const photo = document.querySelector(".portrait-photo");
if (photo) {
  const usePlaceholder = () => {
    photo.remove();
    document.querySelector(".portrait").classList.add("is-placeholder");
  };
  const markReady = () => photo.classList.add("is-ready");
  if (photo.complete && photo.naturalWidth > 0) markReady();
  else if (photo.complete) usePlaceholder();
  photo.addEventListener("load", markReady);
  photo.addEventListener("error", usePlaceholder);
}
