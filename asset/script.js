document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        // Mencegah form dikirim secara default
        event.preventDefault();

        // Menghapus semua pesan error sebelumnya
        clearErrors();

        let isValid = true;

        // Daftar input yang akan divalidasi
        const inputsToValidate = [
            'namaLengkap',
            'tanggalLahir',
            'agama',
            'alamat',
            'email',
            'telepon'
        ];

        // Validasi setiap input teks, tanggal, select, dan textarea
        inputsToValidate.forEach(id => {
            const input = document.getElementById(id);
            if (input.value.trim() === '') {
                showError(input, 'Kolom ini tidak boleh kosong.');
                isValid = false;
            }
        });

        // Validasi khusus untuk Email
        const email = document.getElementById('email');
        if (email.value.trim() !== '' && !isValidEmail(email.value)) {
            showError(email, 'Format email tidak valid.');
            isValid = false;
        }

        // Validasi khusus untuk Radio Button Jenis Kelamin
        const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
        if (!jenisKelamin) {
            const radioErrorEl = document.querySelector('.radio-error');
            radioErrorEl.textContent = 'Silakan pilih jenis kelamin.';
            radioErrorEl.style.display = 'block';
            isValid = false;
        }

        // Jika semua validasi lolos
        if (isValid) {
            alert('Pendaftaran Berhasil!');
            // Di sini Anda bisa menambahkan kode untuk mengirim data ke server
            // Contoh: fetch('/api/register', { method: 'POST', body: new FormData(form) });
            form.reset(); // Mengosongkan form setelah berhasil
        }
    });

    // Fungsi untuk menampilkan pesan error
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorEl = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    // Fungsi untuk membersihkan semua pesan error
    function clearErrors() {
        document.querySelectorAll('.form-group .error').forEach(input => {
            input.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(errorEl => {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        });
    }

    // Fungsi untuk validasi format email menggunakan Regex
    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }
});