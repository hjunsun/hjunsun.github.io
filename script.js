document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let isDragging = false;
    let rotationSpeed = 0;
    let rotation = 0;
    const image = document.getElementById('currentImage');
    const friction = 0.97;

    // Navbar smooth scrolling
    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    document.querySelector('.menu-icon').addEventListener('click', function() {
        var navItems = document.querySelectorAll('nav li');
        for (var i = 1; i < navItems.length; i++) {  
            if (navItems[i].style.display === 'block') {
                navItems[i].style.display = 'none';
            } else {
                navItems[i].style.display = 'block';
            }
        }
    });

    // Image rotation
    const imageContainer = document.querySelector('.profile-container'); 
    imageContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const mouseMove = e.movementX;
            rotationSpeed += mouseMove * 0.5;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    image.addEventListener('click', function() {
        rotationSpeed = 0;
        rotation = 0;
        image.style.transition = 'transform 0.5s ease-out';
        image.style.transform = 'rotate(' + rotation + 'deg)';
        setTimeout(() => {
            image.style.transition = '';
        }, 1000);
    });
    
    function animate() {
        rotation += rotationSpeed;
        rotationSpeed *= friction;
        image.style.transform = 'rotate(' + rotation + 'deg)';
        requestAnimationFrame(animate);
    }
    animate();

    // Project details toggle
    const toggleIcons = document.querySelectorAll('.toggle-icon');
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const detail = this.nextElementSibling.nextElementSibling;
            detail.classList.toggle('open');
            this.classList.toggle('fa-chevron-down');
            this.classList.toggle('fa-chevron-up');
        });
    });

    // Image link popup
    const imageLinks = document.querySelectorAll('.image-link');
    imageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(link.href, 'ImagePopup', 'width=600,height=600');
        });
    });

    function disappearImage() {
        const image = document.getElementById('currentImage');
        let opacity = 1;
    
        function fadeOut() {
            opacity -= 0.01;
            image.style.opacity = opacity;
    
            if (opacity > 0) {
                setTimeout(() => {
                    requestAnimationFrame(fadeOut);
                }, 50);
            } else {
                image.style.display = 'none';
            }
        }
    
        fadeOut();
    }
    
    function changeImageWithFade(newImagePath) {
        const currentImage = document.getElementById('currentImage');
        const nextImage = document.getElementById('nextImage');
        
        nextImage.src = newImagePath;
        
        currentImage.classList.add('hidden');
        nextImage.classList.remove('hidden');
        
        setTimeout(() => {
            currentImage.src = newImagePath;
            currentImage.classList.remove('hidden');
            nextImage.classList.add('hidden');
        }, 1000);
    } 

    let lastCommand = "";
    
    // Command input
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        commandInput.addEventListener('keydown', function(e) {
            console.log('Key down event detected:', e.key);
            if (e.key === 'Enter') {
                const command = e.target.value.trim();
                const [action, value] = command.split(' ');

                switch(action) {
                    case 'rotate':
                        rotationSpeed = parseFloat(value);
                        break;
                    case 'stop':
                        rotationSpeed = 0;
                        break;
                    case 'disappear':
                        disappearImage();
                        break;
                    case 'gogo':
                        changeImageWithFade('images/cat.jpg');
                        break;
                    case 'yellow':
                        changeImageWithFade('images/profile_yellow.jpg');
                        break;
                    case 'gray':
                        changeImageWithFade('images/profile_gray.jpg');
                        break;
                    case 'pink':
                        changeImageWithFade('images/profile_pink.jpg');
                        break;
                    case 'smile':
                        changeImageWithFade('images/profile_smile.jpg');
                        break;
                    case 'selfie':
                        changeImageWithFade('images/profile_selfie.jpg');
                        break;
                    default:
                        console.log('Unknown command');
                }

                e.target.value = '';
            } else if (e.key === 'ArrowUp') {
                e.target.value = lastCommand;
            }
        });
    } else {
        console.error("Element with id 'command-input' not found");
    }
});
