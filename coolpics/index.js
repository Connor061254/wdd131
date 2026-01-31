const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const closeBtn = document.querySelector(".close");
const galleryImages = document.querySelectorAll(".gallery-img");

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('show-modal');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
});

function closeModal() {
    modal.classList.remove('show-modal');
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && modal.classList.contains('show-modal')) {
        closeModal();
    }
});