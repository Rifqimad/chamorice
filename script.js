// CHAMORICE Interactivity Logic
document.addEventListener('DOMContentLoaded', () => {

    // 1. Authenticity Code Checker (Module 5)
    const verifyForm = document.getElementById('verifyForm');
    const authResult = document.getElementById('authResult');

    const validCodes = ['CR24A05-00123', 'CR24A05-00124', 'CHAMORICE2026'];

    if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputVal = document.getElementById('code').value.trim();
            
            if (validCodes.includes(inputVal)) {
                authResult.className = 'auth-result-card success';
                authResult.innerHTML = `
                    <div style="font-size: 20px;">✓</div>
                    <div>
                        <strong>Produk Asli Terverifikasi</strong><br>
                        Terima kasih! Produk CHAMORICE ini asli dan terdaftar resmi di laboratorium.
                    </div>
                `;
            } else {
                authResult.className = 'auth-result-card error';
                authResult.innerHTML = `
                    <div style="font-size: 20px;">✕</div>
                    <div>
                        <strong>Kode Tidak Ditemukan</strong><br>
                        Mohon periksa kembali kode di label produk Anda atau hubungi customer service.
                    </div>
                `;
            }
        });
    }

    // 2. Tab Category Selector (Module 2)
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // 3. Cart Modal Mockup
    const cartItemsData = [
        { name: 'Chamomile Liquid Soap', img: 'images/card-liquid-soap.jpg', qty: 1, price: 29000 },
        { name: 'Family Care', img: 'images/card-liquid-soap.jpg', qty: 1, price: 68000 }
    ];

    function formatRupiah(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
    }

    let modalOverlay = document.getElementById('appModalOverlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'appModalOverlay';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = '<div class="modal-box" id="appModalBox"></div>';
        document.body.appendChild(modalOverlay);
    }
    const modalBox = document.getElementById('appModalBox');

    function openModal() { modalOverlay.classList.add('open'); }
    function closeModal() { modalOverlay.classList.remove('open'); }

    function renderCartView() {
        const total = cartItemsData.reduce((sum, item) => sum + item.price * item.qty, 0);
        modalBox.innerHTML = `
            <div class="modal-header">
                <h3>Keranjang Belanja</h3>
                <button class="modal-close" data-action="close">✕</button>
            </div>
            <div class="cart-items-list">
                ${cartItemsData.map(item => `
                    <div class="cart-item-row">
                        <img src="${item.img}" alt="${item.name}">
                        <div class="cart-item-info">
                            <span class="name">${item.name}</span>
                            <span class="qty">Jumlah: ${item.qty}</span>
                        </div>
                        <span class="price">${formatRupiah(item.price * item.qty)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total-row">
                <span>Total</span>
                <strong>${formatRupiah(total)}</strong>
            </div>
            <div class="modal-actions">
                <button class="btn btn-outlined" data-action="close">Batalkan</button>
                <button class="btn btn-solid" data-action="checkout">Checkout</button>
            </div>
        `;
        openModal();
    }

    function renderConfirmView() {
        modalBox.innerHTML = `
            <div class="modal-center-icon">❓</div>
            <h3 class="modal-title-center">Anda yakin?</h3>
            <p class="modal-desc">Pastikan pesanan Anda sudah benar sebelum melanjutkan checkout.</p>
            <div class="modal-actions">
                <button class="btn btn-outlined" data-action="confirm-no">Tidak</button>
                <button class="btn btn-solid" data-action="confirm-yes">Ya</button>
            </div>
        `;
    }

    function renderSuccessView() {
        modalBox.innerHTML = `
            <div class="modal-center-icon">✅</div>
            <h3 class="modal-title-center">Pesanan Berhasil!</h3>
            <p class="modal-desc">Terima kasih telah berbelanja di CHAMORICE. Pesanan Anda sedang diproses.</p>
            <div class="modal-actions">
                <button class="btn btn-solid btn-block" data-action="close">Tutup</button>
            </div>
        `;
    }

    document.querySelectorAll('.cart-icon').forEach(btn => {
        btn.addEventListener('click', renderCartView);
    });

    // 4. Login State (swap "Masuk" -> "Akun Saya" when already logged in)
    const loginBtn = document.querySelector('.btn-login:not(.logout-action)');
    if (loginBtn) {
        const loggedInUser = JSON.parse(localStorage.getItem('chamoriceUser') || 'null');
        if (loggedInUser) {
            loginBtn.textContent = 'Akun Saya';
            loginBtn.href = 'akun.html';
        }
    }

    document.querySelectorAll('.logout-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('chamoriceUser');
            window.location.href = 'index.html';
        });
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    modalBox.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;
        const action = actionBtn.dataset.action;
        if (action === 'close') closeModal();
        else if (action === 'checkout') renderConfirmView();
        else if (action === 'confirm-no') renderCartView();
        else if (action === 'confirm-yes') renderSuccessView();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

});