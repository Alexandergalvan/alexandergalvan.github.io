document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const acceptTermsCheckbox = document.getElementById('accept-terms');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const termsError = document.getElementById('terms-error');
    const termsLink = document.getElementById('terms-link');
    const termsLinkFooter = document.getElementById('terms-link-footer');
    const termsPopup = document.getElementById('terms-popup');
    const closeTerms = document.getElementById('close-terms');
    const toastContainer = document.getElementById('toast-container');
    
    // Generar valor magic aleatorio al cargar la página
    const generateMagicValue = () => {
        return Math.floor(Math.random() * 9000000000) + 1000000000; // Número de 10 dígitos
    };
    
    // Establecer valor magic
    document.getElementById('magic').value = generateMagicValue();
    
    // Sistema de notificaciones toast
    const showToast = (message, type = 'info', duration = 5000) => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Manejar cierre del toast
        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', () => {
            removeToast(toast);
        });
        
        // Auto-cerrar después de la duración especificada
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    };
    
    const removeToast = (toast) => {
        toast.classList.add('slide-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    };
    
    // Validación del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reiniciar errores
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        termsError.style.display = 'none';
        
        // Validar nombre de usuario
        if (!usernameInput.value.trim()) {
            usernameError.style.display = 'block';
            usernameError.textContent = 'Por favor ingresa tu nombre de usuario';
            isValid = false;
            showToast('Por favor ingresa tu nombre de usuario', 'error');
        }
        
        // Validar contraseña
        if (!passwordInput.value) {
            passwordError.style.display = 'block';
            passwordError.textContent = 'Por favor ingresa tu contraseña';
            isValid = false;
            showToast('Por favor ingresa tu contraseña', 'error');
        } else if (passwordInput.value.length < 6) {
            passwordError.style.display = 'block';
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
            isValid = false;
            showToast('La contraseña debe tener al menos 6 caracteres', 'error');
        }
        
        // Validar aceptación de términos
        if (!acceptTermsCheckbox.checked) {
            termsError.style.display = 'block';
            termsError.textContent = 'Debes aceptar los términos para continuar';
            isValid = false;
            showToast('Debes aceptar los términos y condiciones para continuar', 'warning');
        }
        
        // Si todo es válido, enviar el formulario
        if (isValid) {
            showToast('Conectando a la red WiFi...', 'info');
            setTimeout(() => {
                loginForm.submit();
            }, 1000);
        }
    });
    
    // Mostrar popup de términos
    const showTermsPopup = (e) => {
        e.preventDefault();
        termsPopup.classList.add('active');
    };
    
    termsLink.addEventListener('click', showTermsPopup);
    termsLinkFooter.addEventListener('click', showTermsPopup);
    
    // Cerrar popup de términos
    closeTerms.addEventListener('click', function() {
        termsPopup.classList.remove('active');
        // Opcionalmente, marcar el checkbox de términos como seleccionado
        acceptTermsCheckbox.checked = true;
    });
    
    // Cerrar popup de términos al hacer clic fuera
    termsPopup.addEventListener('click', function(e) {
        if (e.target === termsPopup) {
            termsPopup.classList.remove('active');
        }
    });
    
    // Eventos de enfoque y desenfoque para los campos de entrada
    usernameInput.addEventListener('focus', () => {
        usernameError.style.display = 'none';
    });
    
    passwordInput.addEventListener('focus', () => {
        passwordError.style.display = 'none';
    });
    
    // Validación de aceptación de términos al cambiar el checkbox
    acceptTermsCheckbox.addEventListener('change', () => {
        if (acceptTermsCheckbox.checked) {
            termsError.style.display = 'none';
        }
    });
    
    // Mostrar toast de bienvenida al cargar la página
    setTimeout(() => {
        showToast('Bienvenido al portal WiFi de la UAT', 'info');
    }, 500);
});