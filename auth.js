/**
 * EduTHCS - Kịch bản xử lý Đăng Nhập, Quên Mật Khẩu & Quản Lý Tài Khoản (Auth Logic)
 */

document.addEventListener('DOMContentLoaded', () => {
    initOtpInputs();
    getStoredUsers();
});

function getStoredUsers() {
    const raw = localStorage.getItem('eduthcs_users_db');
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
        throw new Error('Dữ liệu tài khoản trong trình duyệt không hợp lệ.');
    }

    const legacyIds = new Set(['acc_admin', 'acc_student', 'acc_teacher', 'acc_parent']);
    const users = parsed.filter(user => !legacyIds.has(user.id));

    if (users.length !== parsed.length) saveStoredUsers(users);
    if (users.length !== parsed.length) {
        const rawSession = localStorage.getItem('eduthcs_user');
        if (rawSession) {
            try {
                const session = JSON.parse(rawSession);
                if (legacyIds.has(session.id)) {
                    localStorage.removeItem('eduthcs_user');
                }
            } catch (error) {
                console.error('Không thể đọc phiên đăng nhập cũ khi dọn tài khoản mẫu.', error);
            }
        }
    }
    return users;
}

function saveStoredUsers(users) {
    localStorage.setItem('eduthcs_users_db', JSON.stringify(users));
}

function findUserByQuery(query) {
    if (!query) return null;
    const q = query.trim().toLowerCase();
    const users = getStoredUsers();
    return users.find(u => 
        (u.id && u.id.toLowerCase() === q) ||
        (u.username && u.username.toLowerCase() === q) ||
        (u.aliases && u.aliases.some(a => a.toLowerCase() === q))
    ) || null;
}

/* ==========================================================
   1. CHUYỂN ĐỔI VAI TRÒ NGƯỜI DÙNG (ROLE SWITCHER)
   ========================================================== */
let currentRole = 'student';

function switchRole(role) {
    currentRole = role;
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-role') === role) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const usernameLabel = document.getElementById('usernameLabel');
    const usernameInput = document.getElementById('usernameInput');

    if (usernameLabel && usernameInput) {
        if (role === 'student') {
            usernameLabel.innerText = 'Tên đăng nhập, Email hoặc Mã học sinh';
            usernameInput.placeholder = 'Nhập tên đăng nhập hoặc email...';
        } else if (role === 'parent') {
            usernameLabel.innerText = 'Số điện thoại hoặc Email phụ huynh';
            usernameInput.placeholder = 'Nhập số điện thoại hoặc email...';
        } else if (role === 'teacher') {
            usernameLabel.innerText = 'Email giáo viên / Cán bộ quản lý';
            usernameInput.placeholder = 'Nhập email đăng ký...';
        }
    }
}

/* ==========================================================
   2. ẨN / HIỆN MẬT KHẨU
   ========================================================== */
function togglePasswordVisibility(inputId, buttonElement) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const icon = buttonElement.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/* ==========================================================
   3. XỬ LÝ ĐĂNG NHẬP (LOGIN)
   ========================================================== */
function handleLoginSubmit(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const submitBtn = document.getElementById('submitLoginBtn');

    // Reset lỗi
    usernameError.innerText = '';
    passwordError.innerText = '';
    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    let hasError = false;

    if (!username) {
        usernameError.innerText = 'Vui lòng nhập tên đăng nhập, email hoặc số điện thoại!';
        usernameInput.classList.add('is-invalid');
        hasError = true;
    }

    if (!password) {
        passwordError.innerText = 'Vui lòng nhập mật khẩu của bạn!';
        passwordInput.classList.add('is-invalid');
        hasError = true;
    }

    if (hasError) return;

    // Kiểm tra trong cơ sở dữ liệu tài khoản
    const users = getStoredUsers();
    const foundUser = users.find(u => {
        const uName = (u.username || '').toLowerCase();
        const aliases = (u.aliases || []).map(a => a.toLowerCase());
        return uName === username || aliases.includes(username);
    });

    if (!foundUser) {
        usernameError.innerText = 'Tài khoản không tồn tại trên hệ thống EduTHCS!';
        usernameInput.classList.add('is-invalid');
        return;
    }

    if (!foundUser.password || password !== foundUser.password) {
        passwordError.innerText = 'Mật khẩu không chính xác! Vui lòng thử lại hoặc bấm Quên mật khẩu.';
        passwordInput.classList.add('is-invalid');
        return;
    }

    // Hiệu ứng Loading
    setBtnLoading(submitBtn, true);

    setTimeout(() => {
        setBtnLoading(submitBtn, false);

        // Lưu thông tin phiên đăng nhập
        localStorage.setItem('eduthcs_user', JSON.stringify({
            id: foundUser.id,
            username: foundUser.username,
            fullName: foundUser.fullName,
            role: foundUser.role,
            roleName: foundUser.roleName,
            school: foundUser.school,
            loginTime: new Date().toISOString()
        }));

        if (foundUser.role === 'admin') {
            showToast(`🎉 Xin chào Quản Trị Viên ${foundUser.fullName}! Đang mở Bảng điều khiển Admin...`, 'success');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        } else {
            showToast(`🎉 Đăng nhập thành công! Chào mừng ${foundUser.fullName} vào Góc học tập.`, 'success');
            setTimeout(() => {
                window.location.href = 'user-dashboard.html';
            }, 1000);
        }

    }, 600);
}

function handleSocialLogin(provider) {
    showToast(`Đăng nhập qua ${provider} chưa được cấu hình trong bản demo tĩnh.`, 'info');
}

/* ==========================================================
   4. QUY TRÌNH 3 BƯỚC QUÊN MẬT KHẨU (FORGOT PASSWORD WIZARD)
   ========================================================== */
let recoveryContact = '';
let countdownTimer = null;
let timeLeft = 60;

function goToStep(step) {
    const panes = document.querySelectorAll('.wizard-step-pane');
    panes.forEach(pane => pane.classList.remove('active'));

    const targetPane = document.getElementById(`paneStep${step}`);
    if (targetPane) targetPane.classList.add('active');

    // Cập nhật các node tiến trình
    for (let i = 1; i <= 3; i++) {
        const node = document.getElementById(`nodeStep${i}`);
        const line = document.getElementById(`lineStep${i}`);

        if (node) {
            if (i < step) {
                node.className = 'wizard-step-node completed';
                node.querySelector('.node-circle').innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (i === step) {
                node.className = 'wizard-step-node active';
                node.querySelector('.node-circle').innerText = i;
            } else {
                node.className = 'wizard-step-node';
                node.querySelector('.node-circle').innerText = i;
            }
        }

        if (line) {
            if (i < step) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        }
    }
}

// BƯỚC 1: Gửi yêu cầu xác thực
function handleForgotStep1(event) {
    event.preventDefault();
    const step1Error = document.getElementById('step1Error');
    step1Error.innerText = 'Bản demo tĩnh chưa có dịch vụ gửi OTP. Hãy đăng ký tài khoản mới để tiếp tục trải nghiệm.';
}

// BƯỚC 2: Nhập và xác thực OTP
function initOtpInputs() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    if (!otpInputs.length) return;

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            input.value = input.value.replace(/[^0-9]/g, '');

            if (input.value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim().replace(/[^0-9]/g, '');
            if (pasteData.length === 6) {
                otpInputs.forEach((otpIn, i) => {
                    otpIn.value = pasteData[i] || '';
                });
                otpInputs[5].focus();
            }
        });
    });
}

function startOtpCountdown() {
    clearInterval(countdownTimer);
    timeLeft = 60;
    const countdownText = document.getElementById('countdownText');
    const timerCountdown = document.getElementById('timerCountdown');
    const btnResendOtp = document.getElementById('btnResendOtp');

    if (countdownText && btnResendOtp) {
        countdownText.classList.remove('d-none');
        btnResendOtp.classList.add('d-none');
    }

    countdownTimer = setInterval(() => {
        timeLeft--;
        if (timerCountdown) timerCountdown.innerText = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            if (countdownText && btnResendOtp) {
                countdownText.classList.add('d-none');
                btnResendOtp.classList.remove('d-none');
            }
        }
    }, 1000);
}

function resendOtpCode() {
    showToast('Bản demo tĩnh chưa có dịch vụ gửi OTP.', 'info');
}

function handleForgotStep2(event) {
    event.preventDefault();
    const step2Error = document.getElementById('step2Error');
    step2Error.innerText = 'Bản demo tĩnh không thể xác minh OTP.';
}

// BƯỚC 3: Thiết lập mật khẩu mới
function checkPasswordStrength(pwd) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    if (!fill || !text) return;

    if (!pwd) {
        fill.style.width = '0%';
        fill.style.backgroundColor = '#e2e8f0';
        text.innerText = 'Độ bảo mật: Chưa nhập';
        text.style.color = '#64748b';
        return;
    }

    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) {
        fill.style.width = '33%';
        fill.style.backgroundColor = '#ef4444';
        text.innerText = 'Độ bảo mật: Yếu (Nên thêm số hoặc chữ hoa)';
        text.style.color = '#ef4444';
    } else if (score <= 4) {
        fill.style.width = '66%';
        fill.style.backgroundColor = '#f59e0b';
        text.innerText = 'Độ bảo mật: Trung bình (Tốt)';
        text.style.color = '#f59e0b';
    } else {
        fill.style.width = '100%';
        fill.style.backgroundColor = '#10b981';
        text.innerText = 'Độ bảo mật: Rất mạnh và an toàn';
        text.style.color = '#10b981';
    }
}

function handleForgotStep3(event) {
    event.preventDefault();
    const step3Error = document.getElementById('step3Error');
    step3Error.innerText = 'Bản demo tĩnh không hỗ trợ đặt lại mật khẩu.';
}

/* ==========================================================
   5. CÁC HÀM TIỆN ÍCH (HELPERS)
   ========================================================== */
function setBtnLoading(btn, isLoading) {
    if (!btn) return;
    const textSpan = btn.querySelector('.btn-text');
    const loadingSpan = btn.querySelector('.btn-loading');

    if (isLoading) {
        btn.disabled = true;
        if (textSpan) textSpan.classList.add('d-none');
        if (loadingSpan) loadingSpan.classList.remove('d-none');
    } else {
        btn.disabled = false;
        if (textSpan) textSpan.classList.remove('d-none');
        if (loadingSpan) loadingSpan.classList.add('d-none');
    }
}

function showToast(message, type = 'info') {
    const toastBox = document.getElementById('toastNotification');
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-xmark';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass} toast-icon"></i>
        <div class="toast-text">${message}</div>
    `;

    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.35s ease';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
