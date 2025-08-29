// Variable global para controlar la animación del círculo
let isFirstLoad = true;

// Función para la animación del círculo de revelación
function revealPage() {
    const body = document.body;
    body.classList.add('revealed');
}

// Función para la animación de las palabras del héroe
function animateHeroText() {
    const heroWords = document.querySelectorAll('.hero-right h1 .word');
    heroWords.forEach((word, index) => {
        // Retraso para que las palabras aparezcan una por una
        word.style.animationDelay = `${index * 0.1}s`;
        word.classList.add('animated');
    });
}

// Llama a las funciones al cargar la página si es la primera vez
window.addEventListener('load', () => {
    if (isFirstLoad) {
        document.body.style.overflow = 'hidden';
        revealPage();
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            animateHeroText();
            isFirstLoad = false;
        }, 1000);
    } else {
        animateHeroText();
    }
});

// Evento para el modo oscuro
const darkModeToggle = document.getElementById('darkModeCheckbox');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode', darkModeToggle.checked);
});

// -------------------------------------------------------------------

// Mantenemos la lógica de la galería y los modales dentro de DOMContentLoaded
// para asegurarnos de que todos los elementos HTML ya existen.
document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidad del Modal del CV ---
    const cvButton = document.getElementById('openCvModalBtn');
    const cvModal = document.getElementById('cvModal');
    const cvCloseButton = document.querySelector('.cv-modal-content .cv-close-button');

    cvButton.addEventListener('click', () => {
        cvModal.style.display = 'flex';
    });

    cvCloseButton.addEventListener('click', () => {
        cvModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cvModal) {
            cvModal.style.display = 'none';
        }
    });

    // --- Funcionalidad del Modal de la Galería de Fotos ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const modalCaption = document.getElementById('caption');
    const galleryItems = document.querySelectorAll('.photo-item img');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Ahora, el evento se asigna a cada imagen de la galería
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = item.dataset.fullImage;
            modalCaption.innerHTML = item.alt;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cierra el modal si se hace clic fuera de la imagen
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- Funcionalidad del Modal de Proyectos de Branding ---
    const brandingModal = document.getElementById('brandingModal');
    const brandingImages = document.querySelectorAll('.branding-card');
    const brandingModalImg = document.getElementById('brandingImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const closeBrandingBtn = brandingModal.querySelector('.close-button');

    const projectImages = {
        project1: ["branding/project1/1.jpg", "branding/project1/2.jpg", "branding/project1/3.jpg"],
        project2: ["branding/project2/1.jpg", "branding/project2/2.jpg", "branding/project2/3.jpg"],
        project3: ["branding/project3/1.jpg", "branding/project3/2.jpg", "branding/project3/3.jpg"]
    };

    let currentProject = null;
    let currentImageIndex = 0;

    function openBrandingModal(projectName) {
        currentProject = projectImages[projectName];
        currentImageIndex = 0;
        updateBrandingImage();
        brandingModal.style.display = 'flex';
    }

    function updateBrandingImage() {
        if (currentProject) {
            brandingModalImg.src = currentProject[currentImageIndex];
        }
    }

    function showNextImage() {
        if (currentProject) {
            currentImageIndex = (currentImageIndex + 1) % currentProject.length;
            updateBrandingImage();
        }
    }

    function showPrevImage() {
        if (currentProject) {
            currentImageIndex = (currentImageIndex - 1 + currentProject.length) % currentProject.length;
            updateBrandingImage();
        }
    }

    brandingImages.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const projectName = card.getAttribute('data-project');
            openBrandingModal(projectName);
        });
    });

    closeBrandingBtn.addEventListener('click', () => {
        brandingModal.style.display = 'none';
    });

    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Cierra el modal de branding si se hace clic fuera del carrusel
    window.addEventListener('click', (event) => {
        if (event.target === brandingModal) {
            brandingModal.style.display = 'none';
        }
    });
});